const API_URL = 'http://localhost:5000/api';
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage

// Function to load products
async function loadProducts(searchQuery = '', category = '') {
    try {
        const res = await fetch(`${API_URL}/products`);
        const products = await res.json();

        const filteredProducts = products.filter(product => {
            const matchesSearch = searchQuery
                ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesCategory = category
                ? product.category === category
                : true;

            return matchesSearch && matchesCategory;
        });

        const productList = document.getElementById('product-list');
        productList.innerHTML = filteredProducts
            .map(
                product => `
            <div class="product">
                <img src="${product.imageUrl}" alt="${product.name}" />
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart('${product._id}', '${product.name}', ${product.price}, '${product.imageUrl}')">Add to Cart</button>
            </div>
        `
            )
            .join('');
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Function to add items to the cart
function addToCart(id, name, price, imageUrl) {
    const product = { id, name, price, imageUrl };
    cart.push(product); // Add product to cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
    alert(`${name} added to cart!`);
    updateCartCount();
}

// Function to update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = `(${cart.length})`;
}

// Function to filter products by category
function filterCategory(category) {
    loadProducts('', category);
}

// Function to initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
});

document.getElementById('search-button').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-input').value;
    loadProducts(searchQuery);
});

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login to access the application.');
        window.location.href = 'login.html';
    } else {
        loadProducts();
        updateCartCount();
    }
});

