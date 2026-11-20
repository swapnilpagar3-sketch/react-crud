import { useMemo, useState } from 'react';
import useProducts from './hooks/useProducts';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';

export default function App() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const notify = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 2500);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

  const handleSubmit = (data) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
      setEditingProduct(null);
      notify('Product updated successfully.');
    } else {
      addProduct(data);
      notify('Product added successfully.');
    }
  };

  const handleDelete = (product) => {
    if (window.confirm(`Delete "${product.name}"?`)) {
      deleteProduct(product.id);
      if (editingProduct?.id === product.id) setEditingProduct(null);
      notify('Product deleted successfully.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Product Manager</h1>
        <p>A simple CRUD application built with React + Vite</p>
      </header>

      {message && <div className="toast">{message}</div>}

      <div className="layout">
        <ProductForm
          editingProduct={editingProduct}
          onSubmit={handleSubmit}
          onCancel={() => setEditingProduct(null)}
        />

        <section className="card">
          <div className="list-head">
            <h2>Products ({filtered.length})</h2>
            <input
              className="search"
              type="search"
              placeholder="Search by name or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ProductTable products={filtered} onEdit={setEditingProduct} onDelete={handleDelete} />
        </section>
      </div>
    </div>
  );
}
