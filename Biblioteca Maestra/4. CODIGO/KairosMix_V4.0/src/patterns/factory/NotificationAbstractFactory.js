// Interfaz abstracta para la fábrica de notificaciones
export class NotificationAbstractFactory {
    createSuccess(title, message) {
        throw new Error('Method not implemented');
    }

    createError(title, message) {
        throw new Error('Method not implemented');
    }

    createWarning(title, message) {
        throw new Error('Method not implemented');
    }

    createConfirmation(title, html, confirmText, cancelText) {
        throw new Error('Method not implemented');
    }
}
