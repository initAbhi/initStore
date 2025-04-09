interface Product {
    _id: string;
    productname: string; // Fixed typo from `prodcutname` to `productname`
    description: string;
    images: string[]; // Array of strings
    category: string;
    price: number;
    ratings: number;
    _v: number;
  }
