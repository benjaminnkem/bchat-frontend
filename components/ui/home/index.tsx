"use client";

import MessageTypingBubble from "@/components/common/message-bubble";
import { useSocket } from "@/lib/providers/socket-provider";
import { Message } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const randomNames = ["John Doe", "Jane Doe", "John Smith", "Jane Smith", "John Wick", "Jane Wick"];

const getRandomName = () => randomNames[Math.floor(Math.random() * randomNames.length)];

const Home = () => {
  const socket = useSocket();
  const name = getRandomName();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [userTyping, setUserTyping] = useState<{ name: string; isTyping: boolean }>({ name: "", isTyping: false });
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    socket.emit("createMessage", {
      name: name,
      text: message,
    });
    setMessage("");
  };

  const trackTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    socket.emit("typing", { name, isTyping: true });

    // if no typing activity occurs for 2 seconds
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", { name, isTyping: false });
    }, 1000);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");

      socket.emit("findAllMessages", (messages: Message[]) => {
        setMessages(messages);
      });

      socket.on("message", (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on("typing", (user: { name: string; isTyping: boolean }) => {
        setUserTyping(user);
      });
    });

    return () => {
      socket.off("connect");
      socket.off("message");
      socket.off("typing");
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="">
      <div className="px-5 pt-5 pb-20 space-y-2">
        {messages.map((message, index) => (
          <div key={index} className="flex gap-1">
            <div className="size-8 rounded-full border-2 relative overflow-hidden">
              <Image src="/me.jpg" width={32} height={32} alt="Avatar" className="object-cover w-full h-full" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-xs">{message.name}</h3>
              <div className="px-3.5 py-2 bg-gray-100 rounded-3xl rounded-tl-none justify-start items-center gap-3 inline-flex">
                <p className="text-gray-900 text-sm font-normal leading-snug">{message.text}</p>
              </div>
            </div>
          </div>
        ))}

        {userTyping.isTyping && userTyping.name !== name && (
          <div className="flex gap-1 items-center">
            <div className="size-8 border-2 rounded-full relative overflow-hidden">
              <Image src="/me.jpg" width={32} height={32} alt="Avatar" className="object-cover w-full h-full" />
            </div>
            <div className="w-24 h-9 px-3 py-1 rounded-2xl rounded-tl-none bg-gray-100">
              <MessageTypingBubble />
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white space-y-1">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="bg-transparent flex-grow p-3 ring"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              trackTyping();
            }}
          />
          <button onClick={() => sendMessage(message)} className="bg-purple-700 text-white p-4 rounded-lg">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
