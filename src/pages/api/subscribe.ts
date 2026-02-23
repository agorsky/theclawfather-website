export const prerender = false;

import type { APIRoute } from 'astro';

const PUB_ID = 'pub_2dab85fc-eef4-4950-b3d6-449f724bef1a';
const API_KEY = import.meta.env.BEEHIIV_API_KEY;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const email = data.get('email')?.toString().trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'theclawfather.ai',
          utm_medium: 'website',
          utm_campaign: 'early-access',
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('Beehiiv error:', err);
      return new Response(JSON.stringify({ error: 'Subscription failed. Try again.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('Subscribe error:', e);
    return new Response(JSON.stringify({ error: 'Something went wrong.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
