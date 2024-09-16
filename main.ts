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
}
