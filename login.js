document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const registerForm = document.querySelector('#register-form');

    // Handle login
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const loginDto = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch('/auth/login', { // adjust the feach api
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDto),
            });

            if (!response.ok) {
                throw new Error('Login failed: ' + response.statusText);
            }

            const data = await response.json();
            alert('Login successful! ');
            localStorage.setItem('accessToken', data.accessToken);
            window.location.href = '/dashboard'; // Redirect on successful login
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });



});