import WebSocket from "ws";
import WebsocketMessage, { MessageType } from "../types/wsMessagetype";

export class WebRtcSocketService {
  private activeUsers: Map<string, WebSocket>;
  private rooms: Map<string, Set<string>>;

  constructor() {
    this.activeUsers = new Map();
    this.rooms = new Map();
  }

  // Gestione principale dei messaggi in arrivo
  public handleMessage(ws: WebSocket, message: WebsocketMessage): void {
    const { type, username, receiver, sender } = message;
    
    // Registra utente se è la prima volta che manda un messaggio
    if (!this.activeUsers.has(username)) {
      this.registerUser(username, ws);
    }
    
    // Gestisce il messaggio in base al tipo
    if (this.isCallMessage(type)) {
      this.handleCallMessage(ws, message);
    } else if (this.isSystemMessage(type)) {
      this.handleSystemMessage(ws, message);
    } else if (this.isChatMessage(type)) {
      this.handleChatMessage(ws, message);
    } else if (this.isFileMediaMessage(type)) {
      this.handleFileMediaMessage(ws, message);
    }
  }

  // Registra un nuovo utente
  private registerUser(username: string, ws: WebSocket): void {
    this.activeUsers.set(username, ws);
    // Notifica agli altri utenti che un nuovo utente è online
    this.broadcastUserStatus(username, "online");
  }

  // Logout di un utente
  public logoutUser(username: string): void {
    if (this.activeUsers.has(username)) {
      this.activeUsers.delete(username);
      // Notifica agli altri utenti che un utente è offline
      this.broadcastUserStatus(username, "offline");
    }
  }

  // Trova username basato sulla connessione WebSocket
  public findUsernameByConnection(ws: WebSocket): string | null {
    for (const [username, connection] of this.activeUsers.entries()) {
      if (connection === ws) {
        return username;
      }
    }
    return null;
  }

  // Gestione messaggi di chiamata WebRTC
  private handleCallMessage(ws: WebSocket, message: WebsocketMessage): void {
    const { type, receiver, username } = message;
    
    if (!receiver) return;
    
    const receiverWs = this.activeUsers.get(receiver);
    if (!receiverWs) return;
    
    // Inoltra il messaggio al destinatario
    this.sendMessage(receiverWs, {
      ...message,
      sender: username
    });
    
    // Gestione specifica per join-call e leave-call
    if (type === "join-call") {
      // Crea la stanza se non esiste
      const roomId = message.receiver as string;
      if (!this.rooms.has(roomId)) {
        this.rooms.set(roomId, new Set());
      }
      // Aggiungi l'utente alla stanza
      this.rooms.get(roomId)?.add(username);
    } else if (type === "leave-call") {
      const roomId = message.receiver as string;
      this.rooms.get(roomId)?.delete(username);
      // Se la stanza è vuota, rimuovila
      if (this.rooms.get(roomId)?.size === 0) {
        this.rooms.delete(roomId);
      }
    }
  }

  // Gestione messaggi di sistema
  private handleSystemMessage(ws: WebSocket, message: WebsocketMessage): void {
    const { type, username, receiver } = message;
    
    switch (type) {
      case "room-join":
        if (receiver) {
          if (!this.rooms.has(receiver)) {
            this.rooms.set(receiver, new Set());
          }
          this.rooms.get(receiver)?.add(username);
          
          // Notifica tutti nella stanza
          this.broadcastToRoom(receiver, {
            type: "new-user",
            username,
            receiver
          });
        }
        break;
      case "room-leave":
        if (receiver && this.rooms.has(receiver)) {
          this.rooms.get(receiver)?.delete(username);
          
          // Notifica tutti nella stanza
          this.broadcastToRoom(receiver, {
            type: "user-status",
            username,
            receiver
          });
        }
        break;
      // Altri casi per messaggi di sistema
    }
  }

  // Gestione messaggi chat
  private handleChatMessage(ws: WebSocket, message: WebsocketMessage): void {
    const { receiver, username } = message;
    
    if (receiver) {
      // Messaggio diretto a un utente
      const receiverWs = this.activeUsers.get(receiver);
      if (receiverWs) {
        this.sendMessage(receiverWs, {
          ...message,
          sender: username
        });
      }
    } else if (message.type === "broadcast-message") {
      // Broadcast a tutti
      this.broadcastToAll({
        ...message,
        sender: username
      });
    }
  }

  // Gestione messaggi file/media
  private handleFileMediaMessage(ws: WebSocket, message: WebsocketMessage): void {
    const { receiver, username } = message;
    
    if (receiver) {
      const receiverWs = this.activeUsers.get(receiver);
      if (receiverWs) {
        this.sendMessage(receiverWs, {
          ...message,
          sender: username
        });
      }
    }
  }

  // Broadcast a tutti gli utenti
  private broadcastToAll(message: WebsocketMessage): void {
    this.activeUsers.forEach((ws) => {
      this.sendMessage(ws, message);
    });
  }

  // Broadcast a tutti gli utenti in una stanza
  private broadcastToRoom(roomId: string, message: WebsocketMessage): void {
    const room = this.rooms.get(roomId);
    if (room) {
      room.forEach(username => {
        const userWs = this.activeUsers.get(username);
        if (userWs) {
          this.sendMessage(userWs, message);
        }
      });
    }
  }

  // Broadcast dello stato utente a tutti
  private broadcastUserStatus(username: string, status: "online" | "offline"): void {
    this.broadcastToAll({
      type: "user-status",
      username,
      sender: "system",
      receiver: undefined
    });
  }

  // Invia un messaggio a una connessione specifica
  private sendMessage(ws: WebSocket, message: WebsocketMessage): void {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  // Funzioni helper per verificare il tipo di messaggio
  private isCallMessage(type: MessageType): boolean {
    return [
      "offer", "answer", "ice-candidate", "join-call", 
      "leave-call", "call-status", "invite-to-call", 
      "mute", "screen-share"
    ].includes(type as string);
  }

  private isSystemMessage(type: MessageType): boolean {
    return [
      "user-status", "new-user", "kick-user", 
      "warning", "room-join", "room-leave"
    ].includes(type as string);
  }

  private isChatMessage(type: MessageType): boolean {
    return [
      "send-message", "receive-message", "typing", 
      "delete-message", "edit-message", "broadcast-message", 
      "message-read"
    ].includes(type as string);
  }

  private isFileMediaMessage(type: MessageType): boolean {
    return [
      "file-transfer", "image-message", 
      "video-message", "audio-message"
    ].includes(type as string);
  }
}
