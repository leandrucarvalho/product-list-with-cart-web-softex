class Product {
  private _id: number;
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _category: string;
  private _imageUrl: string;

  constructor(
    id: number,
    name: string,
    price: number,
    quantity: number,
    description: string,
    image: string
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this._category = description;
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
        <span class="price">${this._price}</span>
      </div>
    </div>
    `;
  }
}

function generateProducts(data: any[]): void {
  const productList = document.querySelector(".product-list");

  data.forEach((data, index) => {
    const product = new Product(
      data.id,
      data.name,
      data.price,
      data.quantity,
      data.category,
      data.image.desktop
    );

    if (productList) {
      productList.innerHTML += `
      <div class="product-list" id="product-${index}">
        ${product.render()}
      </div>
      `;
    }
  });
}

async function fetchProducts() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("Falha ao carregar o arquivo JSON");
    }
    const data = await response.json();
    generateProducts(data);
  } catch (error) {
    console.error("Ocorreu um erro ao carregar os produtos:", error);
  }
}

window.addEventListener("DOMContentLoaded", fetchProducts);
