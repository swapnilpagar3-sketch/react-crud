export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className="empty">No products found.</p>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td><span className="badge">{p.category}</span></td>
              <td>₹{p.price.toLocaleString('en-IN')}</td>
              <td>{p.quantity}</td>
              <td>{p.description}</td>
              <td className="actions">
                <button className="btn small warning" onClick={() => onEdit(p)}>Edit</button>
                <button className="btn small danger" onClick={() => onDelete(p)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
