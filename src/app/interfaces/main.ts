// interface
export interface Dessert {
  image: DessertImages;
  name: string;
  category: string;
  price: number;
  description: string;
  quantity?: number;
};

export interface DessertImages {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
};