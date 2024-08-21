import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { submission, callback_id } = req.body;

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
                    res.status(200).end();
                } else {
                    res.status(response.status).end();
                }
            } catch (error) {
                console.error('Error:', error);
                res.status(500).end();
            }
        } else {
            res.status(400).end('Invalid callback ID');
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
