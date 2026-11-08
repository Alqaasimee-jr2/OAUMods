'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  AlertCircle,
  CheckCircle2,
  MessageSquareText,
  Send,
  ThumbsDown,
  ThumbsUp,
  X,
} from 'lucide-react';

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ||
  'https://formspree.io/f/mrpedlyz';

type Rating = 'helpful' | 'not-helpful';
type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

export default function FeedbackShortcut() {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const isOpen = openPathname === pathname;
  const [rating, setRating] = useState<Rating | null>(null);
  const [comment, setComment] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [error, setError] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstRatingRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    firstRatingRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenPathname(null);
        setRating(null);
        setComment('');
        setStatus('idle');
        setError('');
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (pathname === '/feedback' || pathname.startsWith('/feedback/')) {
    return null;
  }

  function closePanel() {
    setOpenPathname(null);
    setRating(null);
    setComment('');
    setWebsite('');
    setStatus('idle');
    setError('');
    triggerRef.current?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!rating) {
      setError('Choose whether this page was helpful before sending.');
      setStatus('error');
      return;
    }

    if (website.trim()) {
      setError('We could not send your feedback. Please try again.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);
    const ratingLabel = rating === 'helpful' ? 'Helpful' : 'Not helpful';
    const message = comment.trim()
      ? `Page rating: ${ratingLabel}\n\nStudent comment: ${comment.trim()}`
      : `Page rating: ${ratingLabel}`;

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          _subject: `[OAUMods Page Feedback] ${ratingLabel}`,
          category: 'Page feedback',
          rating: ratingLabel,
          message,
          pageOrPlace: pathname || '/',
          source: 'OAUMods floating feedback shortcut',
          website,
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        const formspreeError = Array.isArray(result?.errors)
          ? result.errors
              .map((item: { message?: string }) => item.message)
              .filter(Boolean)
              .join(' ')
          : '';
        throw new Error(
          formspreeError || 'We could not confirm delivery. Please try again.',
        );
      }

      setStatus('success');
      setComment('');
      setRating(null);
    } catch (err) {
      setError(
        err instanceof Error && err.name === 'AbortError'
          ? 'The request timed out. Check your connection and try again.'
          : err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.',
      );
      setStatus('error');
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  return (
    <>
      {isOpen && (
        <section
          id="oaumods-page-feedback"
          role="dialog"
          aria-modal="false"
          aria-labelledby="oaumods-feedback-title"
          className="fixed bottom-36 right-4 z-[60] max-h-[min(70dvh,28rem)] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-xl md:bottom-20 md:right-6"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 id="oaumods-feedback-title" className="text-base font-bold text-oau-navy">
                Was this page helpful?
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Your anonymous feedback helps us improve OAUMods.
              </p>
            </div>
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close feedback panel"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-campus-blue"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {status === 'success' ? (
            <div role="status" aria-live="polite" className="rounded-xl bg-emerald-50 p-4">
              <CheckCircle2 className="mb-2 h-5 w-5 text-emerald-700" aria-hidden="true" />
              <p className="text-sm font-semibold text-emerald-950">Thank you. Your feedback was sent.</p>
              <p className="mt-1 text-xs leading-5 text-emerald-900">
                We appreciate you helping make OAUMods better.
              </p>
              <button
                type="button"
                onClick={closePanel}
                className="mt-3 min-h-11 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-emerald-900 ring-1 ring-emerald-200 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-campus-blue"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-slate-800">
                  Choose one
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    ref={firstRatingRef}
                    type="button"
                    aria-pressed={rating === 'helpful'}
                    onClick={() => {
                      setRating('helpful');
                      setStatus('idle');
                      setError('');
                    }}
                    className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-campus-blue ${
                      rating === 'helpful'
                        ? 'border-campus-blue bg-pale-blue text-oau-navy'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <ThumbsUp className="h-4 w-4" aria-hidden="true" />
                    Helpful
                  </button>
                  <button
                    type="button"
                    aria-pressed={rating === 'not-helpful'}
                    onClick={() => {
                      setRating('not-helpful');
                      setStatus('idle');
                      setError('');
                    }}
                    className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-campus-blue ${
                      rating === 'not-helpful'
                        ? 'border-campus-blue bg-pale-blue text-oau-navy'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <ThumbsDown className="h-4 w-4" aria-hidden="true" />
                    Not helpful
                  </button>
                </div>
              </fieldset>

              <div>
                <label htmlFor="oaumods-feedback-comment" className="mb-1.5 block text-sm font-semibold text-slate-800">
                  Anything we should know? <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <textarea
                  id="oaumods-feedback-comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  maxLength={500}
                  rows={3}
                  placeholder="Tell us what worked or what needs fixing."
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm leading-5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-campus-blue focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-1 text-right text-xs text-slate-500">{comment.length}/500</p>
              </div>

              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="oaumods-feedback-website">Leave this field empty</label>
                <input
                  id="oaumods-feedback-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </div>

              {error && (
                <p role="alert" className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-800">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </p>
              )}

              <button
                type="submit"
                disabled={!rating || status === 'sending'}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-oau-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-campus-blue disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-campus-blue"
              >
                {status === 'sending' ? 'Sending…' : 'Send feedback'}
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="text-center text-xs leading-5 text-slate-500">
                No name or account is required. Page: <span className="font-medium text-slate-600">{pathname || '/'}</span>
              </p>
            </form>
          )}
        </section>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (isOpen) {
            closePanel();
          } else {
            setRating(null);
            setComment('');
            setWebsite('');
            setStatus('idle');
            setError('');
            setOpenPathname(pathname);
          }
        }}
        aria-label={isOpen ? 'Close page feedback' : 'Give feedback about this page'}
        aria-expanded={isOpen}
        aria-controls="oaumods-page-feedback"
        className="fixed bottom-20 right-4 z-[60] inline-flex min-h-12 items-center gap-2 rounded-full border border-amber-500 bg-amber-400 px-4 py-3 text-sm font-bold text-oau-navy shadow-lg transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oau-navy md:bottom-6 md:right-6"
      >
        {isOpen ? (
          <X className="h-4 w-4" aria-hidden="true" />
        ) : (
          <MessageSquareText className="h-4 w-4" aria-hidden="true" />
        )}
        <span>{isOpen ? 'Close' : 'Feedback'}</span>
      </button>
    </>
  );
}
