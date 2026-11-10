import { NextRequest, NextResponse } from 'next/server';

interface FeedbackPayload {
  category?: string;
  message?: string;
  pageOrPlace?: string;
  rating?: string | number | null;
  source?: string;
  website?: string; // Honeypot field
}

export async function POST(request: NextRequest) {
  try {
    let body: FeedbackPayload;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON payload in request body' },
        { status: 400 }
      );
    }

    const {
      category = 'General feedback',
      message = '',
      pageOrPlace = 'Not specified',
      rating = null,
      source = 'OAUMods web app',
      website = '',
    } = body;

    // 1. Honeypot check: reject bots filling hidden input
    if (website && typeof website === 'string' && website.trim().length > 0) {
      return NextResponse.json(
        { ok: false, error: 'Unable to process submission' },
        { status: 400 }
      );
    }

    // 2. Validate payload presence
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';
    const ratingStr = rating !== null && rating !== undefined ? String(rating) : '';

    if (!trimmedMessage && !ratingStr) {
      return NextResponse.json(
        { ok: false, error: 'Please provide either a rating or feedback message.' },
        { status: 400 }
      );
    }

    // Enforce reasonable bounds
    const safeMessage = trimmedMessage.slice(0, 2000);
    const safePageOrPlace = typeof pageOrPlace === 'string' ? pageOrPlace.trim().slice(0, 200) : 'Not specified';
    const safeCategory = typeof category === 'string' ? category.trim().slice(0, 100) : 'General feedback';
    const safeSource = typeof source === 'string' ? source.trim().slice(0, 100) : 'OAUMods web app';
    const timestamp = new Date().toISOString();

    const deliveredVia: string[] = [];

    // Channel 1: Webhook delivery (e.g. Discord, Slack, Telegram, or custom webhook)
    const webhookUrl = process.env.FEEDBACK_WEBHOOK_URL?.trim();
    if (webhookUrl) {
      try {
        const isDiscord = webhookUrl.includes('discord.com/api/webhooks');
        let webhookPayload: unknown;

        if (isDiscord) {
          webhookPayload = {
            content: '📬 **New OAUMods Student Feedback Received**',
            embeds: [
              {
                title: safeCategory,
                description: safeMessage || '*(No extra comment provided)*',
                color: ratingStr.toLowerCase().includes('helpful') ? 0x12345b : 0xeab308,
                fields: [
                  { name: 'Rating', value: ratingStr || 'None provided', inline: true },
                  { name: 'Page / Campus Place', value: safePageOrPlace, inline: true },
                  { name: 'Source', value: safeSource, inline: true },
                ],
                footer: { text: `OAUMods Feedback System • ${timestamp}` },
              },
            ],
          };
        } else {
          // Standard Slack / Generic webhook
          webhookPayload = {
            text: `*New OAUMods Feedback*\n*Category:* ${safeCategory}\n*Rating:* ${ratingStr || 'None'}\n*Location:* ${safePageOrPlace}\n*Source:* ${safeSource}\n*Message:* ${safeMessage || '(empty)'}`,
            category: safeCategory,
            rating: ratingStr,
            message: safeMessage,
            pageOrPlace: safePageOrPlace,
            source: safeSource,
            timestamp,
          };
        }

        const webhookRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookPayload),
        });

        if (webhookRes.ok) {
          deliveredVia.push('webhook');
        } else {
          console.warn(`Feedback webhook returned status ${webhookRes.status}`);
        }
      } catch (webhookErr) {
        console.error('Error forwarding feedback to webhook:', webhookErr);
      }
    }

    // Channel 2: Resend transactional email (if configured)
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const recipientEmail =
      process.env.FEEDBACK_RECIPIENT_EMAIL?.trim() || process.env.ADMIN_EMAIL?.trim();

    if (resendApiKey && recipientEmail) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'OAUMods Feedback <onboarding@resend.dev>',
            to: [recipientEmail],
            subject: `[OAUMods Feedback] ${safeCategory}: ${ratingStr || safePageOrPlace}`,
            html: `
              <h2>New Student Feedback Received</h2>
              <p><strong>Category:</strong> ${safeCategory}</p>
              <p><strong>Rating:</strong> ${ratingStr || 'None provided'}</p>
              <p><strong>Page or Place:</strong> ${safePageOrPlace}</p>
              <p><strong>Source:</strong> ${safeSource}</p>
              <hr />
              <p><strong>Message:</strong></p>
              <blockquote style="background:#f4f4f5;padding:12px;border-left:4px solid #12345b;">
                ${safeMessage ? safeMessage.replace(/\n/g, '<br/>') : '<em>(No comment provided)</em>'}
              </blockquote>
              <p style="font-size:12px;color:#71717a;">Submitted at ${timestamp}</p>
            `,
          }),
        });

        if (resendRes.ok) {
          deliveredVia.push('resend-email');
        } else {
          console.warn(`Resend email dispatch returned status ${resendRes.status}`);
        }
      } catch (emailErr) {
        console.error('Error sending feedback via Resend:', emailErr);
      }
    }

    // Channel 3: Server-side Formspree forwarder
    const formspreeEndpoint =
      process.env.FORMSPREE_ENDPOINT?.trim() ||
      process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ||
      'https://formspree.io/f/mrpedlyz';

    if (formspreeEndpoint && !deliveredVia.includes('webhook') && !deliveredVia.includes('resend-email')) {
      try {
        const formspreeRes = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _subject: `[OAUMods Feedback] ${safeCategory}`,
            category: safeCategory,
            rating: ratingStr || 'Not provided',
            message: safeMessage || `Rating submitted: ${ratingStr}`,
            pageOrPlace: safePageOrPlace,
            source: safeSource,
            timestamp,
          }),
        });

        const formspreeJson = await formspreeRes.json().catch(() => null);
        if (formspreeRes.ok && formspreeJson?.ok !== false) {
          deliveredVia.push('formspree');
        } else {
          console.warn('Formspree dispatch response:', formspreeRes.status, formspreeJson);
        }
      } catch (formspreeErr) {
        console.error('Error forwarding feedback to Formspree:', formspreeErr);
      }
    }

    // Always log in server runtime for immediate visibility
    console.info('[OAUMods Feedback Received]', {
      category: safeCategory,
      rating: ratingStr,
      pageOrPlace: safePageOrPlace,
      message: safeMessage,
      source: safeSource,
      deliveredVia: deliveredVia.length > 0 ? deliveredVia : ['server-console-log'],
      timestamp,
    });

    return NextResponse.json({
      ok: true,
      message: 'Feedback received successfully.',
      deliveredVia: deliveredVia.length > 0 ? deliveredVia : ['server-console-log'],
    });
  } catch (err) {
    console.error('Unexpected error processing feedback submission:', err);
    return NextResponse.json(
      { ok: false, error: 'Internal server error while processing feedback.' },
      { status: 500 }
    );
  }
}
