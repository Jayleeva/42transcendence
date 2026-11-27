import WebSocket from 'isomorphic-ws';

export const ws = new WebSocket('ws://localhost:8080/');

ws.onopen = () => console.log('WebSocket connected');
ws.onclose = () => console.log('WebSocket disconnected');