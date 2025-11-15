import React from 'react';

function Chat() {
  return (
    // Usaremos las clases de Tailwind que ya tienes para centrarlo
    <div className="flex flex-col items-center justify-center pt-10">
      <h1 className="text-3xl font-bold">Página de Chat</h1>
      <p className="text-lg text-default-500">
        Aquí se construira el chat en tiempo real.
      </p>
    </div>
  );
}

export default Chat;