document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form'); // Assuming this is the only form on the page

    // Handle registration
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const createUserDto = {
            username: username,
            email: email,
            password: password,
        };

        try {
            const response = await fetch('/auth/register', { //adjust feach api
                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createUserDto),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            alert('Registration successful! You can now log in.');
            loginForm.reset(); // Clear the form after successful registration
            window.location.href=''; // windo page is needed 
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});