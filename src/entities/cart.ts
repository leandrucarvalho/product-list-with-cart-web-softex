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
    this.renderCart();
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

  static renderCart() {
    const cartHtml = document.querySelector(".cart");

    if (!cartHtml) return;

    const quantityTotal = cartHtml.querySelector("#cart-count");
    const cartContent = cartHtml.querySelector(".cart-content");

    if (!cartContent || !quantityTotal) return;

    if (this._products.length === 0) {
      cartContent.innerHTML += `
      <div class="empty-cart flex flex-col items-center">
        <img src="./assets/images/illustration-empty-cart.svg" alt="Empty Cart" class="w-24 h-24">
        <p>Your added items will appear here</p>
      </div>`;

      quantityTotal.innerHTML = "0";
    }

    quantityTotal.innerHTML = this._products.length.toString();

    cartContent.innerHTML = "";

    this._products.forEach((product) => {
      let existingItem = cartContent.querySelector(`[data-id="${product.id}"]`);

      if (existingItem !== null) {
        (existingItem.querySelector(
          ".quantity"
        ) as HTMLElement)!.innerText = `${product.quantity}x`;
        (existingItem.querySelector(
          ".total-price"
        ) as HTMLElement)!.innerText = `$${product.totalPrice.toFixed(2)}`;
      } else {
        const cartItemHtml = `<div id="cart-items">
          <div class="cart-item flex flex-col">
            <div class="item-details text-xs font-bold flex justify-between">
              <span class="product-name">${product.name}</span>
              <button
                class="remove-btn flex border-2 border-[#c9aea6] rounded-full p-0.5 text-xs text-black transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-black/50 active:scale-95 active:shadow-lg active:shadow-black/50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="none"
                  viewBox="0 0 10 10"
                >
                  <path
                    fill="#CAAFA7"
                    d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                  />
                </svg>
              </button>
            </div>
            <div class="item-info text-xs">
              <span class="quantity text-[#f44336] font-bold">${product.quantity}x</span>
              <span class="unit-price text-[#c9aea6]">$${product.price}</span>
              <span class="total-price text-[#ad8985]">$${product.totalPrice}</span>
              <div class="border-b-2 border-[#c9aea6] text-xs my-3"></div>
            </div>

        </div>`;
        cartContent.innerHTML += cartItemHtml;
      }
    });

    // Verifica se o conteúdo "carbon-neutral" já foi adicionado
    if (!cartHtml.querySelector("#confirm-order-btn")) {
      // Adiciona o conteúdo "carbon-neutral" apenas uma vez
      const additionalContent = `
      <div>
          <p class="order-total flex justify-between py-2">
            <span class="text-sm">Order Total:</span>
            <span id="cart-total" class="text-lg font-bold text-[#260f08]"
              >$46.50</span
            >
          </p>
        <p
          class="carbon-neutral flex items-center justify-center text-xs gap-1 bg-[#fcf8f5] rounded-lg py-2 mb-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            fill="none"
            viewBox="0 0 21 20"
          >
            <path
              fill="#1EA575"
              d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"
            />
            <path
              fill="#1EA575"
              d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"
            />
          </svg>
          This is a <strong>carbon-neutral</strong> delivery
        </p>
      </div>
      <button
        id="confirm-order-btn"
        class="confirm-btn bg-[#f44336] text-white rounded-full p-2 text-sm mt-2"
      >
        Confirm Order
      </button>
    `;

      cartContent.innerHTML += additionalContent;
    }

    const totalPrice = cartHtml.querySelector("#cart-total");

    if (totalPrice) {
      totalPrice.innerHTML = `$${this.totalPrice.toFixed(2)}`;
    }
  }
}
