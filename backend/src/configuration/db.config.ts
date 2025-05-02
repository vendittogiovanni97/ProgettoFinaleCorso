import { PrismaClient } from "@prisma/client";

const dbClient = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
  ],
});

// Aggiungiamo listener per gli eventi di connessione
dbClient.$on('query', (e) => {
  console.log('Query: ' + e.query);
});

// Test di connessione iniziale
dbClient.$connect()
  .then(() => {
    console.log('Connessione al database stabilita con successo');
  })
  .catch((error) => {
    console.error('Errore di connessione al database:', error);
    process.exit(1);
  });

export default dbClient;
