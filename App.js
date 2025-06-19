import React, { useState } from "react";
import "./App.css";

const productsData = [
  { id: 1, name: "T-shirt", price: 200, category: "Clothing", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Jeans", price: 5000, category: "Clothing", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Laptop", price: 800, category: "Electronics", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Phone", price: 500, category: "Electronics", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Book", price: 15, category: "Books", image: "https://via.placeholder.com/150" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>About MyShop</h3>
          <p>Your one-stop shop for quality products at amazing prices. We are committed to providing the best online shopping experience.</p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home" aria-label="Home">Home</a></li>
            <li><a href="#shop" aria-label="Shop">Shop</a></li>
            <li><a href="#login" aria-label="Login">Login</a></li>
            <li><a href="#signup" aria-label="Sign Up">Sign Up</a></li>
            <li><a href="#contact" aria-label="Contact Us">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@myshop.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Market St, City, Country</p>
        </div>
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("None");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const filteredProducts =
    filter === "All"
      ? productsData
      : productsData.filter((p) => p.category === filter);

  const searchedProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...searchedProducts].sort((a, b) => {
    if (sort === "PriceLowHigh") return a.price - b.price;
    if (sort === "PriceHighLow") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <a href="#home" className="nav-logo">MyShop</a>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="nav-right">
          <a href="#login" className="nav-link">Login</a>
          <a href="#signup" className="nav-link signup">Sign Up</a>
        </div>
      </nav>

      <div className="app-container">
        <div className="product-list">
          <h2>Products</h2>
          <div className="controls">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Filter products by category"
            >
              <option value="All">All Categories</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
            >
              <option value="None">Sort By</option>
              <option value="PriceLowHigh">Price: Low to High</option>
              <option value="PriceHighLow">Price: High to Low</option>
            </select>
          </div>
          <div className="product-grid">
            {sortedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h4>{product.name}</h4>
                <p>${product.price}</p>
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          <div className="cart">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 && <p>Cart is empty.</p>}
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <span>{item.name}</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleUpdateQuantity(item.id, e.target.value)
                  }
                  aria-label={`Quantity for ${item.name}`}
                />
                <button onClick={() => handleRemoveFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
