'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { CampusLandmark, WalkingRoute, OAU_CENTER_COORDINATES } from '@/data/campusMapData';
import { Layers, Crosshair, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

interface LeafletMapProps {
  landmarks: CampusLandmark[];
  selectedLandmark: CampusLandmark | null;
  onSelectLandmark: (landmark: CampusLandmark) => void;
  activeRoute: WalkingRoute | null;
}

export default function LeafletMap({
  landmarks,
  selectedLandmark,
  onSelectLandmark,
  activeRoute,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Category color mapping
  const getMarkerColor = (cat: string) => {
    switch (cat) {
      case 'theatre':
        return '#12345B'; // Navy
      case 'faculty':
        return '#2563EB'; // Blue
      case 'hostel':
        return '#059669'; // Emerald
      case 'transit':
        return '#D97706'; // Amber
      case 'health':
        return '#DC2626'; // Red
      case 'sports':
        return '#16A34A'; // Green
      default:
        return '#EAA812'; // Gold
    }
  };

  // Create custom DivIcon for Bauhaus modern map pins
  const createCustomIcon = useCallback((landmark: CampusLandmark, isSelected: boolean) => {
    const color = getMarkerColor(landmark.category);
    const size = isSelected ? 36 : 28;
    const border = isSelected ? 'border-2 border-white ring-3 ring-amber-400' : 'border-2 border-white shadow-md';

    const html = `
      <div class="relative flex items-center justify-center cursor-pointer group" style="width: ${size}px; height: ${size}px;">
        ${isSelected ? `<div class="absolute inset-0 rounded-full animate-ping opacity-75" style="background-color: ${color};"></div>` : ''}
        <div class="relative z-10 w-full h-full rounded-full flex items-center justify-center text-white font-bold text-[10px] ${border}" style="background-color: ${color};">
          <span>${landmark.name.substring(0, 2).toUpperCase()}</span>
        </div>
        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45" style="background-color: ${color};"></div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'custom-oau-pin',
      iconSize: [size, size],
      iconAnchor: [size / 2, size + 2],
      popupAnchor: [0, -size - 4],
    });
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create map centered on OAU Academic Core
    const map = L.map(mapContainerRef.current, {
      center: [OAU_CENTER_COORDINATES.lat, OAU_CENTER_COORDINATES.lng],
      zoom: OAU_CENTER_COORDINATES.zoom,
      zoomControl: false,
      maxBounds: [
        [7.4800, 4.5000], // Southwest boundary
        [7.5450, 4.5500], // Northeast boundary
      ],
      minZoom: 14,
      maxZoom: 19,
    });

    // Default Streets Layer (OpenStreetMap)
    const streetTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    tileLayerRef.current = streetTiles;

    // Add Zoom Control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Marker Layer Group
    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Map Type Toggle (Streets vs Satellite)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !tileLayerRef.current) return;

    map.removeLayer(tileLayerRef.current);

    if (mapType === 'satellite') {
      // Esri World Imagery (High-res satellite view)
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 19,
        }
      ).addTo(map);
    } else {
      // OpenStreetMap Street View
      tileLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
    }
  }, [mapType]);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    landmarks.forEach((landmark) => {
      const isSelected = selectedLandmark?.id === landmark.id;
      const icon = createCustomIcon(landmark, isSelected);

      const marker = L.marker([landmark.lat, landmark.lng], { icon });

      // Create rich popup
      const popupContent = `
        <div class="text-left font-sans p-1 max-w-[220px]">
          <div class="font-black text-sm text-[#12345B] leading-tight mb-1">${landmark.name}</div>
          <div class="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">${landmark.categoryLabel}</div>
          <div class="text-xs text-slate-700 leading-snug mb-2">${landmark.description.substring(0, 95)}...</div>
          <div class="text-[11px] font-semibold text-emerald-800 bg-emerald-50 p-1 border border-emerald-200 mb-2">
            🚶 From Moz: ${landmark.walkingTimeFromMoz} | Angola: ${landmark.walkingTimeFromAngola}
          </div>
          <div class="text-[10px] text-slate-500"><strong>Transit:</strong> ${landmark.nearestTransitStop}</div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        onSelectLandmark(landmark);
      });

      markersGroup.addLayer(marker);
    });
  }, [landmarks, selectedLandmark, createCustomIcon, onSelectLandmark]);

  // Pan to Selected Landmark
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedLandmark) return;

    map.flyTo([selectedLandmark.lat, selectedLandmark.lng], 17, {
      duration: 1.2,
    });
  }, [selectedLandmark]);

  // Render Active Walking Route Polyline
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (routePolylineRef.current) {
      map.removeLayer(routePolylineRef.current);
      routePolylineRef.current = null;
    }

    if (activeRoute && activeRoute.geoWaypoints.length > 0) {
      const polyline = L.polyline(activeRoute.geoWaypoints, {
        color: '#D97706',
        weight: 6,
        opacity: 0.9,
        dashArray: '8, 8',
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      routePolylineRef.current = polyline;

      // Fit map view to the walking route
      map.fitBounds(polyline.getBounds(), {
        padding: [60, 60],
        maxZoom: 17,
      });
    }
  }, [activeRoute]);

  // Geolocation (Locate Me)
  const handleLocateMe = () => {
    if (!navigator.geolocation || !mapInstanceRef.current) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);

        const map = mapInstanceRef.current;
        if (!map) return;

        if (userMarkerRef.current) {
          map.removeLayer(userMarkerRef.current);
        }

        const userIcon = L.divIcon({
          html: `
            <div class="relative w-6 h-6 flex items-center justify-center">
              <div class="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
              <div class="relative z-10 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md"></div>
            </div>
          `,
          className: 'user-gps-pin',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const marker = L.marker([latitude, longitude], { icon: userIcon })
          .addTo(map)
          .bindPopup('<strong>You are here</strong>')
          .openPopup();

        userMarkerRef.current = marker;

        map.flyTo([latitude, longitude], 17, { duration: 1.2 });
      },
      (err) => {
        alert('Could not determine your GPS location: ' + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Reset Campus View
  const handleResetView = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(
      [OAU_CENTER_COORDINATES.lat, OAU_CENTER_COORDINATES.lng],
      OAU_CENTER_COORDINATES.zoom,
      { duration: 1 }
    );
  };

  return (
    <div
      className={`relative w-full ${
        isFullscreen
          ? 'fixed inset-0 z-50 h-screen bg-slate-900'
          : 'aspect-4/3 sm:aspect-16/10 border border-slate-300 bg-slate-100 overflow-hidden'
      }`}
    >
      {/* Real Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Control Toolbar */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        {/* Layer Switcher: Streets vs Satellite */}
        <button
          onClick={() => setMapType(mapType === 'streets' ? 'satellite' : 'streets')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-oau-navy text-xs font-bold border border-slate-300 shadow-md hover:bg-slate-50 transition-colors"
          title="Toggle Streets / Satellite View"
        >
          <Layers className="w-3.5 h-3.5 text-amber-500" />
          <span>{mapType === 'streets' ? 'Satellite View' : 'Street Map'}</span>
        </button>

        {/* Locate Me */}
        <button
          onClick={handleLocateMe}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-oau-navy text-xs font-bold border border-slate-300 shadow-md hover:bg-slate-50 transition-colors"
          title="Find My GPS Position on Campus"
        >
          <Crosshair className="w-3.5 h-3.5 text-blue-600" />
          <span>Locate Me</span>
        </button>

        {/* Reset View */}
        <button
          onClick={handleResetView}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-oau-navy text-xs font-bold border border-slate-300 shadow-md hover:bg-slate-50 transition-colors"
          title="Reset to Central Academic Core"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
          <span>Reset View</span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-oau-navy text-xs font-bold border border-slate-300 shadow-md hover:bg-slate-50 transition-colors"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span>{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
        </button>
      </div>

      {/* Floating Category Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-xs p-2.5 border border-slate-300 shadow-md max-w-[280px] sm:max-w-md hidden sm:block">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between">
          <span>OAU Campus Geospatial Grid</span>
          {userLocation ? (
            <span className="text-[9px] text-blue-700 bg-blue-50 px-1 font-mono font-bold">
              GPS: {userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)}
            </span>
          ) : (
            <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1 font-mono">GPS Verified</span>
          )}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium text-slate-700">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-[#12345B] rounded-full inline-block"></span>
            <span>Theatres (BOOC, AUD)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-[#2563EB] rounded-full inline-block"></span>
            <span>Faculties (White House, Tech)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-[#059669] rounded-full inline-block"></span>
            <span>Hostels (Angola, Moz, Faj)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-[#DC2626] rounded-full inline-block"></span>
            <span>Health Centre (JAC)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-[#D97706] rounded-full inline-block"></span>
            <span>Transit & SUB</span>
          </span>
        </div>
      </div>
    </div>
  );
}
