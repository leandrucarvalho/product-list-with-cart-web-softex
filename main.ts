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

const banana = new Product(
  data[0].name,
  data[0].price,
  data[0].category,
  data[0].image.desktop
);
banana.incrementQuantity();
banana.incrementQuantity();

// console.log(banana);
console.log(Cart.products);
