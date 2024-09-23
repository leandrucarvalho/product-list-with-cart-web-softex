import { Product } from "./src/entities/product";
import data from "./data.json";
import { Cart } from "./src/entities/cart";

/* function generateProducts(data: any[]): void {
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

generateProducts(data); */

const product1 = new Product(
  data[0].name,
  data[0].price,
  data[0].category,
  data[0].image.desktop
);

const product2 = new Product(
  data[1].name,
  data[1].price,
  data[1].category,
  data[1].image.desktop
);

const cart = new Cart();
cart.addProduct(product1);
cart.addProduct(product2);
console.log(cart.totalPrice);
