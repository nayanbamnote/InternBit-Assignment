// src/app/page.js
"use client";
import { useState } from "react";

export default function Test() {
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const sendInteractiveRequest = async () => {
    setIsSending(true);
    setResult(null);

    try {
      const response = await fetch("/api/slack/interactive-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trigger_id: "123456.7890123.abcdef0123456789" }),
      });

      const data = await response.json();
      setResult(data.error || "Request successful");
    } catch (error) {
      setResult("Error sending request");
    } finally {
      setIsSending(false);
    }
  };

  const sendDialogSubmitRequest = async () => {
    setIsSending(true);
    setResult(null);

    try {
      const response = await fetch("/api/slack/dialog-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submission: {
            user: "U12345678",
            message: "Hello, world!",
          },
          callback_id: "send_user_message_dialog",
        }),
      });

      const data = await response.json();
      setResult(data.error || "Request successful");
    } catch (error) {
      setResult("Error sending request");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
    
      <button onClick={sendInteractiveRequest} disabled={isSending}>
        {isSending ? "Sending..." : "Send Interactive Request"}
      </button>
      <button onClick={sendDialogSubmitRequest} disabled={isSending}>
        {isSending ? "Sending..." : "Send Dialog Submit Request"}
      </button>
      {result && <p>{result}</p>}
    </div>
  );
}