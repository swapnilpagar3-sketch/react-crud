import { useEffect, useState } from 'react';

const emptyForm = { name: '', category: '', price: '', quantity: '', description: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.category.trim()) errors.category = 'Category is required';
  if (values.price === '' || Number(values.price) <= 0) errors.price = 'Price must be greater than 0';
  if (values.quantity === '' || Number(values.quantity) < 0) errors.quantity = 'Quantity cannot be negative';
  return errors;
}

export default function ProductForm({ editingProduct, onSubmit, onCancel }) {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(editingProduct ? { ...editingProduct } : emptyForm);
    setErrors({});
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit({
      name: values.name.trim(),
      category: values.category.trim(),
      price: Number(values.price),
      quantity: Number(values.quantity),
      description: values.description.trim(),
    });
    setValues(emptyForm);
  };

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>

      <label>
        Name
        <input name="name" value={values.name} onChange={handleChange} placeholder="Product name" />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label>
        Category
        <input name="category" value={values.category} onChange={handleChange} placeholder="Category" />
        {errors.category && <span className="error">{errors.category}</span>}
      </label>

      <div className="row">
        <label>
          Price (₹)
          <input name="price" type="number" step="0.01" value={values.price} onChange={handleChange} />
          {errors.price && <span className="error">{errors.price}</span>}
        </label>
        <label>
          Quantity
          <input name="quantity" type="number" value={values.quantity} onChange={handleChange} />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </label>
      </div>

      <label>
        Description
        <textarea name="description" rows="3" value={values.description} onChange={handleChange} />
      </label>

      <div className="actions">
        <button type="submit" className="btn primary">
          {editingProduct ? 'Save Changes' : 'Add Product'}
        </button>
        {editingProduct && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
