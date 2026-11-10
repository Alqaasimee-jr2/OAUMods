'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  MessageSquareText,
  ShieldCheck,
  Star,
  Bug,
  MapPin,
  Send,
} from 'lucide-react';

const FEEDBACK_API_ENDPOINT = '/api/feedback';

const categories = [
  { value: 'General feedback', label: 'General feedback', detail: 'Tell us what works or what could be better.', icon: MessageSquareText },
  { value: 'Report a problem', label: 'Report a problem', detail: 'Something is broken or difficult to use.', icon: Bug },
  { value: 'Suggest a feature', label: 'Suggest a feature', detail: 'An idea that could help Great Ife students.', icon: Lightbulb },
  { value: 'Incorrect campus information', label: 'Incorrect campus information', detail: 'A location, detail, or guide needs correcting.', icon: MapPin },
] as const;

type Category = (typeof categories)[number]['value'];

export default function FeedbackPage() {
  const [category, setCategory] = useState<Category>('General feedback');
  const [message, setMessage] = useState('');
  const [pageOrPlace, setPageOrPlace] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    // Never show a success state unless Formspree confirms submission.
    if (website.trim()) {
      setError('We could not send your feedback. Please check the form and try again.');
      setStatus('error');
      return;
    }

    setStatus('sending');

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(FEEDBACK_API_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          _subject: `[OAUMods Feedback] ${category}`,
          category,
          message: message.trim(),
          pageOrPlace: pageOrPlace.trim() || 'Not specified',
          rating: rating === null ? 'Not provided' : `${rating}/5`,
          source: 'OAUMods student feedback page',
          website,
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || 'We could not confirm delivery of your feedback. Please try again.');
      }

      setStatus('success');
      setMessage('');
      setPageOrPlace('');
      setRating(null);
    } catch (err) {
      setError(
        err instanceof Error && err.name === 'AbortError'
          ? 'The request timed out. Please check your connection and try again.'
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
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-oau-navy">
        <ArrowLeft className="h-4 w-4" /> Back to OAUMods
      </Link>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-oau-navy px-5 py-7 text-white sm:px-8 sm:py-9">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-200">
            <MessageSquareText className="h-3.5 w-3.5" /> Student feedback
          </p>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Help us make OAUMods better.</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">
            You know Great Ife best. Tell us what is useful, what is confusing, or what we should build next.
            Honest feedback helps us improve the experience for everyone.
          </p>
        </div>

        <div className="grid gap-3 border-b border-slate-100 bg-slate-50 p-4 sm:grid-cols-3 sm:p-5">
          <div className="flex items-start gap-2.5 rounded-xl bg-white p-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
            <div><p className="text-sm font-bold text-slate-800">No account needed</p><p className="mt-1 text-xs leading-5 text-slate-500">No sign-up or name required.</p></div>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl bg-white p-3">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div><p className="text-sm font-bold text-slate-800">Ideas welcome</p><p className="mt-1 text-xs leading-5 text-slate-500">Suggestions big or small matter.</p></div>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl bg-white p-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-campus-blue" />
            <div><p className="text-sm font-bold text-slate-800">Built for Great Ife</p><p className="mt-1 text-xs leading-5 text-slate-500">Help keep campus information useful.</p></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-8">
          {status === 'success' ? (
            <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <CheckCircle2 className="mb-2 h-7 w-7 text-emerald-700" />
              <h2 className="text-lg font-bold text-emerald-950">Thank you for helping OAUMods grow.</h2>
              <p className="mt-1 text-sm leading-6 text-emerald-900">Your feedback has been submitted. We appreciate you taking the time to help.</p>
              <button type="button" onClick={() => { setStatus('idle'); setError(''); }} className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-bold text-emerald-900 ring-1 ring-emerald-200 hover:bg-emerald-100">Send another response</button>
            </div>
          ) : (
            <>
              <fieldset>
                <legend className="mb-3 text-sm font-bold text-slate-900">What is your feedback about?</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {categories.map((item) => {
                    const Icon = item.icon;
                    const selected = category === item.value;
                    return (
                      <button key={item.value} type="button" onClick={() => setCategory(item.value)} aria-pressed={selected}
                        className={`flex min-h-20 items-start gap-3 rounded-xl border p-3 text-left transition ${selected ? 'border-oau-navy bg-blue-50 ring-1 ring-oau-navy' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}>
                        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${selected ? 'text-oau-navy' : 'text-slate-500'}`} />
                        <span><span className="block text-sm font-bold text-slate-900">{item.label}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{item.detail}</span></span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label htmlFor="feedback-message" className="mb-2 block text-sm font-bold text-slate-900">Tell us more <span className="text-red-600">*</span></label>
                <textarea id="feedback-message" required minLength={12} maxLength={2000} rows={5} value={message} onChange={(event) => setMessage(event.target.value)}
                  placeholder="What happened? What would you change? Include enough detail for us to understand."
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-campus-blue focus:ring-2 focus:ring-blue-100" />
                <div className="mt-1 flex justify-between gap-3 text-xs text-slate-500"><span>Please do not include passwords or sensitive personal information.</span><span className="shrink-0">{message.length}/2000</span></div>
              </div>

              <div>
                <label htmlFor="feedback-location" className="mb-2 block text-sm font-bold text-slate-900">Which page or campus place? <span className="font-normal text-slate-500">(optional)</span></label>
                <input id="feedback-location" maxLength={120} value={pageOrPlace} onChange={(event) => setPageOrPlace(event.target.value)}
                  placeholder="e.g. Campus Map, Mozambique Hall, Faculty directory"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-campus-blue focus:ring-2 focus:ring-blue-100" />
              </div>

              <fieldset>
                <legend className="mb-2 text-sm font-bold text-slate-900">How would you rate OAUMods so far? <span className="font-normal text-slate-500">(optional)</span></legend>
                <div className="flex flex-wrap items-center gap-1.5" aria-label="Optional rating from 1 to 5">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button key={value} type="button" aria-label={`${value} out of 5 stars`} aria-pressed={rating === value} onClick={() => setRating(rating === value ? null : value)}
                      className={`rounded-lg border p-2.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-campus-blue ${rating !== null && value <= rating ? 'border-amber-300 bg-amber-50 text-amber-500' : 'border-slate-200 bg-white text-slate-300 hover:text-amber-400'}`}>
                      <Star className="h-5 w-5 fill-current" />
                    </button>
                  ))}
                  <span className="ml-2 text-xs text-slate-500">{rating ? `${rating}/5 selected` : 'Choose a rating'}</span>
                </div>
              </fieldset>

              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="feedback-website">Leave this field empty</label>
                <input id="feedback-website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
              </div>

              {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}

              <div className="border-t border-slate-200 pt-5">
                <button type="submit" disabled={status === 'sending' || message.trim().length < 12}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-oau-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-campus-blue disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                  {status === 'sending' ? 'Sending feedback…' : 'Send feedback'} <Send className="h-4 w-4" />
                </button>
                <p className="mt-3 text-xs leading-5 text-slate-500">Feedback is used to improve OAUMods. You can submit without giving your name or contact details.</p>
              </div>
            </>
          )}
        </form>
      </section>
      <p className="text-center text-xs leading-5 text-slate-500">Made for Great Ife students, improved by Great Ife students.</p>
    </div>
  );
}
