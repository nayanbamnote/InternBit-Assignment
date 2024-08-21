"use client";

import { useState } from "react";

export default function Home() {
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const sendSlackMessage = async () => {
    if (!message.trim()) {
      setResult("Please enter a message");
      return;
    }

    setIsSending(true);
    setResult(null);

    try {
      const response = await fetch("/api/sendSlackMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setResult(data.result || data.error);
    } catch (error) {
      setResult("Error sending message");
    } finally {
      setIsSending(false);
    }
  };


  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">
          Send a Slack Message
        </h1>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="w-full p-4 mb-6 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ease-in-out"
        />
        <button
          onClick={sendSlackMessage}
          disabled={isSending}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105 disabled:bg-teal-300 disabled:cursor-not-allowed">
          {isSending ? "Sending..." : "Send"}
        </button>
        {result && <p className="mt-6 text-teal-500 text-center">{result}</p>}
      </div>
    </div>
  );
}
