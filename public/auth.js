const API_URL = 'http://localhost:5000'; // Update if your backend runs elsewhere

// Signup
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch(`${API_URL}/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            alert('Signup successful!');
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            const error = await response.json();
            alert(`Signup failed: ${error.error}`);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An error occurred during signup. Please try again later.');
    }
});

// Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Save token for authentication
            localStorage.setItem('userId', data.userId); // Save user ID
            alert('Login successful!');
            window.location.href = 'index.html'; // Redirect to homepage
        } else {
            const error = await response.json();
            alert(`Login failed: ${error.error}`);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An error occurred during login. Please try again later.');
    }
});
