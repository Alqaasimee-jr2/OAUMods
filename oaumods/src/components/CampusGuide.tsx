'use client';

import React, { useState } from 'react';
import {
  DINING_SPOTS,
  SCENIC_SANCTUARIES,
  DiningSpot,
  SanctuarySpot,
} from '@/data/diningSpots';
import {
  TRANSIT_ROUTES,
  TRANSIT_REGULATIONS,
  TransitRoute,
} from '@/data/transit';
import {
  Utensils,
  Heart,
  Bus,
  MapPin,
  Clock,
  Sparkles,
  AlertTriangle,
  BadgePercent,
  Search,
  CheckCircle2,
  DollarSign,
  Coffee,
  Trees,
} from 'lucide-react';

export default function CampusGuide() {
  const [activeTab, setActiveTab] = useState<'dining' | 'sanctuaries' | 'transit'>('dining');
  const [diningCategory, setDiningCategory] = useState<string>('all');
  const [diningSearch, setDiningSearch] = useState<string>('');

  // Transit Calculator state
  const [selectedRouteId, setSelectedRouteId] = useState<string>(TRANSIT_ROUTES[0].id);
  const [tripsPerWeek, setTripsPerWeek] = useState<number>(10);
  const [includeReturn, setIncludeReturn] = useState<boolean>(true);

  // Filtered dining spots
  const filteredDining = DINING_SPOTS.filter((spot) => {
    const matchesCategory = diningCategory === 'all' || spot.category === diningCategory;
    const matchesSearch =
      spot.name.toLowerCase().includes(diningSearch.toLowerCase()) ||
      spot.location.toLowerCase().includes(diningSearch.toLowerCase()) ||
      spot.specialties.some((s) => s.toLowerCase().includes(diningSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const selectedRoute = TRANSIT_ROUTES.find((r) => r.id === selectedRouteId) || TRANSIT_ROUTES[0];
  const weeklyFare = selectedRoute.fare * (includeReturn ? 2 : 1) * tripsPerWeek;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-12">
      {/* Segmented Top Navigation */}
      <div className="flex rounded-xl bg-pale-blue/60 dark:bg-[#122033] p-1.5 border border-soft-blue-gray dark:border-[#1C2D44] text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('dining')}
          className={`flex-1 py-2 sm:py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
            activeTab === 'dining'
              ? 'bg-pure-white dark:bg-[#0E1827] text-student-gold font-bold shadow-xs'
              : 'text-muted-slate dark:text-slate-400 hover:text-deep-slate dark:hover:text-slate-200'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Dining & Grills</span>
        </button>
        <button
          onClick={() => setActiveTab('sanctuaries')}
          className={`flex-1 py-2 sm:py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
            activeTab === 'sanctuaries'
              ? 'bg-pure-white dark:bg-[#0E1827] text-soft-red font-bold shadow-xs'
              : 'text-muted-slate dark:text-slate-400 hover:text-deep-slate dark:hover:text-slate-200'
          }`}
        >
          <Trees className="w-4 h-4" />
          <span>Scenic & Romance</span>
        </button>
        <button
          onClick={() => setActiveTab('transit')}
          className={`flex-1 py-2 sm:py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
            activeTab === 'transit'
              ? 'bg-pure-white dark:bg-[#0E1827] text-campus-blue dark:text-sky-blue font-bold shadow-xs'
              : 'text-muted-slate dark:text-slate-400 hover:text-deep-slate dark:hover:text-slate-200'
          }`}
        >
          <Bus className="w-4 h-4" />
          <span>Campus Transit</span>
        </button>
      </div>

      {/* ================= TAB 1: DINING SPOTS ================= */}
      {activeTab === 'dining' && (
        <div className="space-y-4">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-slate" />
              <input
                type="text"
                placeholder="Search food, spot (e.g. Amala, Orente, Shawarma, Puff-Puff)..."
                value={diningSearch}
                onChange={(e) => setDiningSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] text-sm text-deep-slate dark:text-white focus:outline-hidden focus:ring-2 focus:ring-campus-blue/50"
              />
            </div>
            <select
              value={diningCategory}
              onChange={(e) => setDiningCategory(e.target.value)}
              aria-label="Filter food spots by category"
              className="px-3 py-2.5 rounded-xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] text-xs sm:text-sm font-medium text-deep-slate dark:text-white focus:outline-hidden"
            >
              <option value="all">All Categories</option>
              <option value="Grills & Barbecue">Grills & Barbecue</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Swallow & Bukas">Swallow & Bukas</option>
              <option value="Finger Foods">Finger Foods</option>
              <option value="Hostel Diner">Hostel Diner</option>
            </select>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredDining.map((spot) => (
              <div
                key={spot.id}
                className="rounded-2xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] p-4 sm:p-5 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-oau-navy dark:text-white">
                        {spot.name}
                      </h3>
                      <span className="flex items-center gap-1 text-xs text-muted-slate dark:text-slate-400 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-campus-blue shrink-0" />
                        {spot.location}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-student-gold/20 text-amber-900 dark:text-student-gold border border-student-gold/40 shrink-0">
                      {spot.category}
                    </span>
                  </div>

                  <p className="text-xs text-muted-slate dark:text-slate-300 leading-relaxed italic">
                    "{spot.vibe}"
                  </p>

                  {/* Specialties Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {spot.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-pale-blue dark:bg-white/5 text-campus-blue dark:text-sky-300 border border-soft-blue-gray/50 dark:border-transparent"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-soft-blue-gray/50 dark:border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-muted-slate dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {spot.hours}
                    </span>
                    <span className="font-bold text-fresh-green dark:text-emerald-300">
                      {spot.priceRange}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-pale-blue/50 dark:bg-[#122033] text-deep-slate dark:text-slate-300 text-[11px] leading-relaxed border border-soft-blue-gray/40 dark:border-transparent">
                    💡 <strong>Freshman Tip:</strong> {spot.tips}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 2: SCENIC SANCTUARIES ================= */}
      {activeTab === 'sanctuaries' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-soft-red/10 border border-soft-red/20 text-xs sm:text-sm text-deep-slate dark:text-slate-200 leading-relaxed">
            <strong>Great Ife Scenic Retreats:</strong> Curated outdoor sanctuaries for quiet meditation, couples' sunset dates, picnic blankets, or escaping the midday campus rush.
          </div>

          <div className="space-y-4">
            {SCENIC_SANCTUARIES.map((spot) => (
              <div
                key={spot.id}
                className="rounded-2xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-oau-navy dark:text-white flex items-center gap-2">
                      <Heart className="w-4 h-4 text-soft-red fill-soft-red" />
                      {spot.name}
                    </h3>
                    <span className="flex items-center gap-1 text-xs text-muted-slate dark:text-slate-400 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-campus-blue" />
                      {spot.location}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-soft-red/10 text-soft-red border border-soft-red/30 self-start sm:self-auto">
                    Best: {spot.bestHours}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted-slate dark:text-slate-300 italic">
                  "{spot.vibe}"
                </p>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-slate block">
                    Highlights
                  </span>
                  <ul className="space-y-1 text-xs text-muted-slate dark:text-slate-300">
                    {spot.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-soft-red mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {spot.caveat && (
                  <div className="p-3 rounded-xl bg-amber-warn/10 border border-amber-warn/30 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-warn shrink-0 mt-0.5" />
                    <span><strong>Heads up:</strong> {spot.caveat}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: TRANSIT & TARIFFS ================= */}
      {activeTab === 'transit' && (
        <div className="space-y-5">
          {/* Interactive Fare Budget Estimator */}
          <div className="rounded-2xl border-2 border-campus-blue/30 bg-pale-blue/60 dark:bg-[#0E1827] p-5 space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5 text-oau-navy dark:text-sky-blue">
              <Bus className="w-5 h-5 text-campus-blue" />
              <h3 className="text-base font-bold">Campus Transit Budget Forecaster</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="font-semibold text-deep-slate dark:text-slate-300">
                  Select Routine Route:
                </label>
                <select
                  value={selectedRouteId}
                  onChange={(e) => setSelectedRouteId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#09101A] text-xs sm:text-sm font-medium text-deep-slate dark:text-white focus:outline-hidden"
                >
                  {TRANSIT_ROUTES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} (₦{r.fare} / trip)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-deep-slate dark:text-slate-300">
                  Days Commuted Per Week: {tripsPerWeek} days
                </label>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={tripsPerWeek}
                  onChange={(e) => setTripsPerWeek(parseInt(e.target.value))}
                  className="w-full accent-campus-blue cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-xs text-muted-slate dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeReturn}
                  onChange={(e) => setIncludeReturn(e.target.checked)}
                  className="rounded-sm accent-campus-blue"
                />
                Include daily return trip (2 trips per day)
              </label>

              <div className="text-right">
                <span className="text-[11px] text-muted-slate dark:text-slate-400 uppercase tracking-wider block">
                  Weekly Transit Budget
                </span>
                <span className="text-xl font-extrabold text-campus-blue dark:text-sky-300">
                  ₦{weeklyFare.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Route Matrix */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-slate px-1">
              Official Campus Routes & Tariffs
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {TRANSIT_ROUTES.map((route) => (
                <div
                  key={route.id}
                  className="p-4 rounded-2xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-oau-navy dark:text-white">
                        {route.name}
                      </h4>
                      <span className="text-xs text-muted-slate dark:text-slate-400 block mt-0.5">
                        {route.from} → {route.to}
                      </span>
                    </div>
                    <span className="text-sm font-extrabold px-2.5 py-1 rounded-xl bg-fresh-green/10 text-fresh-green dark:text-emerald-300 border border-fresh-green/20 shrink-0">
                      ₦{route.fare}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-muted-slate dark:text-slate-400">
                    <div className="flex items-center justify-between text-[11px] text-muted-slate dark:text-slate-400">
                      <span>Vehicle: <strong className="text-deep-slate dark:text-slate-200">{route.vehicleType}</strong></span>
                      <span>Freq: <strong className="text-deep-slate dark:text-slate-200">{route.frequency}</strong></span>
                    </div>
                    <p className="text-[11px] text-muted-slate dark:text-slate-400 pt-1 leading-relaxed">
                      💡 {route.tips}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regulations & Safety Warnings */}
          <div className="p-4 rounded-2xl bg-pale-blue/40 dark:bg-[#0E1827] border border-soft-blue-gray dark:border-[#1C2D44] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-oau-navy dark:text-sky-blue">
              Campus Transport Regulations
            </h4>
            <div className="space-y-2">
              {TRANSIT_REGULATIONS.map((reg, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-deep-slate dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-fresh-green shrink-0 mt-0.5" />
                  <div>
                    <strong>{reg.title}:</strong> {reg.rule}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
