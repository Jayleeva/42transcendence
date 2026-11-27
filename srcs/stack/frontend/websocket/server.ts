import { WebSocketServer, WebSocket } from 'ws';
import { Message } from '../utils/types/Message';
import app from 'next/app';

const wss = new WebSocketServer({ port: 8080 });
// HTTP server setup goes here

const start = (): void => {
  try {
    app.listen(4000, () => console.log('Server started on port 4000'));

    wss.on('connection', (ws) => {
      ws.on('error', console.error);

      ws.on('message', (msg, isBinary) => {
        const msgAsString = msg.toString('utf-8');
        const msgObject = JSON.parse(msgAsString) as Message;
        insertMessage(msgObject, { db }).catch((e) => console.error(e));

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(msgAsString, { binary: isBinary });
          }
        });
      });
    });

    wss.on('close', () => console.log('Connection closed'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

wss.on('close', () => console.log('Connection closed'));

void start();

function insertMessage(msgObject: Message, arg1: { db: any; }) {
  throw new Error('Function not implemented.');
}
