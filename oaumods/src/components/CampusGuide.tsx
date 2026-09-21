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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Segmented Top Navigation */}
      <div className="flex rounded-xl bg-zinc-100 dark:bg-zinc-800/80 p-1.5 border border-zinc-200 dark:border-zinc-700/60 text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('dining')}
          className={`flex-1 py-2 sm:py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
            activeTab === 'dining'
              ? 'bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 font-bold shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Dining & Grills</span>
        </button>
        <button
          onClick={() => setActiveTab('sanctuaries')}
          className={`flex-1 py-2 sm:py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
            activeTab === 'sanctuaries'
              ? 'bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 font-bold shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Trees className="w-4 h-4" />
          <span>Scenic & Romance</span>
        </button>
        <button
          onClick={() => setActiveTab('transit')}
          className={`flex-1 py-2 sm:py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
            activeTab === 'transit'
              ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
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
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search food, spot (e.g. Amala, Orente, Shawarma, Puff-Puff)..."
                value={diningSearch}
                onChange={(e) => setDiningSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
            <select
              value={diningCategory}
              onChange={(e) => setDiningCategory(e.target.value)}
              aria-label="Filter food spots by category"
              className="px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-medium focus:outline-hidden"
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
                className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-4 sm:p-5 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {spot.name}
                      </h3>
                      <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        {spot.location}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/40 shrink-0">
                      {spot.category}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                    "{spot.vibe}"
                  </p>

                  {/* Specialties Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {spot.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {spot.hours}
                    </span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {spot.priceRange}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 text-[11px] leading-relaxed">
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
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-relaxed">
            <strong>Great Ife Scenic Retreats:</strong> Curated outdoor sanctuaries for quiet meditation, couples' sunset dates, picnic blankets, or escaping the midday campus rush.
          </div>

          <div className="space-y-4">
            {SCENIC_SANCTUARIES.map((spot) => (
              <div
                key={spot.id}
                className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                      {spot.name}
                    </h3>
                    <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {spot.location}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/40 self-start sm:self-auto">
                    Best: {spot.bestHours}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 italic">
                  "{spot.vibe}"
                </p>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Highlights
                  </span>
                  <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
                    {spot.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-500 mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {spot.caveat && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
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
          <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300">
              <Bus className="w-5 h-5" />
              <h3 className="text-base font-bold">Campus Transit Budget Forecaster</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Select Routine Route:
                </label>
                <select
                  value={selectedRouteId}
                  onChange={(e) => setSelectedRouteId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-medium focus:outline-hidden"
                >
                  {TRANSIT_ROUTES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} (₦{r.fare} / trip)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Days Commuted Per Week: {tripsPerWeek} days
                </label>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={tripsPerWeek}
                  onChange={(e) => setTripsPerWeek(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeReturn}
                  onChange={(e) => setIncludeReturn(e.target.checked)}
                  className="rounded-sm text-emerald-600 accent-emerald-500"
                />
                Include daily return trip (2 trips per day)
              </label>

              <div className="text-right">
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Weekly Transit Budget
                </span>
                <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  ₦{weeklyFare.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Route Matrix */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
              Official Campus Routes & Tariffs
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {TRANSIT_ROUTES.map((route) => (
                <div
                  key={route.id}
                  className="p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {route.name}
                      </h4>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-0.5">
                        {route.from} → {route.to}
                      </span>
                    </div>
                    <span className="text-sm font-extrabold px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40 shrink-0">
                      ₦{route.fare}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                      <span>Vehicle: <strong>{route.vehicleType}</strong></span>
                      <span>Freq: <strong>{route.frequency}</strong></span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-1 leading-relaxed">
                      💡 {route.tips}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regulations & Safety Warnings */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
              Campus Transport Regulations
            </h4>
            <div className="space-y-2">
              {TRANSIT_REGULATIONS.map((reg, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
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
