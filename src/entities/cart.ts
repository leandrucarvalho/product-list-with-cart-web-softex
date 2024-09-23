import { Product } from "./product";

export class Cart {
  private _products: Product[] = [];
  private _totalPrice: number = 0;

  addProduct(product: Product): void {
    this._products.push(product);
    this._totalPrice += product.price;
    console.log(this._products);
  }

  get products() {
    return this._products;
  }

  get totalPrice() {
    return this._totalPrice;
  }
}
