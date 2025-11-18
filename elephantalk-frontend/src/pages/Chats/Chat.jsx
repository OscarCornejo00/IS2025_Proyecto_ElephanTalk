import React from 'react';
import { useState, useRef, useEffect } from "react";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { Icon } from "@iconify/react";

function Chat() {
  
const [newMessage, setNewMessage] = useState("");
const [messages, setMessages] = useState([]);
const messagesEndRef = useRef(null);

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
      isMe: true
    }; 

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] mb-14 md:mb-0 w-full max-w-4xl mx-auto md:border-l md:border-r border-default-200">
      <div className="border-b border-default-200 px-4 py-3 bg-background/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Icon icon="material-symbols:chat" fontSize={24} className="text-primary" />
          <div>
            <h1 className="text-lg font-semibold">Chat Global</h1>
            <p className="text-sm text-default-500">En vivo</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Si no hay mensajes, mostramos un aviso */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-default-500 opacity-50">
            <Icon icon="material-symbols:chat-bubble-outline" fontSize={48} />
            <p className="mt-2">No hay mensajes aún...</p>
          </div>
        )}

        {/* Mapeamos los mensajes para dibujarlos */}
        {messages.map((msg) => (
          <div key={msg.id} className="flex justify-end"> {/* Siempre a la derecha porque soy yo */}
            <div className="max-w-[80%] flex flex-col items-end">
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

        {/* Div invisible para anclar el scroll */}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="border-t border-default-200 p-3 bg-background/60 backdrop-blur-md">
        <div className="flex gap-2 ">
          <Input
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