import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { trigger_id } = req.body;

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
                res.status(200).end();
            } else {
                res.status(response.status).end();
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).end();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
