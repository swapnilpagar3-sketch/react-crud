import { useEffect, useState } from 'react';

const STORAGE_KEY = 'react-crud-products';

const seed = [
  { id: 1, name: 'Wireless Mouse', category: 'Accessories', price: 899, quantity: 50, description: '2.4GHz wireless optical mouse' },
  { id: 2, name: 'Mechanical Keyboard', category: 'Accessories', price: 3499, quantity: 20, description: 'Blue switch, RGB backlight' },
  { id: 3, name: '27" Monitor', category: 'Displays', price: 14999, quantity: 8, description: 'Full HD IPS display' },
];

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : seed;
  } catch {
    return seed;
  }
}

// Custom hook that holds all CRUD logic and persists to localStorage.
export default function useProducts() {
  const [products, setProducts] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  // CREATE
  const addProduct = (product) => {
    const id = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([...products, { ...product, id }]);
  };

  // UPDATE
  const updateProduct = (id, updated) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  // DELETE
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return { products, addProduct, updateProduct, deleteProduct };
}
