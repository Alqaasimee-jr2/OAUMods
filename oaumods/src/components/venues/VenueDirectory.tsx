"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Search, Star } from "lucide-react";
import { sampleVenues, venueCategories } from "@/data/venues";

export default function VenueDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof venueCategories)[number]>("All");

  const filteredVenues = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return sampleVenues.filter((venue) => {
      const matchesCategory = category === "All" || venue.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [venue.name, venue.category, venue.location, venue.description]
          .some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-campus-blue">Great Ife directory</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-oau-navy sm:text-3xl">Campus places</h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
              Find places and services around campus, then compare student experiences.
            </p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-900">
            Frontend preview · Sample listings
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <label className="relative block flex-1">
            <span className="sr-only">Search campus places</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a place, service or location"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-campus-blue focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <p className="flex items-center text-xs font-medium text-slate-500">
            {filteredVenues.length} {filteredVenues.length === 1 ? "place" : "places"}
          </p>
        </div>

        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Filter by category">
          {venueCategories.map((item) => {
            const selected = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={selected}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${selected
                  ? "border-oau-navy bg-oau-navy text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      {filteredVenues.length > 0 ? (
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Campus venues">
          {filteredVenues.map((venue) => (
            <article key={venue.slug} className="group flex min-h-48 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
              <div className="flex items-start gap-3">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${venue.accent} text-sm font-black text-oau-navy`} aria-hidden="true">
                  {venue.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-campus-blue">{venue.category}</p>
                  <h2 className="mt-0.5 line-clamp-2 text-sm font-bold text-slate-900">{venue.name}</h2>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="line-clamp-1">{venue.location}</span>
                  </p>
                </div>
              </div>

              <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-600">{venue.description}</p>

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                <div>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-900">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                    {venue.rating.toFixed(1)}
                  </span>
                  <span className="ml-1 text-[11px] text-slate-500">({venue.reviewCount} reviews)</span>
                </div>
                <Link href={`/venues/${venue.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-campus-blue hover:text-oau-navy">
                  View place <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
          <Search className="mx-auto h-6 w-6 text-slate-400" />
          <h2 className="mt-2 text-sm font-bold text-slate-800">No places found</h2>
          <p className="mt-1 text-xs text-slate-500">Try another search term or choose a different category.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="mt-3 text-xs font-bold text-campus-blue hover:underline">
            Clear filters
          </button>
        </div>
      )}

      <p className="text-center text-[11px] leading-5 text-slate-500">
        Preview content only. Venue details and ratings will be supplied by the backend when connected.
      </p>
    </div>
  );
}
