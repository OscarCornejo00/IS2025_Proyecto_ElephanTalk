import React from 'react';
import { useState } from "react";
import { Input, Button  } from "@nextui-org/react";
import { Icon } from "@iconify/react";

function Chat() {
  
const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    console.log("Simulando envío:", newMessage);
    setNewMessage(""); 
  };

  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] mb-14 md:mb-0">
      <div className="border-b px-4 py-3 bg-background/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Icon icon="material-symbols:chat" fontSize={24} className="text-primary" />
          <div>
            <h1 className="text-lg font-semibold">Chat Global</h1>
            <p className="text-sm text-default-500">En vivo</p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        {}
      </div>
      <form onSubmit={handleSendMessage} className="border-t p-3 bg-background/60 backdrop-blur-md">
        <div className="flex gap-2">
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