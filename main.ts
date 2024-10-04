import { Product } from "./src/entities/product";
import data from "./data.json";

function generateProducts(data: any[]): void {
  data.forEach((data) => {
    new Product(
      data.name,
      data.price,
      data.category,
      data.image.desktop
    ).renderProduct();
  });
}

generateProducts(data);
