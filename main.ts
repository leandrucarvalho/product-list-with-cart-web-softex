import { Product } from "./src/entities/product";
import data from "./data.json";

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
