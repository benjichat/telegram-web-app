import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Data = { ok: boolean; message?: string } | { error: string };

interface CoinRequestBody {
  name: string;
  url: string;
  username: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, url, username } = req.body as CoinRequestBody;

  if (!name || !url || !username) {
    return res.status(400).json({ error: 'Missing required fields: coin and url' });
  }

  try {
    // Insert the coin and URL into your Supabase table
    const { error } = await supabase
      .from('coins') // Replace 'coins' with your actual table name
      .insert([{ name, url, submitted_by: username }]);

    if (error) throw error;

    return res.status(200).json({ ok: true, message: 'Coin submitted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
