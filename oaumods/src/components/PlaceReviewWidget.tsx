'use client';

import { useState, useMemo, useSyncExternalStore } from 'react';
import { Star, MessageSquarePlus, Send, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import {
  PlaceReview,
  CURATED_PLACE_REVIEWS,
  RESTAURANT_REVIEW_TAGS,
  LOCATION_REVIEW_TAGS,
} from '@/data/placeReviews';

const STORAGE_KEY = 'oaumods_place_reviews_v1';
const REVIEWS_EVENT = 'oaumods-place-reviews-updated';
const EMPTY_REVIEWS: PlaceReview[] = [];

let cachedRawReviews: string | null = null;
let cachedParsedReviews: PlaceReview[] = EMPTY_REVIEWS;

function getReviewsSnapshot(): PlaceReview[] {
  if (typeof window === 'undefined') return EMPTY_REVIEWS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRawReviews) {
      return cachedParsedReviews;
    }
    cachedRawReviews = raw;
    if (!raw) {
      cachedParsedReviews = EMPTY_REVIEWS;
      return cachedParsedReviews;
    }
    const parsed = JSON.parse(raw);
    cachedParsedReviews = Array.isArray(parsed) ? parsed : EMPTY_REVIEWS;
    return cachedParsedReviews;
  } catch {
    return EMPTY_REVIEWS;
  }
}

function getServerReviewsSnapshot(): PlaceReview[] {
  return EMPTY_REVIEWS;
}

function subscribeReviews(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener('storage', handler);
  window.addEventListener(REVIEWS_EVENT, handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener(REVIEWS_EVENT, handler);
  };
}

interface PlaceReviewWidgetProps {
  placeId: string;
  placeName: string;
  placeType: 'restaurant' | 'location';
}

export default function PlaceReviewWidget({
  placeId,
  placeName,
  placeType,
}: PlaceReviewWidgetProps) {
  const userReviews = useSyncExternalStore(
    subscribeReviews,
    getReviewsSnapshot,
    getServerReviewsSnapshot
  );

  const [openPlaceId, setOpenPlaceId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [authorLabel, setAuthorLabel] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedState, setSubmittedState] = useState<{ placeId: string; text: string } | null>(null);
  const [errorState, setErrorState] = useState<{ placeId: string; text: string } | null>(null);

  const isOpen = openPlaceId === placeId;
  const submittedNote = submittedState?.placeId === placeId ? submittedState.text : null;
  const errorMsg = errorState?.placeId === placeId ? errorState.text : null;

  const availableTags = placeType === 'restaurant' ? RESTAURANT_REVIEW_TAGS : LOCATION_REVIEW_TAGS;

  const reviewsForPlace = useMemo(() => {
    const localMatches = userReviews.filter((r) => r.placeId === placeId);
    const curatedMatches = CURATED_PLACE_REVIEWS.filter((r) => r.placeId === placeId);
    return [...localMatches, ...curatedMatches];
  }, [userReviews, placeId]);

  const averageRating = useMemo(() => {
    if (reviewsForPlace.length === 0) return null;
    const sum = reviewsForPlace.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviewsForPlace.length).toFixed(1);
  }, [reviewsForPlace]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorState(null);

    if (rating < 1 || rating > 5) {
      setErrorState({ placeId, text: 'Please select a star rating between 1 and 5.' });
      return;
    }

    setIsSubmitting(true);

    const newReview: PlaceReview = {
      id: `user-${Date.now()}`,
      placeId,
      placeName,
      authorLabel: authorLabel.trim().slice(0, 50) || 'Great Ife Student',
      rating,
      tags: selectedTags,
      comment: comment.trim().slice(0, 400),
      createdAt: 'Saved locally • Sent to team',
      isUserSubmitted: true,
    };

    try {
      const updatedList = [newReview, ...userReviews];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
        window.dispatchEvent(new Event(REVIEWS_EVENT));
      } catch {
        // Ignore storage write errors
      }

      // Forward to team curation pipeline (best-effort so offline PWA still works)
      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: placeType === 'restaurant' ? 'Restaurant Review' : 'Campus Location Review',
            pageOrPlace: `${placeName} (${placeId})`,
            rating: `${rating}/5 Stars${selectedTags.length > 0 ? ` [${selectedTags.join(', ')}]` : ''}`,
            message: `${newReview.authorLabel}: ${newReview.comment || '(Rating & tags only)'}`,
            source: 'OAUMods PlaceReviewWidget',
          }),
        });
      } catch {
        // Offline or network unavailable — local save still succeeded
      }

      setComment('');
      setSelectedTags([]);
      setAuthorLabel('');
      setRating(5);
      setOpenPlaceId(null);
      setSubmittedState({
        placeId,
        text: 'Review saved on your device & sent to the OAUMods team for curation!',
      });
      setTimeout(() => {
        setSubmittedState((curr) => (curr?.placeId === placeId ? null : curr));
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-t border-slate-200 pt-3 mt-2 space-y-2.5 text-left">
      {/* Compact Rating Summary & Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {averageRating ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-300 text-amber-950 text-[11px] font-black">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>{averageRating}</span>
              <span className="text-slate-600 font-semibold">
                ({reviewsForPlace.length} {reviewsForPlace.length === 1 ? 'review' : 'reviews'})
              </span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-semibold">
              <Star className="w-3 h-3 text-slate-400" />
              <span>Be the first student to review</span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpenPlaceId((prev) => (prev === placeId ? null : placeId))}
          aria-expanded={isOpen}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-oau-navy bg-slate-100 hover:bg-amber-100 border border-slate-300 transition-colors"
        >
          <MessageSquarePlus className="w-3 h-3 text-oau-navy" />
          <span>{isOpen ? 'Close Form' : 'Rate & Review'}</span>
          {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Submission Confirmation */}
      {submittedNote && (
        <div className="p-2 bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] font-bold flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{submittedNote}</span>
        </div>
      )}

      {/* Up to 2 Recent Student Review Snippets */}
      {reviewsForPlace.length > 0 && (
        <div className="space-y-1.5">
          {reviewsForPlace.slice(0, 2).map((rev) => (
            <div
              key={rev.id}
              className={`p-2 border text-[11px] space-y-1 ${
                rev.isUserSubmitted
                  ? 'bg-amber-50/60 border-amber-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="font-bold text-oau-navy">{rev.authorLabel}</span>
                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center gap-0.5 text-amber-600 font-black">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star key={idx} className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                    ))}
                  </span>
                  <span className="text-[10px] text-slate-500">{rev.createdAt}</span>
                </div>
              </div>
              {rev.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {rev.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.2 bg-white border border-slate-200 text-[10px] font-semibold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {rev.comment && (
                <p className="text-slate-700 leading-relaxed">{rev.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Collapsible Inline Review Form */}
      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="p-3 bg-slate-50 border border-slate-300 space-y-3"
        >
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-oau-navy block">
              Rate {placeName}:
            </span>
            <div className="flex items-center gap-1" role="group" aria-label="Star rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  aria-label={`Rate ${value} out of 5 stars`}
                  className={`p-1.5 border transition-colors ${
                    value <= rating
                      ? 'bg-amber-100 border-amber-400 text-amber-600'
                      : 'bg-white border-slate-300 text-slate-400 hover:text-amber-500'
                  }`}
                >
                  <Star
                    className={`w-4 h-4 ${
                      value <= rating ? 'fill-amber-400 text-amber-500' : ''
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-slate-700">{rating}/5</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-700 block">
              Quick Vibe Tags (Optional):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-2 py-0.5 text-[10px] font-bold border transition-colors ${
                      active
                        ? 'bg-oau-navy text-white border-oau-navy'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor={`author-${placeId}`}
              className="text-[11px] font-bold text-slate-700 block"
            >
              Your Student Tag (Optional)
            </label>
            <input
              id={`author-${placeId}`}
              type="text"
              maxLength={50}
              value={authorLabel}
              onChange={(e) => setAuthorLabel(e.target.value)}
              placeholder="e.g. 100L Science, Stalite"
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-oau-navy"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor={`comment-${placeId}`}
              className="text-[11px] font-bold text-slate-700 block"
            >
              Student Tip or Review (Optional, max 400 chars)
            </label>
            <textarea
              id={`comment-${placeId}`}
              rows={2}
              maxLength={400}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                placeType === 'restaurant'
                  ? 'How is the food, queue speed, or seating?'
                  : 'Any useful tips for freshers visiting this spot?'
              }
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-oau-navy"
            />
          </div>

          {errorMsg && (
            <p className="text-[11px] font-bold text-red-700">{errorMsg}</p>
          )}

          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] text-slate-500">
              Appears locally now &amp; submits to team for site-wide curation.
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-oau-navy hover:bg-slate-800 disabled:opacity-60 text-white text-xs font-bold transition-colors shrink-0"
            >
              <Send className="w-3 h-3 text-amber-400" />
              <span>{isSubmitting ? 'Saving...' : 'Post Review'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
