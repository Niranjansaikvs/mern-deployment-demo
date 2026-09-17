import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  // Fetch items from the backend API
  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle form submission to create a new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/items', { name });
      setName('');
      fetchItems(); // Refresh items list
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white text-center">
          <h2 className="mb-0">Item Manager</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter item name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Add Item
              </button>
            </div>
          </form>

          <h5 className="card-title mb-3">Item List</h5>
          {items.length === 0 ? (
            <p className="text-muted text-center">No items found.</p>
          ) : (
            <ul className="list-group">
              {items.map((item) => (
                <li
                  key={item._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {item.name}
                  <span className="badge bg-secondary rounded-pill">
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;