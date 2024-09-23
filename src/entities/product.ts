import { v4 as uuidv4 } from "uuid";

export class Product {
  private _id: string = uuidv4();
  private _name: string;
  private _price: number;
  private _category: string;
  private _imageUrl: string;
  private _quantity: number = 0;

  constructor(name: string, price: number, category: string, image: string) {
    this._name = name;
    this._price = price;
    this._category = category;
    this._imageUrl = image;
  }

  render(): string {
    return `
    <div class="container">
      <div class="img-food">
        <img src="${this._imageUrl}" alt="${this._category}" />
        <button class="btn-cart">
          <i class="fa-solid fa-cart-plus"></i> Add to Cart
        </button>
      </div>
      <div class="info-food">
        <span class="category">${this._category}</span>
        <span class="name">${this._name}</span>
        <span class="price">R$${this._price}</span>
      </div>
    </div>
    `;
  }

  get price(): number {
    return this._price;
  }

  get name(): string {
    return this._name;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(quantity: number) {
    this._quantity += quantity;
  }
}
