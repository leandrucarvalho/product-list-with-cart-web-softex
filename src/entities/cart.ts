import { Product } from "./product";

export class Cart {
  private static _products: Product[] = [];
  private static _totalPriceCart: number = 0;

  static addProduct(product: Product): void {
    // Verificar se o produto já existe no carrinho
    const existingProduct = this._products.find((p) => p.id === product.id);
    console.log(existingProduct);

    if (existingProduct) {
      // Se o produto já existir, atualizar a quantidade
      existingProduct.quantity += 1;
    } else {
      // Se o produto não existir, adicionar ao carrinho e atualiza a qtd para 1
      product.quantity = 1;
      this._products.push(product);
    }

    this._totalPriceCart += product.totalPrice;
  }

  static get products() {
    return this._products;
  }

  static get totalPrice() {
    return this._totalPriceCart;
  }
}
