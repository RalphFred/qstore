export type CarouselSlide = {
    featuredText: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    image?: string;
    backgroundColor: string;
    buttonTextColor: string;
    buttonHoverColor: string;
  };

  export type Product = {
    id: number;
    name: string;
    price: number;
    discounted: number;
    image: string[];
    category: string;
    description: string;
    rating?: number;
    reviews?: number;
    isFeatured: boolean;
    isNew: boolean;
    isBestSeller: boolean;
  }

  export interface CartCardProps {
    productName?: string;
    brand?: string;
    color?: string;
    unitsLeft?: number;
    originalPrice?: number;
    discountedPrice?: number;
    discountPercentage?: number;
    quantity?: number;
    image?: string;
  }