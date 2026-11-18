"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, MessageSquare, Star } from "lucide-react";
import type { Venue } from "@/data/venues";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`h-3.5 w-3.5 ${star <= Math.round(rating) ? "fill-amber-400 text-amber-500" : "text-slate-300"}`} />
      ))}
    </span>
  );
}

export default function VenueDetails({ venue }: { venue: Venue }) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");

  function handlePreviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Preview only — your review has not been submitted or saved. Backend integration is required.");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Link href="/venues" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 transition hover:text-oau-navy">
        <ArrowLeft className="h-4 w-4" /> Back to campus places
      </Link>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${venue.accent} text-lg font-black text-oau-navy`} aria-hidden="true">
            {venue.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wide text-campus-blue">{venue.category}</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-oau-navy">{venue.name}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500"><MapPin className="h-4 w-4" />{venue.location}</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{venue.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {venue.highlights.map((item) => <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">{item}</span>)}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 sm:min-w-28">
            <p className="flex items-center gap-1 text-lg font-black text-slate-900"><Star className="h-4 w-4 fill-amber-400 text-amber-500" />{venue.rating.toFixed(1)}</p>
            <p className="text-[11px] text-slate-500">{venue.reviewCount} sample reviews</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-oau-navy">Student reviews</h2>
              <p className="mt-0.5 text-xs text-slate-500">Community experiences and ratings</p>
            </div>
            <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-800">Preview data</span>
          </div>
          <div className="mt-3 space-y-3">
            {venue.reviews.length ? venue.reviews.map((review) => (
              <article key={review.id} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-slate-800">{review.author}</p>
                  <span className="text-[10px] text-slate-400">{review.dateLabel}</span>
                </div>
                <div className="mt-1"><Stars rating={review.rating} /></div>
                <p className="mt-2 text-xs leading-5 text-slate-600">{review.comment}</p>
              </article>
            )) : (
              <div className="py-8 text-center">
                <MessageSquare className="mx-auto h-6 w-6 text-slate-300" />
                <p className="mt-2 text-sm font-semibold text-slate-700">No sample reviews yet</p>
                <p className="mt-1 text-xs text-slate-500">The backend will load real student reviews here.</p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <h2 className="text-base font-bold text-oau-navy">Leave a review</h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">Rate your experience and help other students make informed choices.</p>
          <form onSubmit={handlePreviewSubmit} className="mt-4 space-y-4">
            <fieldset>
              <legend className="mb-2 text-xs font-semibold text-slate-700">Your rating</legend>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button key={value} type="button" onClick={() => { setRating(value); setNotice(""); }} aria-label={`Rate ${value} out of 5`} aria-pressed={rating === value}
                    className={`rounded-md border p-2 transition ${rating >= value ? "border-amber-300 bg-amber-50 text-amber-500" : "border-slate-200 text-slate-300 hover:text-amber-400"}`}>
                    <Star className="h-4 w-4 fill-current" />
                  </button>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="venue-review-message" className="mb-1.5 block text-xs font-semibold text-slate-700">Your experience</label>
              <textarea id="venue-review-message" value={message} onChange={(event) => { setMessage(event.target.value); setNotice(""); }} rows={4} maxLength={1000}
                placeholder="What should other students know?"
                className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-xs leading-5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-campus-blue focus:ring-2 focus:ring-blue-100" />
              <p className="mt-1 text-right text-[10px] text-slate-400">{message.length}/1000</p>
            </div>
            <button type="submit" disabled={!rating || message.trim().length < 8}
              className="inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-oau-navy px-4 py-2 text-xs font-bold text-white transition hover:bg-campus-blue disabled:cursor-not-allowed disabled:opacity-50">
              Preview review submission
            </button>
            {notice && <p role="status" className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-[11px] leading-5 text-amber-900">{notice}</p>}
            <p className="text-[10px] leading-4 text-slate-400">This form is a visual prototype. It does not send or store reviews.</p>
          </form>
        </div>
      </section>
    </div>
  );
}
