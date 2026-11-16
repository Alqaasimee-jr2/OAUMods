import { containsBlockedLanguage } from '@/lib/feedback-moderation';

const FORWARD_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ||
  'https://formspree.io/f/mrpedlyz';

const MAX_REQUEST_LENGTH = 12_000;

type FeedbackPayload = {
  message?: unknown;
  website?: unknown;
};

function jsonError(message: string, status: number, code?: string) {
  return Response.json({ ok: false, message, code }, { status });
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return jsonError('A valid feedback request is required.', 415);
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_REQUEST_LENGTH) {
    return jsonError('Your feedback is too long. Please shorten it and try again.', 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonError('We could not read your feedback. Please try again.', 400);
  }

  if (rawBody.length > MAX_REQUEST_LENGTH) {
    return jsonError('Your feedback is too long. Please shorten it and try again.', 413);
  }

  let payload: FeedbackPayload;
  try {
    payload = JSON.parse(rawBody) as FeedbackPayload;
  } catch {
    return jsonError('A valid feedback request is required.', 400);
  }

  if (!payload || typeof payload !== 'object' || typeof payload.message !== 'string') {
    return jsonError('Please enter a feedback message before sending.', 400);
  }

  if (typeof payload.website === 'string' && payload.website.trim()) {
    return jsonError('We could not send your feedback. Please check the form and try again.', 400);
  }

  const message = payload.message.trim();
  if (!message || message.length > 2_000) {
    return jsonError('Please enter a valid feedback message.', 400);
  }

  if (containsBlockedLanguage(message)) {
    return jsonError(
      'Please keep your feedback respectful. Remove profanity or abusive language and try again.',
      422,
      'BLOCKED_LANGUAGE',
    );
  }

  try {
    const upstream = await fetch(FORWARD_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
      cache: 'no-store',
    });

    const result: unknown = await upstream.json().catch(() => null);
    const confirmed = Boolean(
      result &&
      typeof result === 'object' &&
      'ok' in result &&
      result.ok === true,
    );

    if (!upstream.ok || !confirmed) {
      const errors =
        result && typeof result === 'object' && 'errors' in result && Array.isArray(result.errors)
          ? result.errors
          : undefined;
      return Response.json(
        { ok: false, errors },
        { status: upstream.ok ? 502 : upstream.status },
      );
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return jsonError('We could not reach the feedback service. Please try again.', 502);
  }
}
