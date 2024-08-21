import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { trigger_id } = await req.json();

    const dialog = {
        trigger_id: trigger_id,
        dialog: {
            title: 'Send User Message',
            callback_id: 'send_user_message_dialog', // Update callback ID here
            elements: [
                {
                    type: 'select',
                    label: 'Select User',
                    name: 'user',
                    data_source: 'users'
                },
                {
                    type: 'textarea',
                    label: 'Message',
                    name: 'message'
                }
            ]
        }
    };

    try {
        const response = await fetch('https://slack.com/api/dialog.open', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
            },
            body: JSON.stringify(dialog)
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
}
