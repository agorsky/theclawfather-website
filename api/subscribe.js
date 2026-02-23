const PUB_ID = 'pub_2dab85fc-eef4-4950-b3d6-449f724bef1a';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const email = req.body?.email?.toString().trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required.' });
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
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

    if (!response.ok) {
      const err = await response.text();
      console.error('Beehiiv error:', err);
      return res.status(500).json({ error: 'Subscription failed. Try again.' });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error('Subscribe error:', e);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}
