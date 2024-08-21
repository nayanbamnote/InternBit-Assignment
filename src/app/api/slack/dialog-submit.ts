import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { submission, callback_id } = await req.json();

    if (callback_id === 'send_user_message_dialog') {
        const { user, message } = submission;

        try {
            const response = await fetch('https://slack.com/api/chat.postMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
                },
                body: JSON.stringify({
                    channel: user,
                    text: message
                })
            });

            if (response.ok) {
                return NextResponse.json({}, { status: 200 });
            } else {
                return NextResponse.json({}, { status: response.status });
            }
        } catch (error) {
            console.error('Error:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Invalid callback ID' }, { status: 400 });
    }
}
