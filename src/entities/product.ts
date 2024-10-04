import { v4 as uuidv4 } from "uuid";
import { Cart } from "./cart";

export class Product {
  private _id: string = uuidv4();
  private _name: string;
  private _price: number;
  private _category: string;
  private _imageUrl: string;
  private _quantity: number = 0;
  private _totalPrice: number = 0;

  constructor(name: string, price: number, category: string, image: string) {
    this._name = name;
    this._price = price;
    this._category = category;
    this._imageUrl = image;
  }

  renderProduct() {
    const productListHTML = document.querySelector(".product-list");

    if (!productListHTML) return;

    const productHTML = document.createElement("div");
    productHTML.id = this._id;

    productHTML.innerHTML = `
    <div class="container">
          <div class="img-food">
            <img
              src="${this._imageUrl}"
              alt="${this._name}"
            />
            <button id="btn-add-to-cart"
              class="btn-cart bg-white border border-[#f44336] flex absolute -bottom-4 right-12 items-center justify-center gap-2 rounded-full px-6 py-2 text-xs text-black transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-black/50 active:scale-95 active:shadow-lg active:shadow-black/50 font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                fill="none"
                viewBox="0 0 21 20"
                class="icon-add-to-cart"
              >
                <g fill="#C73B0F" clip-path="url(#a)">
                  <path
                    d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"
                  />
                  <path
                    d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M.333 0h20v20h-20z" />
                  </clipPath>
                </defs>
              </svg>
              Add to Cart
            </button>
          </div>
          <div class="info-food">
            <span class="category">${this._category}</span>
            <span class="name">${this._name}</span>
            <span class="price">$${this._price}</span>
          </div>
        </div>
    `;

    productHTML
      .querySelector("#btn-add-to-cart")
      ?.addEventListener("click", () => {
        this.incrementQuantity();
        console.log(`Added ${this._name} to cart. Quantity: ${this._quantity}`);
      });

    productListHTML.appendChild(productHTML);
  }

  updateTotalPrice() {
    this._totalPrice = this._price * this._quantity;
  }

  incrementQuantity() {
    Cart.addProduct(this);
    this.updateTotalPrice();
  }

  decrementQuantity() {
    if (this._quantity > 0) {
      this._quantity -= 1;
      Cart.removeProduct(this);
      this.updateTotalPrice();
    }
  }

  get totalPrice(): number {
    return this._totalPrice;
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
    this._quantity = quantity;
    this.updateTotalPrice();
  }

  get id(): string {
    return this._id;
  }
}
