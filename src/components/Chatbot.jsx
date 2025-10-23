import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Comprehensive FAQ Database
  const faqDatabase = {
    brand: {
      keywords: ['who', 'what is loren', 'brand', 'about', 'company', 'based', 'start'],
      responses: [
        "Loren Vettori is a premium brand specializing in high-quality leather boots and jackets. We focus on timeless design, durable craftsmanship, and comfort so you can wear our products for years. 👢",
        "We stand for authenticity, craftsmanship, and style. We combine modern fashion with traditional techniques to create products that last.",
        "Loren Vettori is based online and serves customers worldwide with great attention to detail in design, production, and quality control."
      ]
    },
    products: {
      keywords: ['product', 'boot', 'jacket', 'leather', 'quality', 'material', 'genuine', 'handmade'],
      responses: [
        "We use premium full-grain leather from trusted tanneries. Our boots feature durable construction with Goodyear welt and can be resoled! 🥾",
        "Our jackets are made from 100% genuine leather including lambskin and cowhide. Each piece develops a unique patina over time.",
        "Yes! All our products are made from 100% genuine leather with skilled handcrafting in stitching and finishing.",
        "With proper care, Loren Vettori boots and jackets can last many years. They're built to age beautifully!"
      ]
    },
    sizing: {
      keywords: ['size', 'fit', 'measurement', 'large', 'small', 'width', 'half size', 'between'],
      responses: [
        "Our boots fit true to size! If you're between sizes, we recommend going down a half size as leather stretches with wear. 📏",
        "For jackets: order your regular size for a slim fit, or size up for layering. We have detailed size charts on each product page!",
        "Yes, we offer half sizes! Check our size guide with measurements for chest, waist, and sleeve length.",
        "Need help with sizing? Contact our support team at support@lorenvettori.com for personalized advice!"
      ]
    },
    ordering: {
      keywords: ['order', 'buy', 'purchase', 'payment', 'pay', 'checkout', 'paypal', 'apple pay'],
      responses: [
        "Ordering is simple! Browse our collection, select your size, add to cart, and checkout securely. 🛒",
        "We accept Visa, MasterCard, Amex, Discover, PayPal, Apple Pay, Google Pay, and Shop Pay!",
        "You can checkout as a guest, but creating an account helps you track orders and manage returns easily.",
        "We process payments immediately in US dollars. International customers' banks will convert to local currency."
      ]
    },
    shipping: {
      keywords: ['ship', 'delivery', 'tracking', 'when', 'arrive', 'international', 'cost'],
      responses: [
        "Processing takes 3-5 business days, then delivery is 10-13 business days. You'll get a tracking number via email! 📦",
        "We ship worldwide! International shipping fees vary by location. Customs duties are customer's responsibility.",
        "Track your order using the tracking number we email you. It updates within 48 hours of processing.",
        "Shipping costs are calculated at checkout based on your location and delivery method."
      ]
    },
    returns: {
      keywords: ['return', 'refund', 'exchange', 'wrong size', 'policy'],
      responses: [
        "We have a 30-day return policy! Items must be unused and in original packaging. 🔄",
        "If the size doesn't fit, we offer easy exchanges. Just contact our support team to arrange it.",
        "Wrong item? Missing item? Contact us immediately at support@lorenvettori.com - we'll fix it right away!",
        "Visit our Shipping & Returns page for complete details on our return process."
      ]
    },
    care: {
      keywords: ['clean', 'care', 'maintain', 'polish', 'waterproof', 'condition', 'store'],
      responses: [
        "Clean boots with a soft brush and leather cleaner. Condition every 1-2 months to keep leather supple! 🧼",
        "For jackets: wipe with damp cloth, use leather conditioner every 2-3 months, and hang on padded hangers.",
        "Apply waterproofing spray for rain protection. Test on small area first! Reapply every few weeks.",
        "Store in cool, dry place away from sunlight. Use shoe trees for boots and padded hangers for jackets."
      ]
    },
    discounts: {
      keywords: ['discount', 'promo', 'sale', 'coupon', 'gift card', 'student'],
      responses: [
        "We run seasonal promotions and special offers! Subscribe to our newsletter to stay updated. 🎁",
        "Yes, you can apply discount codes during checkout - one code per order.",
        "We offer digital gift cards that never expire! Perfect for gifting. They can be used just like any payment method.",
        "Follow us on social media for exclusive discounts and limited-time offers!"
      ]
    },
    contact: {
      keywords: ['contact', 'email', 'support', 'help', 'phone', 'reach'],
      responses: [
        "You can reach us at support@lorenvettori.com for any questions! We're here to help. 📧",
        "Need immediate help? I'm here 24/7! For complex issues, our support team responds within 24 hours.",
        "You can also contact us through the Contact page on our website.",
        "For wholesale inquiries, reach out to our support team directly!"
      ]
    }
  };

  const greetings = [
    "Hi! 👋 Welcome to Loren Vettori! I'm your personal shopping assistant. How can I help you today?",
    "Hello! 😊 I'm here to help you find the perfect leather boots or jackets. What are you looking for?",
    "Hey there! 🌟 Ready to explore premium leather products? Ask me anything!"
  ];

  const farewells = [
    "Thank you for chatting with Loren Vettori! Have a great day! 👋",
    "It was a pleasure helping you! Feel free to come back anytime. 😊",
    "Goodbye! Don't forget to check out our collection! 🛍️"
  ];

  const thanks = [
    "You're very welcome! 😊 Is there anything else I can help you with?",
    "Happy to help! Let me know if you have more questions! ✨",
    "My pleasure! Feel free to ask anything else about our products."
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(greetings[0]);
        setTimeout(() => {
          addBotMessage("I can help you with:\n• Product information 🥾\n• Sizing & fit 📏\n• Ordering & payments 💳\n• Shipping details 📦\n• Care instructions 🧼\n\nWhat would you like to know?");
        }, 1000);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      text,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);
  };

  const findBestResponse = (userMessage) => {
    const msg = userMessage.toLowerCase().trim();
    
    if (msg.match(/^(hi|hello|hey|hola|salam|good morning|good evening)/i)) {
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    if (msg.includes('thank') || msg.includes('thanks') || msg.includes('appreciate')) {
      return thanks[Math.floor(Math.random() * thanks.length)];
    }
    
    if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you')) {
      return farewells[Math.floor(Math.random() * farewells.length)];
    }

    let bestMatch = null;
    let highestScore = 0;

    Object.entries(faqDatabase).forEach(([category, data]) => {
      const matchScore = data.keywords.filter(keyword => 
        msg.includes(keyword.toLowerCase())
      ).length;

      if (matchScore > highestScore) {
        highestScore = matchScore;
        bestMatch = data.responses;
      }
    });

    if (bestMatch && highestScore > 0) {
      return bestMatch[Math.floor(Math.random() * bestMatch.length)];
    }

    return "I'd love to help you with that! 😊 You can ask me about:\n\n• Our leather boots and jackets 🥾\n• Sizing and fit guide 📏\n• Order and payment options 💳\n• Shipping information 📦\n• Product care tips 🧼\n• Returns and exchanges 🔄\n\nOr email us at support@lorenvettori.com for detailed assistance!";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    addUserMessage(inputMessage);
    const userMsg = inputMessage;
    setInputMessage('');
    
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const response = findBestResponse(userMsg);
      addBotMessage(response);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    { text: "View Products", icon: "🛍️" },
    { text: "Size Guide", icon: "📏" },
    { text: "Shipping Info", icon: "📦" },
    { text: "Care Tips", icon: "🧼" }
  ];

  const handleQuickReply = (reply) => {
    addUserMessage(reply.text);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const response = findBestResponse(reply.text);
      addBotMessage(response);
    }, 1000);
  };

  return (
    <>
      {/* Chatbot Icon Button - Responsive positioning */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gray-900 text-white p-3 sm:p-4 rounded-full shadow-xl hover:bg-gray-800 transition-all duration-300 z-[9999] group"
          aria-label="Open chat"
          style={{ marginTop: '80px' }} // Extra space from top
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
            !
          </span>
          <span className="hidden sm:block absolute -top-12 right-0 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Need help? Chat with us! 💬
          </span>
        </button>
      )}

      {/* Chatbot Window - Responsive & Light Theme */}
      {isOpen && (
        <div 
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-6rem)] sm:h-[600px] max-h-[700px] bg-white rounded-2xl shadow-2xl flex flex-col z-[9999] border border-gray-200"
          style={{ marginTop: '80px' }} // Extra space from navbar
        >
          {/* Header - Light Theme */}
          <div className="bg-white border-b-2 border-gray-200 text-gray-900 p-3 sm:p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                  Loren Vettori
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></span>
                  Online • Here to help
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-100 rounded-full p-1.5 sm:p-2 transition"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>

          {/* Messages Area - Light Theme */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm ${
                    message.sender === 'user'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    {message.sender === 'bot' && (
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0 text-gray-600" />
                    )}
                    <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                    {message.sender === 'user' && (
                      <User className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                    )}
                  </div>
                  <p className={`text-[10px] sm:text-xs mt-1 text-right ${
                    message.sender === 'user' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2 shadow-sm">
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Replies */}
            {messages.length === 2 && !isTyping && (
              <div className="space-y-2">
                <p className="text-[10px] sm:text-xs text-gray-500 text-center font-semibold">Quick Questions:</p>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="bg-white border border-gray-300 hover:border-gray-900 hover:bg-gray-50 rounded-lg p-2 sm:p-2.5 text-[10px] sm:text-xs text-gray-700 hover:text-gray-900 transition flex items-center justify-center gap-1 sm:gap-1.5 font-medium"
                    >
                      <span className="text-sm sm:text-base">{reply.icon}</span>
                      <span>{reply.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Light Theme */}
          <div className="p-3 sm:p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-2 text-center">
              Powered by Loren Vettori
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;