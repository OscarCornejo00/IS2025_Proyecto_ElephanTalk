import { useState, useRef, useEffect } from "react";
import { Input, Button, Card, CardBody, Avatar, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useAuthStore } from "../../store/auth.store";
import { initiateSocketConnection } from "../../services/chat.service";
import { showAlert } from "../../utils/toastify.util";

function Chat() {
  // Variables para guardar los mensajes y lo que escribes
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Referencias para controlar el scroll y la conexión
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const socketRef = useRef(null);

  const { user, token } = useAuthStore((state) => state);

  // --- HACE LA CONEXIÓN CON EL SERVIDOR ---
  useEffect(() => {
    if (!token) return;

    setIsLoading(true);

    // Inicia la conexión "en vivo"
    const socket = initiateSocketConnection({ token });
    socketRef.current = socket;

    // Si se conecta con éxito, pide los mensajes viejos
    socket.on("connect", () => {
      console.log("🟢 Socket conectado");
      socket.emit("getRecentMessages");
    });

    // Recibe el historial de mensajes
    socket.on("recentMessages", (msgs) => {
      setMessages(msgs);
      setIsLoading(false);
    });

    // Escucha cuando llega un mensaje nuevo de cualquier persona
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Manejo de errores
    socket.on("error", (err) => {
      console.error("🔴 Error socket:", err);
      if (typeof showAlert === 'function') showAlert(err.message, "error");
      setIsLoading(false);
    });

    // Cierra la conexión al salir
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);


  // --- BAJA EL SCROLL AUTOMÁTICAMENTE ---
  // Cada vez que la lista de mensajes cambia, baja la pantalla al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  // --- ENVÍA TU MENSAJE AL SERVIDOR ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", { content: newMessage });
    setNewMessage(""); // Limpia la caja de texto
    setTimeout(() => inputRef.current?.focus(), 10); // Te devuelve el cursor para seguir escribiendo
  };


  const formatTime = (isoString) => {
    if (!isoString) return "";
    try {
      return new Date(isoString).toLocaleTimeString("es-ES", {
        hour: "2-digit", minute: "2-digit"
      });
    } catch { return ""; }
  };

  return (
    <main className="flex flex-col h-[calc(100dvh-4.1rem)] w-full max-w-4xl mx-auto md:border-l md:border-r border-default-200 overflow-hidden">
      
      {/* Header / Encabezado */}
      <div className="flex-none border-b border-default-200 px-4 py-3 bg-background/60 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <Icon icon="material-symbols:chat" fontSize={24} className="text-primary" />
          <div>
            <h1 className="text-lg font-semibold">Chat Global</h1>
            <p className="text-sm text-default-500">
              {isLoading 
                ? "Conectando..." 
                : `${messages.length} mensajes • En vivo`}
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <Spinner size="lg" color="primary" />
          </div>
        )}

        {!isLoading && messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-default-500 opacity-50">
            <Icon icon="material-symbols:chat-bubble-outline" fontSize={48} />
            <p className="mt-2">No hay mensajes aún.</p>
          </div>
        )}

        {!isLoading && messages.map((msg) => {
          // Verifica de quién es el mensaje
          const msgUser = (typeof msg.user === 'object' && msg.user !== null) ? msg.user : {};
          const msgUserId = msgUser._id || msgUser.id || (typeof msg.user === 'string' ? msg.user : msg.userId);
          const myUserId = user?._id || user?.id;
          
          // "isMe" es VERDADERO si el mensaje es mío
          const isMe = String(msgUserId) === String(myUserId);
          
          const username = msgUser.username || "Usuario";
          const fullName = (msgUser.name || msgUser.lastname) 
            ? `${msgUser.name || ""} ${msgUser.lastname || ""}`.trim() 
            : username;

          // Lógica para buscar el avatar correcto
          let senderAvatar = null;
          if (isMe) {
            senderAvatar = user?.picture || user?.image || user?.avatar;
          }
          if (!senderAvatar) {
             senderAvatar = msgUser.picture || msgUser.image || msgUser.avatar || msgUser.profileUrl || msgUser.photo || msgUser.img || msg.senderAvatar || msg.avatar || msg.picture;
          }

          return (
            // --- AQUÍ SE IMPRIME CADA MENSAJE ---
            <div key={msg._id || msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Foto de perfil */}
              <Avatar 
                isBordered 
                radius="full" 
                size="sm" 
                src={senderAvatar} 
                name={username}
                className="flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
              />

              {/* --- MUESTRA LOS MENSAJES ENVIADOS POR NUESTRO USUARIO Y POR LOS DEMÁS --- */}
              <div className={`flex flex-col max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                
                {/* Nombre del usuario */}
                <div className={`flex flex-col mb-1 px-1 ${isMe ? 'items-end' : 'items-start'}`}>
                   <span className="text-xs font-bold text-default-900 leading-tight">
                     {fullName}
                   </span>
                   <span className="text-[10px] text-default-400 leading-tight">
                     @{username}
                   </span>
                </div>
                
                {/* Contenido del mensaje (Burbuja) */}
                <Card className={isMe ? "bg-primary/20" : "bg-default-100"}>
                  <CardBody className="py-2 px-3">
                    <p className="text-sm break-words">{msg.content}</p>
                  </CardBody>
                </Card>
                
                {/* Hora */}
                <span className="text-[10px] text-default-400 mt-1 px-1">
                  {formatTime(msg.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
        {/* Elemento invisible al final para el scroll automático */}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulario para escribir */}
      <form onSubmit={handleSendMessage} className="flex-none border-t border-default-200 p-3 bg-background/60 backdrop-blur-md z-10 mb-14 md:mb-0">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            autoFocus
            placeholder={'Escribe un mensaje'}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            size="lg"
            disabled={isLoading}
            endContent={
              <Button isIconOnly color="primary" variant="light" type="submit" disabled={!newMessage.trim() || isLoading}>
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