// src/app/api/linkedin/candidates/route.ts
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token is missing' }, { status: 400 });
  }

  try {
    const response = await axios.get(
      'https://api.linkedin.com/v2/me', // Adjust the endpoint as needed
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching LinkedIn candidates:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch candidates', details: error.response?.data || error.message }, { status: 500 });
  }
}
