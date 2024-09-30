import { Product } from "./product";

export class Cart {
  private static _products: Product[] = [];
  private static _totalPriceCart: number = 0;

  static addProduct(product: Product): void {
    // Verificar se o produto já existe no carrinho
    const existingProduct = this._products.find((p) => p.id === product.id);

    if (existingProduct) {
      // Se o produto já existir, atualizar a quantidade
      existingProduct.quantity += 1;
      existingProduct.updateTotalPrice();
    } else {
      // Se o produto não existir, adicionar ao carrinho e atualiza a qtd para 1
      product.quantity = 1;
      product.updateTotalPrice();
      this._products.push(product);
    }

    this.updateTotalPriceCart();
  }

  static removeProduct(product: Product): void {
    // Verificar se o produto existe no carrinho pelo index
    const existingProduct = this._products.findIndex(
      (p) => p.id === product.id
    );

    // Se o produto existir, remover do carrinho
    if (existingProduct > -1) {
      this._products.splice(existingProduct, 1);
      this.updateTotalPriceCart();
    }
  }

  static updateTotalPriceCart(): void {
    this._totalPriceCart = this._products.reduce(
      (total, product) => total + product.totalPrice,
      0
    );
  }

  static get products() {
    return this._products;
  }

  static get totalPrice() {
    return this._totalPriceCart;
  }
}
