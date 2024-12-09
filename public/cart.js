function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-container');
    const totalPriceElement = document.getElementById('total-price');
    const orderNowBtn = document.getElementById('order-now-btn');

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = '0';
        orderNowBtn.disabled = true; // Disable button if cart is empty
        return;
    }

    // Enable the "Order Now" button if cart is not empty
    orderNowBtn.disabled = false;

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Display item details without images
    cartContainer.innerHTML = cartItems
        .map(
            item => `
        <div class="cart-item">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
    `
        )
        .join('');
}

async function placeOrder() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login to place an order!');
        window.location.href = 'login.html';
        return;
    }

    const userId = localStorage.getItem('userId');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    try {
        const response = await fetch(`${API_URL}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId,
                products: cartItems.map(item => ({
                    productId: item.id,
                    quantity: 1,
                })),
                totalPrice,
            }),
        });

        if (response.ok) {
            alert('Order placed successfully!');
            localStorage.removeItem('cart');
            loadCart(); // Refresh cart
        } else {
            const error = await response.json();
            alert(`Failed to place order: ${error.message}`);
        }
    } catch (error) {
        console.error('Error placing order:', error);
    }
}

// Event Listener for "Order Now" Button
document.getElementById('order-now-btn').addEventListener('click', placeOrder);

// Function to remove an item from the cart
function removeFromCart(id) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    loadCart(); // Reload the cart
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});
