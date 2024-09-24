import { Product } from "./product";

export class Cart {
  private _products: Product[] = [];
  private _totalPrice: number = 0;

  addProduct(product: Product): void {
    // Verificar se o produto já existe no carrinho
    const existingProduct = this._products.find((p) => p.id === product.id);

    if (existingProduct) {
      // Se o produto já existir, atualizar a quantidade
      existingProduct.quantity += 1;
    } else {
      // Se o produto não existir, adicionar ao carrinho e atualiza a qtd para 1
      product.quantity = 1;
      this._products.push(product);
    }

    this._products.push(product);

    this._totalPrice += product.price;
  }

  get products() {
    return this._products;
  }

  get totalPrice() {
    return this._totalPrice;
  }
}
