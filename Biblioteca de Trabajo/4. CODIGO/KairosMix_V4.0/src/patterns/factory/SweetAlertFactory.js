import Swal from 'sweetalert2';
import { NotificationAbstractFactory } from './NotificationAbstractFactory';

// Fábrica concreta que implementa SweetAlert2 contextualmente
export class SweetAlertFactory extends NotificationAbstractFactory {
    createSuccess(title, message, options = {}) {
        return Swal.fire({
            icon: 'success',
            title: title,
            text: message,
            confirmButtonColor: '#28a745',
            timer: 1500,
            showConfirmButton: false,
            ...options
        });
    }

    createError(title, message) {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: message,
            confirmButtonColor: '#dc3545',
            confirmButtonText: 'Intentar de nuevo'
        });
    }

    createWarning(title, message) {
        return Swal.fire({
            icon: 'warning',
            title: title,
            text: message,
            confirmButtonText: 'Entendido'
        });
    }

    createInfo(title, html) {
        return Swal.fire({
            icon: 'info',
            title: title,
            html: html,
            confirmButtonText: 'Entendido'
        });
    }

    async createConfirmation(title, html, confirmText = 'Sí', cancelText = 'Cancelar') {
        return Swal.fire({
            title: title,
            html: html,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
            reverseButtons: true
        });
    }
}
