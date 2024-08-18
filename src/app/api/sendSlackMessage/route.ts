import { NextRequest, NextResponse } from 'next/server';
import { WebClient } from '@slack/web-api';

export async function POST(request: NextRequest) {
  const botToken = process.env.SLACK_BOT_TOKEN;
  const channelId = process.env.SLACK_CHANNEL_ID; 

  if (!botToken || !channelId) {
    console.error('Missing SLACK_BOT_TOKEN or channel ID');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const client = new WebClient(botToken);

  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    await client.chat.postMessage({
      channel: channelId,
      text: message,
    });

    return NextResponse.json({ result: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Error sending message' }, { status: 500 });
  }
}