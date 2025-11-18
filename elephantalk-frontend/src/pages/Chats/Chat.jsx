import React from 'react';
import { useState, useRef, useEffect } from "react";
import { Input, Button, Card, CardBody, Avatar } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useAuthStore } from "../../store/auth.store";

function Chat() {
  
const [newMessage, setNewMessage] = useState("");
const [messages, setMessages] = useState([]);
const messagesEndRef = useRef(null);
const inputRef = useRef(null); 
const user = useAuthStore((state) => state.user);

useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      senderName: user?.username || "Usuario",
      senderAvatar: user?.picture || "",
    }; 

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  return (
    <main className="flex flex-col h-[calc(100dvh-4.1rem)] w-full max-w-4xl mx-auto md:border-l md:border-r border-default-200 overflow-hidden">
      <div className="flex-none border-b border-default-200 px-4 py-3 bg-background/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Icon icon="material-symbols:chat" fontSize={24} className="text-primary" />
          <div>
            <h1 className="text-lg font-semibold">Chat Global</h1>
            <p className="text-sm text-default-500">En vivo</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-default-500 opacity-50">
            <Icon icon="material-symbols:chat-bubble-outline" fontSize={48} />
            <p className="mt-2">No hay mensajes aún...</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-row-reverse gap-3">
            <Avatar 
              src={msg.senderAvatar} 
              size="sm" 
              className="flex-shrink-0"
            />
            <div className="flex flex-col items-end max-w-[75%]">
              <span className="text-[10px] text-default-400 mb-1 px-1">
                @{msg.senderName}
              </span>

              <Card className="bg-primary/20">
                <CardBody className="py-2 px-3">
                  <p className="text-sm">{msg.text}</p>
                </CardBody>
              </Card>
              
              <span className="text-[10px] text-default-400 mt-1 px-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="border-t border-default-200 p-3 bg-background/60 backdrop-blur-md">
        <div className="flex gap-2 ">
          <Input
            ref={inputRef}
            autoFocus={true}
            placeholder="Escribe un mensaje"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            size="lg"
            endContent={
              <Button
                isIconOnly
                color="primary"
                variant="light"
                type="submit"
                disabled={!newMessage.trim()}
              >
                <Icon icon="material-symbols:send" fontSize={30} />
              </Button>
            }
          />
        </div>
      </form>
    </main>
  );
}

export default Chat;