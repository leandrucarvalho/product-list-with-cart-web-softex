import { Product } from "./src/entities/product";
import data from "./data.json";
import { Cart } from "./src/entities/cart";

function generateProducts(data: any[]): void {
  const productList = document.querySelector(".product-list");

  data.forEach((data) => {
    const product = new Product(
      data.name,
      data.price,
      data.category,
      data.image.desktop
    );

    if (productList) {
      productList.innerHTML += product.render();
    }
  });
}

generateProducts(data);

const banana = new Product("Banana", 5, "Fruta", "imagem.com");
banana.incrementQuantity(); // Adiciona o banana ao carrinho
banana.incrementQuantity(); // Adiciona o banana ao carrinho

Cart.removeProduct(banana);

// console.log(banana);
console.log(Cart.products);
