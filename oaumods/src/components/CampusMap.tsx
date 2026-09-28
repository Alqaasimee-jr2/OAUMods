'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  MapPin,
  Navigation,
  Compass,
  Search,
  ExternalLink,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Clock,
  Bus,
  Footprints,
  Info,
  CheckCircle2,
  X,
  Map as MapIcon,
  Globe,
  Sparkles,
  Eye,
  EyeOff,
  Crosshair,
} from 'lucide-react';
import {
  CampusLandmark,
  CAMPUS_LANDMARKS,
  CAMPUS_ZONES,
  POPULAR_WALKING_ROUTES,
  OAU_CENTER_COORDINATES,
} from '@/data/campusMapData';
import { GeometricShape, WordAccent } from './GeometricShapes';

// Dynamic import of LeafletMap to avoid SSR window/document issues
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-4/3 sm:aspect-16/10 bg-slate-900 border border-slate-700 flex flex-col items-center justify-center text-white gap-3 select-none">
      <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent animate-spin rounded-full"></div>
      <div className="text-center space-y-1">
        <p className="text-sm font-bold tracking-wide">Loading OAU Geospatial Map...</p>
        <p className="text-[11px] text-slate-400">Rendering OpenStreetMap vector tiles & institutional GPS nodes</p>
      </div>
    </div>
  ),
});

interface CampusMapProps {
  initialLandmarkId?: string;
  isFreshmanContext?: boolean;
}

export default function CampusMap({
  initialLandmarkId,
  isFreshmanContext = false,
}: CampusMapProps) {
  // 'google' = Google Maps Live (DEFAULT)
  // 'downloaded' = Downloaded High-Res Aerial Satellite (100% Offline)
  // 'real' = Leaflet OpenStreetMap & Satellite Tiles
  // 'vector' = 100% Offline Sharon Masterplan SVG
  const [activeTab, setActiveTab] = useState<'google' | 'downloaded' | 'real' | 'vector'>('google');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLandmark, setSelectedLandmark] = useState<CampusLandmark | null>(() => {
    if (initialLandmarkId) {
      return CAMPUS_LANDMARKS.find((l) => l.id === initialLandmarkId) || null;
    }
    // Default to Hezekiah Library or Oduduwa Hall
    return CAMPUS_LANDMARKS.find((l) => l.id === 'oduduwa-hall') || CAMPUS_LANDMARKS[0];
  });
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);

  // Google Maps Embed State
  const [googleMapType, setGoogleMapType] = useState<'m' | 'k'>('m'); // 'm' = Roadmap, 'k' = Satellite
  const [googleZoom, setGoogleZoom] = useState<number>(17);

  // Downloaded Aerial Satellite State (Pan & Zoom)
  const [aerialZoom, setAerialZoom] = useState<number>(1);
  const [aerialPan, setAerialPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Vector Mode Zoom & Pan States
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const categories = [
    { id: 'all', label: 'All Landmarks', icon: Compass },
    { id: 'theatre', label: 'Lecture Theatres', icon: Navigation },
    { id: 'faculty', label: 'Faculties', icon: Layers },
    { id: 'hostel', label: 'Hostels', icon: MapPin },
    { id: 'transit', label: 'Transit & Gates', icon: Bus },
    { id: 'health', label: 'Health & Clinic', icon: Info },
    { id: 'food', label: 'SUB & Commerce', icon: Sparkles },
    { id: 'sports', label: 'Sports Complex', icon: CheckCircle2 },
  ];

  const filteredLandmarks = useMemo(() => {
    return CAMPUS_LANDMARKS.filter((l) => {
      const matchesCat = selectedCategory === 'all' || l.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.officialName.toLowerCase().includes(q) ||
        (l.nickname && l.nickname.toLowerCase().includes(q)) ||
        l.zone.toLowerCase().includes(q) ||
        l.coursesOrUses.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeRoute = useMemo(() => {
    if (!activeRouteId) return null;
    return POPULAR_WALKING_ROUTES.find((r) => r.id === activeRouteId) || null;
  }, [activeRouteId]);

  const routeCoordinates = useMemo(() => {
    if (!activeRoute) return null;
    const origin = CAMPUS_LANDMARKS.find((l) => l.id === activeRoute.originId);
    const destination = CAMPUS_LANDMARKS.find((l) => l.id === activeRoute.destinationId);
    if (!origin || !destination) return null;

    const midX = (origin.mapX + destination.mapX) / 2;
    const midY = (origin.mapY + destination.mapY) / 2 - 20;

    return {
      x1: origin.mapX,
      y1: origin.mapY,
      midX,
      midY,
      x2: destination.mapX,
      y2: destination.mapY,
      originName: origin.name,
      destName: destination.name,
    };
  }, [activeRoute]);

  const googleEmbedUrl = useMemo(() => {
    const lat = selectedLandmark ? selectedLandmark.lat : OAU_CENTER_COORDINATES.lat;
    const lng = selectedLandmark ? selectedLandmark.lng : OAU_CENTER_COORDINATES.lng;
    return `https://maps.google.com/maps?q=${lat},${lng}&t=${googleMapType}&z=${googleZoom}&hl=en&output=embed`;
  }, [selectedLandmark, googleMapType, googleZoom]);

  const handleSelectLandmark = (landmark: CampusLandmark) => {
    setSelectedLandmark(landmark);

    // Pan Downloaded Aerial map towards landmark if zoomed in
    if (aerialZoom > 1) {
      const leftPercent = (landmark.lng - 4.510) / 0.022;
      const topPercent = (7.526 - landmark.lat) / 0.014;
      setAerialPan({
        x: Math.max(-350, Math.min(350, (0.5 - leftPercent) * 600 * (aerialZoom - 1))),
        y: Math.max(-280, Math.min(280, (0.5 - topPercent) * 450 * (aerialZoom - 1))),
      });
    }

    // Pan Vector map
    if (zoomLevel > 1) {
      setPanOffset({
        x: Math.max(-200, Math.min(200, (500 - landmark.mapX) * 0.4)),
        y: Math.max(-150, Math.min(150, (325 - landmark.mapY) * 0.4)),
      });
    }
  };

  // Aerial pan & drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (aerialZoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - aerialPan.x, y: e.clientY - aerialPan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setAerialPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (aerialZoom <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX - aerialPan.x, y: e.touches[0].clientY - aerialPan.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setAerialPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleAerialZoom = (delta: number) => {
    setAerialZoom((prev) => {
      const next = Math.min(3.0, Math.max(1.0, +(prev + delta).toFixed(1)));
      if (next === 1) {
        setAerialPan({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleAerialReset = () => {
    setAerialZoom(1);
    setAerialPan({ x: 0, y: 0 });
  };

  // Vector zoom handlers
  const handleVectorZoom = (delta: number) => {
    setZoomLevel((prev) => {
      const next = Math.min(2.2, Math.max(1, +(prev + delta).toFixed(1)));
      if (next === 1) {
        setPanOffset({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleVectorReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setActiveRouteId(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
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

  return (
    <div className="space-y-6 text-left">
      {/* Top Header Card */}
      <div className="relative border border-slate-200 bg-white p-5 sm:p-6 space-y-3 overflow-hidden shadow-xs">
        <div className="absolute top-2 right-4 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="hexagon" color="gold" size="lg" variant="outline" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wide">
            <GeometricShape type="triangle" color="gold" size="sm" />
            <span>{isFreshmanContext ? 'FRESHMAN ROUTE NAVIGATOR' : 'OAU CAMPUS ATLAS'}</span>
          </div>

          {/* Mode Switcher: Google Maps (Default), Downloaded Satellite, Leaflet GPS, Vector Masterplan */}
          <div className="flex items-center overflow-x-auto no-scrollbar border border-slate-300 bg-slate-100 p-0.5 text-xs font-bold w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('google')}
              className={`flex items-center gap-1.5 px-3 py-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'google'
                  ? 'bg-oau-navy text-white shadow-xs'
                  : 'text-slate-700 hover:text-oau-navy'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Google Maps (Live)</span>
            </button>
            <button
              onClick={() => setActiveTab('downloaded')}
              className={`flex items-center gap-1.5 px-3 py-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'downloaded'
                  ? 'bg-oau-navy text-white shadow-xs'
                  : 'text-slate-700 hover:text-oau-navy'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Downloaded Satellite (Offline)</span>
            </button>
            <button
              onClick={() => setActiveTab('real')}
              className={`flex items-center gap-1.5 px-3 py-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'real'
                  ? 'bg-oau-navy text-white shadow-xs'
                  : 'text-slate-700 hover:text-oau-navy'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-blue-400" />
              <span>Interactive GPS (OSM)</span>
            </button>
            <button
              onClick={() => setActiveTab('vector')}
              className={`flex items-center gap-1.5 px-3 py-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'vector'
                  ? 'bg-oau-navy text-white shadow-xs'
                  : 'text-slate-700 hover:text-oau-navy'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5 text-purple-400" />
              <span>Masterplan (SVG)</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-black text-oau-navy">
            Interactive Campus <WordAccent shape="circle" color="gold">Map & Spatial</WordAccent> Navigator
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
            Real-world geospatial map of Obafemi Awolowo University. Seamlessly toggle between live Google Maps, 100% offline downloaded satellite imagery, Leaflet GPS, and the Sharon Masterplan.
          </p>
        </div>

        {/* Quick Search & Route Bar */}
        <div className="pt-2 grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by building, lecture theatre (BOOC, AUD), or faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-oau-navy focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="md:col-span-5 flex items-center gap-2">
            <select
              value={activeRouteId || ''}
              onChange={(e) => setActiveRouteId(e.target.value || null)}
              className="w-full px-3 py-2 border border-slate-300 bg-slate-50 text-xs text-slate-800 font-bold focus:outline-hidden focus:border-oau-navy"
            >
              <option value="">🚶 Walking Routes for Freshers (Select Route)</option>
              {POPULAR_WALKING_ROUTES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.estimatedMinutes} mins)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold whitespace-nowrap border transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-oau-navy text-white border-oau-navy shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-oau-navy'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map Viewport & Dossier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Top Map Canvas Container (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative border border-slate-300 bg-white shadow-xs overflow-hidden">
            {/* ============================================================== */}
            {/* MODE 1: Live Embedded Google Maps View (PRIMARY DEFAULT)       */}
            {/* ============================================================== */}
            {activeTab === 'google' && (
              <div className="relative w-full aspect-4/3 sm:aspect-16/10 bg-slate-950 overflow-hidden">
                <iframe
                  key={`${selectedLandmark?.id || 'center'}-${googleMapType}-${googleZoom}`}
                  title="Google Maps Live OAU View"
                  className="w-full h-full border-0"
                  src={googleEmbedUrl}
                  loading="lazy"
                ></iframe>

                {/* Top Controls Overlay: Roadmap / Satellite & Zoom */}
                <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-10">
                  {/* Mode switcher: Roadmap vs Satellite */}
                  <div className="flex items-center bg-white/95 backdrop-blur-sm border border-slate-300 shadow-md p-0.5 text-xs font-bold pointer-events-auto">
                    <button
                      onClick={() => setGoogleMapType('m')}
                      className={`px-3 py-1.5 transition-colors flex items-center gap-1.5 ${
                        googleMapType === 'm'
                          ? 'bg-oau-navy text-white shadow-xs'
                          : 'text-slate-700 hover:text-oau-navy hover:bg-slate-100'
                      }`}
                    >
                      <MapIcon className="w-3.5 h-3.5" />
                      <span>Roadmap</span>
                    </button>
                    <button
                      onClick={() => setGoogleMapType('k')}
                      className={`px-3 py-1.5 transition-colors flex items-center gap-1.5 ${
                        googleMapType === 'k'
                          ? 'bg-oau-navy text-white shadow-xs'
                          : 'text-slate-700 hover:text-oau-navy hover:bg-slate-100'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Satellite</span>
                    </button>
                  </div>

                  {/* Embedded Zoom Buttons for Google Maps */}
                  <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm border border-slate-300 shadow-md p-0.5 text-xs font-bold pointer-events-auto">
                    <button
                      onClick={() => setGoogleZoom((prev) => Math.min(20, prev + 1))}
                      disabled={googleZoom >= 20}
                      className="p-1.5 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-1.5 text-[11px] font-mono text-slate-600">z{googleZoom}</span>
                    <button
                      onClick={() => setGoogleZoom((prev) => Math.max(14, prev - 1))}
                      disabled={googleZoom <= 14}
                      className="p-1.5 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom Badge & Direct App Actions */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-10">
                  <div className="bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] border border-slate-700 shadow-md flex items-center gap-1.5 pointer-events-auto">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-semibold truncate max-w-[200px] sm:max-w-xs">
                      {selectedLandmark ? selectedLandmark.name : 'Central Academic Core'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pointer-events-auto">
                    <a
                      href={
                        selectedLandmark?.googleMapsUrl ||
                        `https://www.google.com/maps/search/?api=1&query=${
                          selectedLandmark?.lat || OAU_CENTER_COORDINATES.lat
                        },${selectedLandmark?.lng || OAU_CENTER_COORDINATES.lng}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 text-oau-navy font-bold text-xs border border-amber-500 shadow-md hover:bg-amber-300 transition-colors"
                    >
                      <span>Open in Google Maps App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* MODE 2: Downloaded Aerial Satellite Map (100% Offline)         */}
            {/* ============================================================== */}
            {activeTab === 'downloaded' && (
              <div
                className={`relative w-full aspect-4/3 sm:aspect-16/10 bg-slate-950 overflow-hidden select-none ${
                  aerialZoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="w-full h-full relative transition-transform duration-100 ease-out"
                  style={{
                    transform: `scale(${aerialZoom}) translate(${aerialPan.x / aerialZoom}px, ${
                      aerialPan.y / aerialZoom
                    }px)`,
                    transformOrigin: '50% 50%',
                  }}
                >
                  {/* High-Resolution Downloaded Aerial Photograph (1600x1050 px) */}
                  <Image
                    src="/oau-satellite-map.png"
                    alt="High-Resolution Downloaded Aerial Satellite Imagery of Obafemi Awolowo University Campus"
                    width={1600}
                    height={1050}
                    priority
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />

                  {/* Overlaid Institutional Landmark Pins */}
                  {filteredLandmarks.map((lm) => {
                    // Geographic linear projection onto [lon 4.510..4.532] and [lat 7.512..7.526]
                    const leftPercent = ((lm.lng - 4.510) / 0.022) * 100;
                    const topPercent = ((7.526 - lm.lat) / 0.014) * 100;

                    // Clamping points outside the aerial photograph bounds (e.g. Main Gate at 7.4975)
                    if (leftPercent < 0 || leftPercent > 100 || topPercent < 0 || topPercent > 100) {
                      return null;
                    }

                    const isSelected = selectedLandmark?.id === lm.id;
                    const catColor = getCategoryColor(lm.category);

                    return (
                      <div
                        key={lm.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectLandmark(lm);
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                        style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                      >
                        {/* Animated beacon ring when selected */}
                        {isSelected && (
                          <span
                            className="absolute -inset-2.5 rounded-full animate-ping opacity-75 pointer-events-none"
                            style={{ backgroundColor: catColor }}
                          />
                        )}

                        {/* Landmark Pin Dot */}
                        <div
                          className={`flex items-center justify-center rounded-full border-2 transition-transform duration-150 ${
                            isSelected
                              ? 'w-6 h-6 border-amber-300 ring-2 ring-white scale-125 shadow-lg'
                              : 'w-4 h-4 border-white shadow-md hover:scale-125'
                          }`}
                          style={{ backgroundColor: catColor }}
                        >
                          {isSelected ? (
                            <span className="w-2 h-2 rounded-full bg-white"></span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80"></span>
                          )}
                        </div>

                        {/* Label Tooltip */}
                        {(showLabels || isSelected) && (
                          <div
                            className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 whitespace-nowrap text-[9px] font-bold pointer-events-none transition-all shadow-md ${
                              isSelected
                                ? 'bg-amber-400 text-oau-navy border border-amber-500 scale-105 z-30'
                                : 'bg-slate-900/90 text-white border border-slate-700/80 backdrop-blur-xs opacity-90 group-hover:opacity-100 group-hover:scale-105'
                            }`}
                          >
                            {lm.name.replace(/ \(.*\)/, '')}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Top Controls Overlay for Downloaded Aerial */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
                  <button
                    onClick={() => handleAerialZoom(0.3)}
                    className="p-2 bg-white/95 text-oau-navy hover:bg-white border border-slate-300 shadow-md transition-colors"
                    title="Zoom In (Aerial)"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAerialZoom(-0.3)}
                    className="p-2 bg-white/95 text-oau-navy hover:bg-white border border-slate-300 shadow-md transition-colors"
                    title="Zoom Out (Aerial)"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleAerialReset}
                    className="p-2 bg-white/95 text-oau-navy hover:bg-white border border-slate-300 shadow-md transition-colors"
                    title="Reset View"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowLabels(!showLabels)}
                    className={`p-2 border shadow-md transition-colors ${
                      showLabels
                        ? 'bg-amber-400 text-oau-navy border-amber-500'
                        : 'bg-white/95 text-slate-700 hover:bg-white border-slate-300'
                    }`}
                    title={showLabels ? 'Hide Landmark Labels' : 'Show Landmark Labels'}
                  >
                    {showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                {/* Bottom Offline Badge */}
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                  <div className="bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] border border-slate-700 shadow-md flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-semibold">Downloaded Satellite Map (100% Offline • 1600×1050 px)</span>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* MODE 3: Interactive Real Leaflet GPS Map                       */}
            {/* ============================================================== */}
            {activeTab === 'real' && (
              <LeafletMap
                landmarks={filteredLandmarks}
                selectedLandmark={selectedLandmark}
                onSelectLandmark={handleSelectLandmark}
                activeRoute={activeRoute}
              />
            )}

            {/* ============================================================== */}
            {/* MODE 4: 100% Offline Geographically Projected SVG Masterplan   */}
            {/* ============================================================== */}
            {activeTab === 'vector' && (
              <div className="relative w-full aspect-4/3 sm:aspect-16/10 bg-[#0B1528] overflow-hidden select-none cursor-grab active:cursor-grabbing">
                <svg
                  viewBox="0 0 1000 650"
                  className="w-full h-full transition-transform duration-200"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                    transformOrigin: '50% 50%',
                  }}
                >
                  <defs>
                    <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#475569" />
                      <stop offset="100%" stopColor="#334155" />
                    </linearGradient>
                    <linearGradient id="grassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#064E3B" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Campus Ground */}
                  <rect width="1000" height="650" fill="#0A1120" />

                  {/* Geographic Campus Zone Boxes (Accurate West to East Orientation) */}
                  {/* West: Freshman Residential Area (Angola & Moz) */}
                  <rect x="80" y="100" width="160" height="150" fill="#0E7490" fillOpacity="0.2" stroke="#06B6D4" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="90" y="120" fill="#22D3EE" fontSize="9" fontWeight="bold">WEST: FRESHMEN (ANGOLA & MOZ)</text>

                  {/* West-Central: Stalite Residential (Awo, Fajuyi, ETF) */}
                  <rect x="200" y="220" width="180" height="220" fill="#374151" fillOpacity="0.25" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="210" y="240" fill="#D1D5DB" fontSize="9" fontWeight="bold">STALITE RESIDENCES (AWO & FAJ)</text>

                  {/* Central Academic Core */}
                  <rect x="470" y="210" width="180" height="180" fill="#1E3A8A" fillOpacity="0.25" stroke="#3B82F6" strokeWidth="1.5" />
                  <text x="480" y="230" fill="#60A5FA" fontSize="9" fontWeight="bold">CENTRAL ACADEMIC CORE</text>

                  {/* Motion Ground Lawn */}
                  <ellipse cx="572" cy="320" rx="35" ry="25" fill="url(#grassGrad)" stroke="#10B981" strokeWidth="1" />
                  <text x="548" y="323" fill="#6EE7B7" fontSize="8" fontWeight="bold">Motion Ground</text>

                  {/* South: Sports Basin */}
                  <rect x="480" y="440" width="140" height="80" fill="#064E3B" fillOpacity="0.2" stroke="#10B981" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="490" y="460" fill="#34D399" fontSize="8" fontWeight="bold">SPORTS BASIN & MAIN BOWL</text>

                  {/* East: Science Quad & Technology Belt */}
                  <rect x="670" y="240" width="220" height="200" fill="#B45309" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="680" y="260" fill="#FBBF24" fontSize="9" fontWeight="bold">EAST: SCIENCE QUAD & TECH BELT</text>

                  {/* Accurate Arterial Road 1 Spine */}
                  <path
                    d="M 580 640 L 590 540 L 560 450 L 570 360 L 610 340"
                    fill="none"
                    stroke="url(#roadGrad)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 580 640 L 590 540 L 560 450 L 570 360 L 610 340"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                    strokeDasharray="6,6"
                  />
                  <text x="595" y="580" fill="#CBD5E1" fontSize="8" fontWeight="bold" transform="rotate(-85 595 580)">
                    ROAD 1 (MAIN ENTRANCE SPINE)
                  </text>

                  {/* Accurate Road 2 Corridor */}
                  <path
                    d="M 610 340 L 520 370 L 390 290 L 350 370 L 220 240 L 160 170"
                    fill="none"
                    stroke="url(#roadGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text x="320" y="325" fill="#94A3B8" fontSize="8" transform="rotate(-30 320 325)">
                    ROAD 2 (ACADEMIC TO RESIDENTIAL)
                  </text>

                  {/* Spider Road East to Tech */}
                  <path
                    d="M 610 340 L 690 330 L 780 320 L 830 380 L 865 130"
                    fill="none"
                    stroke="url(#roadGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <text x="730" y="315" fill="#94A3B8" fontSize="8">
                    SPIDER ROAD (TECH AXIS)
                  </text>

                  {/* Maintenance Road behind Angola/Moz */}
                  <path
                    d="M 110 180 L 90 140 L 150 90 L 220 80"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="5"
                    strokeDasharray="4,4"
                  />
                  <text x="85" y="110" fill="#64748B" fontSize="7" transform="rotate(-60 85 110)">
                    MAINTENANCE ROAD
                  </text>

                  {/* Active Route Highlight Overlay in SVG Mode */}
                  {routeCoordinates && (
                    <g className="route-layer animate-pulse">
                      <path
                        d={`M ${routeCoordinates.x1} ${routeCoordinates.y1} Q ${routeCoordinates.midX} ${routeCoordinates.midY} ${routeCoordinates.x2} ${routeCoordinates.y2}`}
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="5"
                        strokeLinecap="round"
                        filter="url(#glow)"
                      />
                      <circle cx={routeCoordinates.x1} cy={routeCoordinates.y1} r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                      <circle cx={routeCoordinates.x2} cy={routeCoordinates.y2} r="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                    </g>
                  )}

                  {/* Landmarks Marker Dots */}
                  {filteredLandmarks.map((landmark) => {
                    const isSelected = selectedLandmark?.id === landmark.id;
                    const catColor = getCategoryColor(landmark.category);
                    return (
                      <g
                        key={landmark.id}
                        className="cursor-pointer transition-transform hover:scale-125"
                        onClick={() => handleSelectLandmark(landmark)}
                      >
                        {isSelected && (
                          <circle
                            cx={landmark.mapX}
                            cy={landmark.mapY}
                            r="14"
                            fill={catColor}
                            fillOpacity="0.3"
                            className="animate-ping"
                          />
                        )}
                        <circle
                          cx={landmark.mapX}
                          cy={landmark.mapY}
                          r={isSelected ? 8 : 5}
                          fill={catColor}
                          stroke="#FFFFFF"
                          strokeWidth={isSelected ? 2 : 1}
                        />
                        <text
                          x={landmark.mapX}
                          y={landmark.mapY + (isSelected ? 16 : 12)}
                          fill={isSelected ? '#FBBF24' : '#E2E8F0'}
                          fontSize={isSelected ? '9' : '7.5'}
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          textAnchor="middle"
                          className="pointer-events-none drop-shadow-sm select-none"
                        >
                          {landmark.name.replace(/ \(.*\)/, '')}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* SVG Zoom Controls */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
                  <button
                    onClick={() => handleVectorZoom(0.2)}
                    className="p-2 bg-white/90 text-oau-navy hover:bg-white border border-slate-300 shadow-sm transition-colors"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleVectorZoom(-0.2)}
                    className="p-2 bg-white/90 text-oau-navy hover:bg-white border border-slate-300 shadow-sm transition-colors"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleVectorReset}
                    className="p-2 bg-white/90 text-oau-navy hover:bg-white border border-slate-300 shadow-sm transition-colors"
                    title="Reset view"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick External Map Navigation Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 bg-white p-3 border border-slate-200">
            <span className="font-semibold text-slate-700">Need Turn-by-Turn GPS Navigation?</span>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={
                  selectedLandmark?.googleMapsUrl ||
                  (selectedLandmark
                    ? `https://www.google.com/maps/search/?api=1&query=${selectedLandmark.lat},${selectedLandmark.lng}`
                    : `https://www.google.com/maps/search/?api=1&query=${OAU_CENTER_COORDINATES.lat},${OAU_CENTER_COORDINATES.lng}`)
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 text-oau-navy font-bold text-xs border border-amber-500 shadow-xs hover:bg-amber-300 transition-colors"
              >
                <span>Navigate via Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={
                  selectedLandmark
                    ? `https://www.openstreetmap.org/?mlat=${selectedLandmark.lat}&mlon=${selectedLandmark.lng}#map=17/${selectedLandmark.lat}/${selectedLandmark.lng}`
                    : `https://www.openstreetmap.org/?mlat=${OAU_CENTER_COORDINATES.lat}&mlon=${OAU_CENTER_COORDINATES.lng}#map=16/${OAU_CENTER_COORDINATES.lat}/${OAU_CENTER_COORDINATES.lng}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-800 font-bold text-xs border border-slate-300 shadow-xs hover:bg-slate-100 transition-colors"
              >
                <span>OpenStreetMap</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Active Route Guidance Banner */}
          {activeRoute && (
            <div className="border-2 border-amber-500 bg-amber-50 p-4 space-y-3">
              <div className="flex items-start justify-between gap-2 border-b border-amber-200 pb-2">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-1.5 py-0.5">
                    ACTIVE WALKING TRAIL
                  </span>
                  <h3 className="font-black text-base text-oau-navy mt-1">{activeRoute.title}</h3>
                </div>
                <button
                  onClick={() => setActiveRouteId(null)}
                  className="p-1 text-slate-500 hover:text-slate-800"
                  title="Clear active trail"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-white border border-amber-200">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Estimated Walk</span>
                  <span className="font-black text-amber-700 text-sm">~{activeRoute.estimatedMinutes} Mins</span>
                </div>
                <div className="p-2 bg-white border border-amber-200">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Distance</span>
                  <span className="font-black text-slate-800 text-sm">~{activeRoute.distanceMeters} Meters</span>
                </div>
                <div className="col-span-2 sm:col-span-1 p-2 bg-white border border-amber-200">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Departure Strategy</span>
                  <span className="font-semibold text-slate-700 text-[11px] leading-tight block">
                    {activeRoute.recommendedTime}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-800">
                <span className="font-bold text-oau-navy block uppercase text-[11px] tracking-wide">
                  Step-by-Step Navigation Trail:
                </span>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  {activeRoute.directions.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {activeRoute.shortcutTip && (
                <div className="p-2.5 bg-amber-100/70 border border-amber-300 text-xs text-amber-950 flex items-start gap-2">
                  <Footprints className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Campus Shortcut:</strong> {activeRoute.shortcutTip}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Landmark Dossier Drawer (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedLandmark ? (
            <div className="border border-slate-300 bg-white p-5 space-y-4 shadow-xs sticky top-20">
              <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span
                    className="inline-block px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider mb-1"
                    style={{ backgroundColor: getCategoryColor(selectedLandmark.category) }}
                  >
                    {selectedLandmark.categoryLabel}
                  </span>
                  <h2 className="text-lg font-black text-oau-navy leading-tight">{selectedLandmark.name}</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{selectedLandmark.officialName}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-slate-500 block">ZONE</span>
                  <span className="text-xs font-bold text-oau-navy">{selectedLandmark.zone}</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">{selectedLandmark.description}</p>

              {/* Verified Pin Badge */}
              {selectedLandmark.googleMapsUrl && (
                <div className="flex items-center gap-2 p-2 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-bold">Verified Google Maps Institutional Pin</span>
                </div>
              )}

              {/* Fresher Walking Metrics */}
              <div className="border border-slate-200 bg-slate-50 p-3 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-campus-blue" />
                  <span>Walking Time from 100L Hostels</span>
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">From Mozambique</span>
                    <span className="font-black text-oau-navy">{selectedLandmark.walkingTimeFromMoz}</span>
                  </div>
                  <div className="p-2 bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">From Angola</span>
                    <span className="font-black text-oau-navy">{selectedLandmark.walkingTimeFromAngola}</span>
                  </div>
                </div>
              </div>

              {/* Transit Stop */}
              <div className="p-2.5 border border-slate-200 bg-white text-xs space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                  <Bus className="w-3 h-3 text-amber-500" />
                  <span>Nearest Shuttle & Transit Stop</span>
                </span>
                <p className="font-bold text-slate-800">{selectedLandmark.nearestTransitStop}</p>
              </div>

              {/* Fresher Insider Tip */}
              <div className="p-3 border border-amber-300 bg-amber-50/70 text-xs text-amber-950 space-y-1">
                <span className="font-bold uppercase text-[10px] tracking-wide text-amber-900 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Fresher Survival Intelligence</span>
                </span>
                <p className="leading-relaxed">{selectedLandmark.fresherTip}</p>
              </div>

              {/* Courses & Primary Uses */}
              <div className="text-xs text-slate-600 border-t border-slate-200 pt-3">
                <span className="font-bold uppercase text-[10px] text-slate-500 block mb-1">
                  Courses & Institutional Uses:
                </span>
                <p className="leading-relaxed">{selectedLandmark.coursesOrUses}</p>
              </div>

              {/* Direct GPS Navigation Buttons */}
              <div className="pt-2 space-y-2">
                {selectedLandmark.googleMapsUrl && (
                  <a
                    href={selectedLandmark.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-300" />
                    <span>Open Verified Google Maps Pin</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLandmark.lat},${selectedLandmark.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-amber-400 hover:bg-amber-300 text-oau-navy text-xs font-bold flex items-center justify-center gap-2 border border-amber-500 shadow-xs transition-colors"
                >
                  <Footprints className="w-3.5 h-3.5 text-oau-navy" />
                  <span>Google Walking Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => {
                    setActiveTab('downloaded');
                    handleSelectLandmark(selectedLandmark);
                  }}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 border border-slate-300 transition-colors"
                >
                  <Crosshair className="w-3.5 h-3.5 text-slate-600" />
                  <span>Inspect on Downloaded Aerial Map</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-slate-300 p-8 text-center text-slate-500 text-xs space-y-2">
              <Compass className="w-8 h-8 mx-auto text-slate-400" />
              <p className="font-bold text-slate-700">Select any landmark on the map</p>
              <p>Click any marker or select a walking route to inspect walking times, shuttle stops, and tips.</p>
            </div>
          )}

          {/* Quick Landmark Fast-Jump List */}
          <div className="border border-slate-200 bg-white p-4 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-oau-navy border-b border-slate-200 pb-1.5 flex items-center justify-between">
              <span>Quick Fast-Jump ({filteredLandmarks.length})</span>
              <span className="text-[10px] text-slate-500 font-normal">Click to view</span>
            </h3>
            <div className="max-h-60 overflow-y-auto space-y-1 text-xs pr-1">
              {filteredLandmarks.map((lm) => (
                <button
                  key={lm.id}
                  onClick={() => handleSelectLandmark(lm)}
                  className={`w-full text-left p-2 border transition-colors flex items-center justify-between ${
                    selectedLandmark?.id === lm.id
                      ? 'bg-slate-100 border-oau-navy font-bold text-oau-navy'
                      : 'border-transparent hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate pr-2">
                    {lm.googleMapsUrl && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>}
                    <span className="truncate">{lm.name}</span>
                  </div>
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: getCategoryColor(lm.category) }}
                  ></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sharon Architectural Zone Glossary */}
      <div className="border border-slate-200 bg-white p-5 space-y-3 text-left">
        <h3 className="font-black text-sm uppercase tracking-wide text-oau-navy border-b border-slate-200 pb-2">
          Arieh Sharon’s Campus Masterplan: 10 Functional Zones
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          The 13,000-acre university estate is zoned to separate pedestrian academic quadrangles from residential villages and expansive sports basins.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {CAMPUS_ZONES.map((z) => (
            <div key={z.id} className="p-2.5 border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-xs font-bold text-oau-navy block">{z.name}</span>
              <p className="text-[11px] text-slate-600 leading-tight">{z.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
