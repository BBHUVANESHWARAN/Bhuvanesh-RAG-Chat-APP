import React from 'react';

type Props = {
  role: 'user' | 'bot';
  text: string;
};

export default function MessageBubble({ role, text }: Props) {
  const isUser = role === 'user';
  return (
    <div
      className={`my-2 p-2 rounded max-w-xl ${
        isUser ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'
      }`}
    >
      <strong>{isUser ? 'You' : 'Bot'}:</strong> {text}
    </div>
  );
}
