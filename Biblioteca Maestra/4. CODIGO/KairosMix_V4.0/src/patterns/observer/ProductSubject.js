import { Subject } from './Subject';

// Concrete Subject para eventos de productos
// Implementado como Singleton para garantizar una única instancia global
class ProductSubject extends Subject {
    constructor() {
        super();
        if (ProductSubject.instance) {
            return ProductSubject.instance;
        }
        ProductSubject.instance = this;
    }

    notifyProductAdded(product) {
        console.log('[Observer] Producto agregado:', product.name);
        this.notify({ type: 'PRODUCT_ADDED', payload: product });
    }

    notifyProductUpdated(product) {
        console.log('[Observer] Producto actualizado:', product.name);
        this.notify({ type: 'PRODUCT_UPDATED', payload: product });
    }

    notifyProductDeleted(productId) {
        console.log('[Observer] Producto eliminado ID:', productId);
        this.notify({ type: 'PRODUCT_DELETED', payload: productId });
    }
}

export const productSubject = new ProductSubject();
