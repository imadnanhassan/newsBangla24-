"use client"

import { useState } from "react";

export default function ShareOptions() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOptions = [
    { name: "Facebook", color: "bg-[#1877F2]", icon: "f" },
    { name: "Twitter", color: "bg-[#1DA1F2]", icon: "🐦" },
    { name: "WhatsApp", color: "bg-[#25D366]", icon: "💬" },
    { name: "LinkedIn", color: "bg-[#0A66C2]", icon: "in" },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <span className="text-primary">📤</span>
        Share This News
      </h3>

      <div className="space-y-3">
        {shareOptions.map((option) => (
          <button
            key={option.name}
            className={`w-full flex items-center gap-3 p-3 rounded-md text-white hover:opacity-90 transition-opacity ${option.color}`}
            onClick={() => {
              alert(`Share via ${option.name}`);
            }}
          >
            <span className="text-lg">{option.icon}</span>
            <span>{option.name}</span>
          </button>
        ))}

        <button
          className="w-full flex items-center gap-3 p-3 rounded-md border border-border hover:bg-muted transition-colors"
          onClick={handleCopyLink}
        >
          <span className="text-muted">🔗</span>
          <span>{copied ? "Link Copied!" : "Copy Link"}</span>
        </button>
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm">
        <p className="font-medium">Spread the word!</p>
        <p className="text-muted">
          Share this news with your friends and family.
        </p>
      </div>
    </div>
  );
}
