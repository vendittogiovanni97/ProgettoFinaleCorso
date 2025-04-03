import { Server } from "http";
import WebSocket, { WebSocketServer } from "ws";
import WebsocketMessage from "../types/wsMessagetype";
import { Request } from "express";
import { oggi } from "../configuration/time.config";
import { WebRtcSocketService } from "../services/webrtc-socket-service";

interface ClientInfo {
  ws: WebSocket;
  ip: string | undefined;
  username?: string;
  connectTime: string; // Modificato da Date a string per corrispondere al tipo di 'oggi'
  lastActivity: string; // Modificato da Date a string
}

export class WebSocketManager {
  private wss: WebSocketServer;
  private service: WebRtcSocketService;
  private clientCounter: number;
  private clients: Map<number, ClientInfo>;
  private pingInterval: NodeJS.Timeout | null;

  constructor(server: Server) {
    console.log("Istanza del WebSocketManager creata");
    this.wss = new WebSocket.Server({ server, path: "/" });
    this.service = new WebRtcSocketService();
    this.clients = new Map();
    this.clientCounter = 0;
    this.pingInterval = null;
    this.initialize();
  }

  public initialize(): void {
    console.log("Inizializzazione WebSocket server");
    this.wss.on("connection", this.handleConnection.bind(this));
    this.wss.on("error", this.handleServerError.bind(this));

    // Imposta un intervallo per il ping dei client per mantenere le connessioni attive
    this.pingInterval = setInterval(() => this.pingClients(), 30000);
  }

  private handleConnection(ws: WebSocket, request: Request): void {
    const clientId = ++this.clientCounter;
    const clientInfo: ClientInfo = {
      ws,
      ip: request.socket.remoteAddress,
      connectTime: oggi,
      lastActivity: oggi,
    };

    this.clients.set(clientId, clientInfo);

    console.log(
      `Nuova connessione WebSocket stabilita, nuovo client ${clientId}, connesso da ${request.socket.remoteAddress}`
    );

    // Configurazione dei gestori eventi per la connessione
    ws.on("message", (messageBuffer) =>
      this.handleMessage(clientId, ws, messageBuffer)
    );
    ws.on("close", () => this.handleClose(clientId, ws));
    ws.on("error", (error) => this.handleClientError(clientId, error));
    ws.on("pong", () => this.updateClientActivity(clientId));

    // Invia un messaggio di benvenuto
    this.sendWelcomeMessage(ws, clientId);
  }

  private handleMessage(
    clientId: number,
    ws: WebSocket,
    messageBuffer: WebSocket.RawData
  ): void {
    try {
      // Aggiorna l'attività del client
      this.updateClientActivity(clientId);

      const message = JSON.parse(messageBuffer.toString()) as WebsocketMessage;

      console.log(`Messaggio ricevuto dal client ${clientId}:`, message.type);

      // Se il messaggio contiene un username, aggiorna l'info del client
      if (message.username && !this.clients.get(clientId)?.username) {
        const clientInfo = this.clients.get(clientId);
        if (clientInfo) {
          clientInfo.username = message.username;
          this.clients.set(clientId, clientInfo);
        }
      }

      // Passa il messaggio al servizio per la gestione
      this.service.handleMessage(ws, message);
    } catch (error) {
      console.error(
        `Errore nella gestione del messaggio dal client ${clientId}:`,
        error
      );

      // Invia un messaggio di errore al client
      this.sendErrorMessage(ws, "Formato messaggio non valido");
    }
  }

  private handleClose(clientId: number, ws: WebSocket): void {
    console.log(`Connessione WebSocket chiusa per il client ${clientId}`);

    // Trova e rimuovi l'utente che ha chiuso la connessione
    const username = this.service.findUsernameByConnection(ws);
    if (username) {
      this.service.logoutUser(username);
    }

    // Rimuovi il client dalla mappa
    this.clients.delete(clientId);
  }

  private handleClientError(clientId: number, error: Error): void {
    console.error(`Errore WebSocket per il client ${clientId}:`, error);
    // Potrebbe essere necessario chiudere la connessione in caso di errori gravi
  }

  private handleServerError(error: Error): void {
    console.error("Errore del server WebSocket:", error);
    // Gestione dell'errore del server
  }

  private sendWelcomeMessage(ws: WebSocket, clientId: number): void {
    try {
      const welcomeMessage = {
        type: "user-status",
        username: "system",
        message: `Benvenuto! Sei connesso come client #${clientId}`,
      };

      ws.send(JSON.stringify(welcomeMessage));
    } catch (error) {
      console.error(
        `Errore nell'invio del messaggio di benvenuto al client ${clientId}:`,
        error
      );
    }
  }

  private sendErrorMessage(ws: WebSocket, errorMessage: string): void {
    try {
      const message = {
        type: "warning",
        username: "system",
        message: errorMessage,
      };

      ws.send(JSON.stringify(message));
    } catch (error) {
      console.error("Errore nell'invio del messaggio di errore:", error);
    }
  }

  private updateClientActivity(clientId: number): void {
    const clientInfo = this.clients.get(clientId);
    if (clientInfo) {
      // Per mantenere la coerenza con il tipo di 'oggi'
      // Se 'oggi' è una funzione che restituisce la data corrente come stringa
      clientInfo.lastActivity = oggi;
      this.clients.set(clientId, clientInfo);
    }
  }

  private pingClients(): void {
    const now = new Date().toISOString(); // Uso una stringa ISO per rappresentare la data attuale

    this.clients.forEach((clientInfo, clientId) => {
      // Dato che lastActivity è una stringa, convertiamo entrambe in Date per il confronto
      const lastActivityDate = new Date(clientInfo.lastActivity);
      const nowDate = new Date(now);

      // Controlla se il client è inattivo da più di 5 minuti
      const inactiveTime = nowDate.getTime() - lastActivityDate.getTime();

      if (inactiveTime > 5 * 60 * 1000) {
        // Client inattivo, chiudi la connessione
        console.log(`Chiusura connessione per client inattivo ${clientId}`);
        clientInfo.ws.terminate();
        this.clients.delete(clientId);
      } else if (clientInfo.ws.readyState === WebSocket.OPEN) {
        // Invia ping per mantenere attiva la connessione
        clientInfo.ws.ping();
      }
    });
  }

  public shutdown(): void {
    // Pulisce le risorse quando il server viene spento
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }

    // Chiude tutte le connessioni
    this.clients.forEach((clientInfo) => {
      try {
        clientInfo.ws.close();
      } catch (error) {
        console.error("Errore nella chiusura della connessione:", error);
      }
    });

    // Chiude il server WebSocket
    this.wss.close();
  }
}
