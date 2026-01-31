// Observer concreto que registra eventos en la consola
export class ConsoleObserver {
    update(data) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] Evento recibido:`, data.type, data.payload);
    }
}
