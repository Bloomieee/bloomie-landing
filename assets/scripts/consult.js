// consult.js: Chat functionality with automated responses

document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const faqButtons = document.querySelectorAll('.faq-btn');

    // Automated responses based on keywords
    const responses = {
        'product': 'Sure, I can help you with that! First, I need to know what kind of skin you embrace as yours. Do you have oily, dry, combination, or sensitive skin?',
        'face': 'Sure, I can help you with that! First, I need to know what kind of skin you embrace as yours. Do you have oily, dry, combination, or sensitive skin?',
        'treatment': 'To determine if you need treatment, I recommend completing our skin analysis scan. This will help identify any specific concerns like acne, wrinkles, dark spots, or dehydration. Would you like me to guide you to the scan feature?',
        'dermatologic': 'For the best dermatologic products, I recommend visiting pharmacies like Inkafarma, MiFarma, or specialized stores. You can also check our "Nearby Stores" feature in the dashboard to find locations near you!',
        'routine': 'Your personalized routine is based on your skin type and lifestyle answers. I recommend cleansing, toning, treating, and moisturizing twice daily. Would you like more details about any specific step?',
        'skin': 'So please, Can you tell me more about your skin traits? Are you experiencing any specific issues like dryness, oiliness, acne, or sensitivity?',
        'acne': 'For acne-prone skin, I recommend using a gentle cleanser with salicylic acid, followed by a lightweight moisturizer. Avoid touching your face and make sure to change your pillowcase regularly!',
        'dry': 'For dry skin, focus on hydrating products with hyaluronic acid and ceramides. Use a rich moisturizer and consider adding a facial oil to your nighttime routine.',
        'oily': 'For oily skin, use a gel-based cleanser and lightweight, oil-free moisturizer. Niacinamide serums can help control sebum production!',
        'sensitive': 'For sensitive skin, stick to fragrance-free products with minimal ingredients. Look for soothing ingredients like aloe vera, centella asiatica, and oat extract.',
        'sunscreen': 'Sunscreen is essential! Apply SPF 30+ every morning, even on cloudy days. Reapply every 2 hours if you\'re outside. This prevents premature aging and protects your skin.',
        'hello': 'Hello! 👋 I\'m your Bloomie skincare assistant. How can I help you today with your skincare routine?',
        'hi': 'Hi there! 👋 I\'m here to help with all your skincare questions. What would you like to know?',
        'thanks': 'You\'re welcome! 😊 Is there anything else I can help you with regarding your skincare routine?',
        'thank': 'You\'re welcome! 😊 Feel free to ask me anything else about skincare!',
        'default': 'I\'m here to help with your skincare questions! You can ask me about products, routines, skin types, or specific concerns like acne, dryness, or sensitivity. What would you like to know?'
    };

    // Send message function
    function sendMessage(message) {
        if (!message.trim()) return;

        // Add user message
        addMessage(message, 'user');

        // Clear input
        chatInput.value = '';

        // Hide FAQ suggestions after first message
        const faqSuggestions = document.getElementById('faqSuggestions');
        if (faqSuggestions) {
            faqSuggestions.style.display = 'none';
        }

        // Get bot response after delay
        setTimeout(() => {
            const response = getResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        
        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble';
        messageBubble.textContent = text;
        
        messageDiv.appendChild(messageBubble);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get automated response
    function getResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [keyword, response] of Object.entries(responses)) {
            if (keyword !== 'default' && lowerMessage.includes(keyword)) {
                return response;
            }
        }
        
        return responses.default;
    }

    // Event listeners
    sendBtn.addEventListener('click', () => {
        sendMessage(chatInput.value);
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage(chatInput.value);
        }
    });

    // FAQ button clicks
    faqButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            sendMessage(question);
        });
    });
});
