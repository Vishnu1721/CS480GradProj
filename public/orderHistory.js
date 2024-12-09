async function loadOrderHistory() {
    const userId = "your-user-id"; // Replace with actual user ID (e.g., from login session).
    try {
        const response = await fetch(`${API_URL}/order/${userId}`);
        const orders = await response.json();

        const orderHistoryContainer = document.getElementById('order-history');
        orderHistoryContainer.innerHTML = orders.map(order => `
            <div class="order">
                <h3>Order ID: ${order._id}</h3>
                <p>Total Price: $${order.totalPrice}</p>
                <p>Order Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
                <ul>
                    ${order.products.map(p => `<li>${p.productId} - Quantity: ${p.quantity}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching order history:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadOrderHistory);
