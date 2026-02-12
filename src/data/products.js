import product1 from "../assets/images/IMG_20260209_133744.jpg";
import product2 from "../assets/images/IMG_20260209_133826.jpg";
import product3 from "../assets/images/IMG_20260209_133904.jpg";
import product4 from "../assets/images/IMG_20260209_133933.jpg";
import product5 from "../assets/images/IMG_20260209_133952.jpg";
import product6 from "../assets/images/IMG_20260209_134017.jpg";
import product7 from "../assets/images/IMG_20260209_134036.jpg";
import product8 from "../assets/images/IMG_20260209_134055.jpg";
import product9 from "../assets/images/IMG_20260209_134116.jpg";
import product10 from "../assets/images/IMG_20260209_134136.jpg";
import product11 from "../assets/images/IMG_20260209_134156.jpg";
import product12 from "../assets/images/IMG_20260209_134234.jpg";

export const allProducts = [
  {
    id: 1,
    name: "Ankara Elegance Dress",
    price: 189,
    category: "dresses",
    image: product1,
    isNew: true,
    isBestseller: false,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Earth Brown", "Royal Blue"],
  },
  {
    id: 2,
    name: "Kente Wrap Blouse",
    price: 129,
    category: "tops",
    image: product2,
    isNew: false,
    isBestseller: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Terracotta", "Forest Green"],
  },
  {
    id: 3,
    name: "Adire Print Maxi",
    price: 225,
    category: "dresses",
    image: product3,
    isNew: true,
    isBestseller: false,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Sunset Orange", "Natural Ivory"],
  },
  {
    id: 4,
    name: "Tribal Fusion Set",
    price: 275,
    category: "sets",
    image: product4,
    isNew: false,
    isBestseller: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Heritage Gold", "Deep Indigo"],
  },
  {
    id: 5,
    name: "Mud Cloth Tunic",
    price: 145,
    category: "tops",
    image: product5,
    isNew: false,
    isBestseller: false,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Charcoal", "Cream"],
  },
  {
    id: 6,
    name: "Heritage Wrap Dress",
    price: 198,
    category: "dresses",
    image: product6,
    isNew: true,
    isBestseller: false,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Earth Brown", "Sunset Orange"],
  },
  {
    id: 7,
    name: "Kitenge Co-ord Set",
    price: 245,
    category: "sets",
    image: product7,
    isNew: false,
    isBestseller: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Rust", "Sand"],
  },
  {
    id: 8,
    name: "Dashiki Crop Top",
    price: 95,
    category: "tops",
    image: product8,
    isNew: false,
    isBestseller: false,
    sizes: ["XS", "S", "M"],
    colors: ["Terracotta", "Charcoal"],
  },
  {
    id: 9,
    name: "Batik Flow Dress",
    price: 210,
    category: "dresses",
    image: product9,
    isNew: true,
    isBestseller: false,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Royal Blue", "Natural Ivory"],
  },
  {
    id: 10,
    name: "Woven Heritage Top",
    price: 115,
    category: "tops",
    image: product10,
    isNew: false,
    isBestseller: false,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Forest Green", "Cream"],
  },
  {
    id: 11,
    name: "Safari Luxe Set",
    price: 295,
    category: "sets",
    image: product11,
    isNew: true,
    isBestseller: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Heritage Gold", "Rust"],
  },
  {
    id: 12,
    name: "Afro Chic Gown",
    price: 320,
    category: "dresses",
    image: product12,
    isNew: false,
    isBestseller: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Deep Indigo", "Earth Brown"],
  },
];

export const categories = [
  { id: "all", label: "All" },
  { id: "dresses", label: "Dresses" },
  { id: "tops", label: "Tops" },
  { id: "sets", label: "Sets" },
  { id: "accessories", label: "Accessories" },
];

export const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

export const colorOptions = [
  { name: "Earth Brown", hex: "#8B6F47" },
  { name: "Royal Blue", hex: "#2C3E7B" },
  { name: "Sunset Orange", hex: "#C2703E" },
  { name: "Natural Ivory", hex: "#F5F0E8" },
  { name: "Terracotta", hex: "#C75E3A" },
  { name: "Forest Green", hex: "#3D5C3A" },
  { name: "Charcoal", hex: "#44403c" },
  { name: "Cream", hex: "#FAF3E8" },
  { name: "Heritage Gold", hex: "#B8860B" },
  { name: "Deep Indigo", hex: "#2C2C54" },
  { name: "Rust", hex: "#A0522D" },
  { name: "Sand", hex: "#D2B48C" },
];

export const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "bestselling", label: "Best Selling" },
];
