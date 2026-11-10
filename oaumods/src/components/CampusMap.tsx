'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import {
  MapPin,
  Navigation,
  Compass,
  Search,
  ExternalLink,
  Layers,
  ZoomIn,
  ZoomOut,
  Clock,
  Bus,
  Footprints,
  Info,
  CheckCircle2,
  X,
  Map as MapIcon,
  Globe,
  Sparkles,
  Crosshair,
  ListFilter,
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
    <div className="w-full h-[480px] sm:h-[560px] lg:h-[620px] bg-slate-900 border border-slate-700 flex flex-col items-center justify-center text-white gap-3 select-none">
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
  const searchParams = useSearchParams();
  const queryLandmarkId = searchParams?.get('landmark') || searchParams?.get('id') || initialLandmarkId;

  // Exactly TWO map modes as requested:
  // 1. 'interactive' = High-Performance Leaflet OpenStreetMap with GPS nodes & routes
  // 2. 'google' = Google Maps Live Embed with Roadmap & Satellite options
  const [activeTab, setActiveTab] = useState<'interactive' | 'google'>('interactive');
  const [rightPanelTab, setRightPanelTab] = useState<'dossier' | 'directory'>('dossier');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedLandmark, setSelectedLandmark] = useState<CampusLandmark | null>(() => {
    if (queryLandmarkId) {
      const match = CAMPUS_LANDMARKS.find(
        (l) => l.id === queryLandmarkId || l.nickname?.toLowerCase() === queryLandmarkId.toLowerCase()
      );
      if (match) return match;
    }
    // Default to Oduduwa Hall
    return CAMPUS_LANDMARKS.find((l) => l.id === 'oduduwa-hall') || CAMPUS_LANDMARKS[0];
  });
  
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);

  // Sync state if query parameter changes
  useEffect(() => {
    if (queryLandmarkId) {
      const match = CAMPUS_LANDMARKS.find(
        (l) => l.id === queryLandmarkId || l.nickname?.toLowerCase() === queryLandmarkId.toLowerCase()
      );
      if (match) {
        // Using setTimeout to defer state update outside of current render cycle
        setTimeout(() => {
          setSelectedLandmark(match);
          setRightPanelTab('dossier');
        }, 0);
      }
    }
  }, [queryLandmarkId]);

  // Google Maps Embed State
  const [googleMapType, setGoogleMapType] = useState<'m' | 'k'>('m'); // 'm' = Roadmap, 'k' = Satellite
  const [googleZoom, setGoogleZoom] = useState<number>(17);

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

  const googleEmbedUrl = useMemo(() => {
    const lat = selectedLandmark ? selectedLandmark.lat : OAU_CENTER_COORDINATES.lat;
    const lng = selectedLandmark ? selectedLandmark.lng : OAU_CENTER_COORDINATES.lng;
    return `https://maps.google.com/maps?q=${lat},${lng}&t=${googleMapType}&z=${googleZoom}&hl=en&output=embed`;
  }, [selectedLandmark, googleMapType, googleZoom]);

  const handleSelectLandmark = (landmark: CampusLandmark) => {
    setSelectedLandmark(landmark);
    setRightPanelTab('dossier');
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
      <div className="relative border border-slate-200 bg-white p-5 sm:p-6 space-y-4 overflow-hidden shadow-xs">
        <div className="absolute top-2 right-4 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="hexagon" color="gold" size="lg" variant="outline" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wide">
            <GeometricShape type="triangle" color="gold" size="sm" />
            <span>{isFreshmanContext ? 'FRESHMAN ROUTE NAVIGATOR' : 'OAU CAMPUS ATLAS'}</span>
          </div>

          {/* Mode Switcher: Exactly TWO Modes (Interactive Map vs Google Maps) */}
          <div className="flex items-center border border-slate-300 bg-slate-100 p-0.5 text-xs font-bold w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`flex items-center gap-1.5 px-4 py-2 transition-colors ${
                activeTab === 'interactive'
                  ? 'bg-oau-navy text-white shadow-xs'
                  : 'text-slate-700 hover:text-oau-navy hover:bg-slate-200/60'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-blue-400" />
              <span>Interactive Map (GPS)</span>
            </button>
            <button
              onClick={() => setActiveTab('google')}
              className={`flex items-center gap-1.5 px-4 py-2 transition-colors ${
                activeTab === 'google'
                  ? 'bg-oau-navy text-white shadow-xs'
                  : 'text-slate-700 hover:text-oau-navy hover:bg-slate-200/60'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Google Maps (Live)</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-black text-oau-navy">
            Interactive Campus <WordAccent shape="circle" color="gold">Map & Spatial</WordAccent> Navigator
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl mt-1">
            Real-world geospatial map of Obafemi Awolowo University. Toggle seamlessly between the interactive GPS map (with pin badges, walking trails, and OpenStreetMap tiles) and live Google Maps with direction routing.
          </p>
        </div>

        {/* Quick Search & Route Bar */}
        <div className="pt-1 grid grid-cols-1 md:grid-cols-12 gap-3">
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
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
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

      {/* Main Map Viewport & Dossier Grid (Height-Balanced on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Map Canvas Container (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative border border-slate-300 bg-white shadow-xs overflow-hidden">
            {/* ============================================================== */}
            {/* MODE 1: Interactive Real Leaflet GPS Map                       */}
            {/* ============================================================== */}
            {activeTab === 'interactive' && (
              <LeafletMap
                landmarks={filteredLandmarks}
                selectedLandmark={selectedLandmark}
                onSelectLandmark={handleSelectLandmark}
                activeRoute={activeRoute}
              />
            )}

            {/* ============================================================== */}
            {/* MODE 2: Live Embedded Google Maps View                         */}
            {/* ============================================================== */}
            {activeTab === 'google' && (
              <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[620px] bg-slate-950 overflow-hidden">
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
          </div>

          {/* Quick External Map Navigation Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 bg-white p-3 border border-slate-200 shadow-xs">
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

        {/* Right Dossier & Directory Panel (4 cols, Balanced Height) */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          {/* Header Switcher: Landmark Dossier vs Fast-Jump Directory */}
          <div className="flex items-center border border-slate-300 bg-slate-100 p-0.5 text-xs font-bold shrink-0">
            <button
              onClick={() => setRightPanelTab('dossier')}
              className={`flex-1 py-1.5 px-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
                rightPanelTab === 'dossier'
                  ? 'bg-oau-navy text-white shadow-xs'
                  : 'text-slate-700 hover:text-oau-navy'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Landmark Dossier</span>
            </button>
            <button
              onClick={() => setRightPanelTab('directory')}
              className={`flex-1 py-1.5 px-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
                rightPanelTab === 'directory'
                  ? 'bg-oau-navy text-white shadow-xs'
                  : 'text-slate-700 hover:text-oau-navy'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5 text-emerald-500" />
              <span>Directory ({filteredLandmarks.length})</span>
            </button>
          </div>

          {/* TAB 1: Selected Landmark Dossier */}
          {rightPanelTab === 'dossier' && (
            <div className="border border-slate-300 bg-white p-4 sm:p-5 flex flex-col h-[560px] lg:h-[620px] shadow-xs">
              {selectedLandmark ? (
                <div className="flex flex-col h-full space-y-3">
                  {/* Top Metadata Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5 shrink-0">
                    <span
                      className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider rounded-xs"
                      style={{ backgroundColor: getCategoryColor(selectedLandmark.category) }}
                    >
                      {selectedLandmark.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-xs">
                      <span className="text-slate-400 font-normal">Zone:</span> {selectedLandmark.zone}
                    </span>
                  </div>

                  {/* Scrollable Dossier Content Area */}
                  <div className="overflow-y-auto pr-1 space-y-3 flex-1 text-left">
                    <div>
                      <h2 className="text-xl font-black text-oau-navy leading-tight">{selectedLandmark.name}</h2>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{selectedLandmark.officialName}</p>
                    </div>

                    {/* Verified Pin Badge */}
                    {selectedLandmark.googleMapsUrl && (
                      <div className="flex items-center gap-2 p-2 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-[11px] font-bold">Verified Google Maps Institutional Pin</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-slate-700 leading-relaxed">{selectedLandmark.description}</p>

                    {/* Fresher Walking Metrics */}
                    <div className="border border-slate-200 bg-slate-50 p-2.5 space-y-1.5 rounded-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-campus-blue" />
                        <span>Walking Time from 100L Hostels</span>
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-white border border-slate-200 rounded-xs">
                          <span className="text-[10px] text-slate-500 block uppercase font-bold">From Mozambique</span>
                          <span className="font-black text-oau-navy text-xs">{selectedLandmark.walkingTimeFromMoz}</span>
                        </div>
                        <div className="p-2 bg-white border border-slate-200 rounded-xs">
                          <span className="text-[10px] text-slate-500 block uppercase font-bold">From Angola</span>
                          <span className="font-black text-oau-navy text-xs">{selectedLandmark.walkingTimeFromAngola}</span>
                        </div>
                      </div>
                    </div>

                    {/* Transit Stop */}
                    <div className="p-2.5 border border-slate-200 bg-white text-xs space-y-0.5 rounded-xs">
                      <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                        <Bus className="w-3.5 h-3.5 text-amber-500" />
                        <span>Nearest Shuttle & Transit Stop</span>
                      </span>
                      <p className="font-bold text-slate-800 text-xs">{selectedLandmark.nearestTransitStop}</p>
                    </div>

                    {/* Fresher Insider Tip */}
                    <div className="p-2.5 border border-amber-300 bg-amber-50/70 text-xs text-amber-950 space-y-1 rounded-xs">
                      <span className="font-bold uppercase text-[10px] tracking-wide text-amber-900 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Fresher Survival Intelligence</span>
                      </span>
                      <p className="leading-relaxed text-[11px]">{selectedLandmark.fresherTip}</p>
                    </div>

                    {/* Courses & Primary Uses */}
                    <div className="text-xs text-slate-600 border-t border-slate-200 pt-2 space-y-0.5">
                      <span className="font-bold uppercase text-[10px] text-slate-500 block">
                        Courses & Institutional Uses:
                      </span>
                      <p className="leading-relaxed text-[11px] text-slate-700">{selectedLandmark.coursesOrUses}</p>
                    </div>
                  </div>

                  {/* Direct GPS Navigation Buttons (Pinned at Bottom) */}
                  <div className="pt-2 space-y-1.5 shrink-0 border-t border-slate-200">
                    {selectedLandmark.googleMapsUrl && (
                      <a
                        href={selectedLandmark.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors rounded-xs"
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
                      className="w-full py-2 px-3 bg-amber-400 hover:bg-amber-300 text-oau-navy text-xs font-bold flex items-center justify-center gap-2 border border-amber-500 shadow-xs transition-colors rounded-xs"
                    >
                      <Footprints className="w-3.5 h-3.5 text-oau-navy" />
                      <span>Google Walking Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() => {
                        setActiveTab(activeTab === 'interactive' ? 'google' : 'interactive');
                      }}
                      className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center gap-1.5 border border-slate-300 transition-colors rounded-xs"
                    >
                      <Crosshair className="w-3 h-3 text-slate-600" />
                      <span>Switch to {activeTab === 'interactive' ? 'Google Maps (Live)' : 'Interactive Map (GPS)'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center border border-dashed border-slate-300 p-8 text-center text-slate-500 text-xs space-y-2">
                  <Compass className="w-8 h-8 text-slate-400" />
                  <p className="font-bold text-slate-700">Select any landmark on the map</p>
                  <p>Click any marker or select a route to inspect walking times, shuttle stops, and tips.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Full Fast-Jump Directory */}
          {rightPanelTab === 'directory' && (
            <div className="border border-slate-300 bg-white p-4 flex flex-col h-[560px] lg:h-[620px] shadow-xs">
              <div className="border-b border-slate-200 pb-2 mb-2 flex items-center justify-between shrink-0">
                <span className="font-bold text-xs uppercase tracking-wider text-oau-navy">
                  Campus POI Directory ({filteredLandmarks.length})
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Click to focus</span>
              </div>
              <div className="overflow-y-auto space-y-1.5 text-xs pr-1 flex-1">
                {filteredLandmarks.map((lm) => (
                  <button
                    key={lm.id}
                    onClick={() => {
                      handleSelectLandmark(lm);
                      setRightPanelTab('dossier');
                    }}
                    className={`w-full text-left p-2.5 border transition-colors flex items-center justify-between rounded-xs ${
                      selectedLandmark?.id === lm.id
                        ? 'bg-amber-50 border-amber-400 font-bold text-oau-navy'
                        : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: getCategoryColor(lm.category) }}
                      />
                      <div className="truncate">
                        <p className="text-xs truncate font-bold text-slate-800">{lm.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{lm.zone}</p>
                      </div>
                    </div>
                    {lm.googleMapsUrl && (
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1 py-0.5 rounded font-mono shrink-0">
                        Verified
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sharon Architectural Zone Glossary */}
      <div className="border border-slate-200 bg-white p-5 space-y-3 text-left shadow-xs">
        <h3 className="font-black text-sm uppercase tracking-wide text-oau-navy border-b border-slate-200 pb-2">
          Arieh Sharon’s Campus Masterplan: 10 Functional Zones
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          The 13,000-acre university estate is zoned to separate pedestrian academic quadrangles from residential villages and expansive sports basins.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {CAMPUS_ZONES.map((z) => (
            <div key={z.id} className="p-2.5 border border-slate-200 bg-slate-50 space-y-1 rounded-xs">
              <span className="text-xs font-bold text-oau-navy block">{z.name}</span>
              <p className="text-[11px] text-slate-600 leading-tight">{z.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
