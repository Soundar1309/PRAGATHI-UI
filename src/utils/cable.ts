// src/utils/cable.ts

interface CableSubscription {
  unsubscribe: () => void;
}

interface CableConsumer {
  subscriptions: {
    create: (channel: string, callbacks: { received: (data: any) => void }) => CableSubscription;
  };
}

function createConsumer(url: string): CableConsumer {
  const ws = new WebSocket(url);
  
  return {
    subscriptions: {
      create: (channel: string, callbacks: { received: (data: any) => void }) => {
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.channel === channel) {
            callbacks.received(data.message);
          }
        };
        
        return {
          unsubscribe: () => {
            ws.close();
          }
        };
      }
    }
  };
}

export function createCable() {
  const token = localStorage.getItem('jwt');
  return createConsumer(`${import.meta.env.VITE_API_WS_URL || 'ws://localhost:3000/cable'}?token=${token}`);
}

export function subscribeToNotifications(onNotification: (data: any) => void) {
  const cable = createCable();
  const subscription = cable.subscriptions.create('NotificationChannel', {
    received: onNotification,
  });
  return subscription;
}
