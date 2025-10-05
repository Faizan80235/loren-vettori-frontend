import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqData = [
    {
      category: "Top Questions",
      questions: [
        {
          q: "What size men's boots should I choose?",
          a: "Our men's boots generally follow standard sizing. If you wear a size 10 in sneakers or dress shoes, the same size should work well for our boots. For customers with wider feet, going half a size up may provide more comfort."
        },
        {
          q: "What size men's jackets should I select?",
          a: "For jackets, sizing depends on your preference. If you want a tailored look, stay true to your usual size. If you plan to wear thicker layers underneath, you may want to size up. Our size guide on product pages will help, and our support team can assist further."
        },
        {
          q: "Why Loren Vettori?",
          a: "Loren Vettori was created to provide footwear and outerwear that combine durability, style, and timeless design. We are committed to crafting products that can be worn every day without compromising on quality or comfort."
        },
        {
          q: "Do you have any physical stores I can visit?",
          a: "At this time, Loren Vettori operates online. This helps us keep our products more accessible and convenient to order from anywhere. If we expand into physical locations, we will share updates with our customers."
        },
        {
          q: "Where are your products produced?",
          a: "Our boots and jackets are made by skilled craftsmen who focus on attention to detail and quality. Each item goes through a careful process using high-grade materials, ensuring durability and comfort."
        }
      ]
    },
    {
      category: "About Loren Vettori",
      questions: [
        {
          q: "Why Loren Vettori?",
          a: "Our name represents timeless craftsmanship and modern versatility. Loren Vettori stands for products that are durable, stylish, and designed for everyday use."
        },
        {
          q: "Do you have any stores I can visit?",
          a: "We currently sell exclusively online, allowing us to deliver premium quality directly to customers."
        },
        {
          q: "Where are your products crafted?",
          a: "All boots and jackets are carefully produced by expert artisans using fine materials, ensuring consistent quality and comfort."
        },
        {
          q: "Who should I contact for a collaboration idea?",
          a: "We welcome creative partnerships. Please contact our team through the support page with details about your idea."
        },
        {
          q: "Do you offer discounts or seasonal sales?",
          a: "We believe in fair pricing all year round. While we do not rely on constant discounts, any special promotions will be shared with our community."
        },
        {
          q: "I have seen websites selling Loren Vettori products at discounted prices. Are they real?",
          a: "We recommend purchasing only from our official website. Third-party websites advertising unusually low prices may not be legitimate."
        },
        {
          q: "Do you sell gift cards?",
          a: "Yes, Loren Vettori gift cards are available for purchase and can be used on any product in our store."
        }
      ]
    },
    {
      category: "Sizing & Fit",
      questions: [
        {
          q: "What size men's boots should I order?",
          a: "Most customers find that our boots fit true to size. Choose the same size as your dress shoes or sneakers, unless you prefer extra room or have wide feet."
        },
        {
          q: "What width are Loren Vettori men's boots? Do you offer wider options?",
          a: "Our standard boots are designed to fit an average width comfortably. At the moment, we do not offer specialized wide or narrow sizes, but our fit is versatile enough for most customers."
        },
        {
          q: "What size men's jackets should I order?",
          a: "If you prefer a closer fit, stick with your normal size. If layering heavier clothing underneath, consider sizing up. Our size guide gives clear measurements for chest, shoulders, and sleeves."
        },
        {
          q: "What size women's jackets should I order?",
          a: "Our women's jackets also fit true to size. For a more fitted style, choose your regular size. For a looser look or layering, go one size up."
        },
        {
          q: "How should my Loren Vettori products fit?",
          a: "Boots should fit snug at first without being tight, as the leather will soften over time. Jackets should allow comfortable movement while maintaining shape."
        },
        {
          q: "What is a last and which lasts does Loren Vettori use?",
          a: "A last is the mold around which footwear is shaped. At Loren Vettori, we use carefully designed lasts to balance comfort, durability, and timeless style."
        }
      ]
    },
    {
      category: "Product & Quality",
      questions: [
        {
          q: "Why do Loren Vettori boots and jackets cost less than some luxury brands?",
          a: "We focus on offering direct-to-consumer pricing. By cutting out middlemen and unnecessary markups, we provide premium quality at a fair price."
        },
        {
          q: "What makes Loren Vettori products comfortable?",
          a: "Our boots are built with supportive construction and cushioned insoles, while our jackets use flexible leathers that adapt to your body. Comfort is a core part of our design."
        },
        {
          q: "What type of leather do you use?",
          a: "We use high-quality full-grain and top-grain leathers. These are strong, durable, and designed to age beautifully over time."
        },
        {
          q: "What can I wear Loren Vettori boots and jackets with?",
          a: "Our products are versatile and pair well with both casual and formal outfits. Boots complement jeans and chinos, while jackets can be styled with anything from t-shirts to button-downs."
        },
        {
          q: "What is Goodyear welt construction?",
          a: "This is a traditional shoemaking method that stitches the sole to the upper through a welt, allowing boots to be more durable and resoleable."
        },
        {
          q: "What is WeatherSafe leather?",
          a: "WeatherSafe leather is treated to resist moisture while keeping the natural texture of the hide, making it suitable for different conditions."
        },
        {
          q: "What if the product I want is out of stock?",
          a: "If an item is unavailable, you can sign up for restock notifications on the product page. We regularly update our inventory."
        },
        {
          q: "What is Loren Vettori Friends?",
          a: "It is our community of loyal customers who enjoy early access to updates and occasional special offers."
        }
      ]
    },
    {
      category: "Shipping & Order Details",
      questions: [
        {
          q: "How much does domestic shipping cost and how long will it take?",
          a: "Domestic shipping is free. Orders take 3–5 days for processing. Afterward, you receive a tracking number, and delivery to your doorstep takes 10–13 days."
        },
        {
          q: "Do you ship to Armed Forces addresses?",
          a: "Yes, we are happy to ship to APO, FPO, and DPO addresses."
        },
        {
          q: "Do you provide shipping protection?",
          a: "We offer shipping protection at checkout to cover unexpected issues during transit."
        },
        {
          q: "Do you ship internationally? How does it work?",
          a: "Yes, we ship worldwide. International shipping times and costs vary depending on location. All applicable duties and taxes are the responsibility of the customer."
        },
        {
          q: "I have not received my order confirmation. What should I do?",
          a: "If you do not see an email confirmation, check your spam folder. If it is still missing, please contact support and we will resend it."
        },
        {
          q: "How do I track my order?",
          a: "Once processed, you will receive a tracking number to follow your shipment until it arrives."
        },
        {
          q: "My tracking number is not updating. What should I do?",
          a: "Sometimes tracking takes a little while to update. If it does not change after a couple of days, please reach out to us."
        },
        {
          q: "I am missing an item in my order. What should I do?",
          a: "Contact support immediately so we can resolve the issue and send what you are missing."
        },
        {
          q: "Can I change or cancel an order after placing it?",
          a: "If your order has not yet been processed, we can adjust or cancel it. Please contact us as soon as possible."
        },
        {
          q: "Can I pay for my order in installments?",
          a: "Yes, we offer installment payment options at checkout to make purchases easier."
        }
      ]
    },
    {
      category: "Exchanges & Returns",
      questions: [
        {
          q: "How do I begin a return or exchange?",
          a: "Contact our support team to request a return or exchange. Items must be unused and kept in original packaging. The customer is responsible for return shipping costs."
        },
        {
          q: "How do international returns work?",
          a: "For returns outside the US, the process is similar, but international customers are responsible for all shipping fees."
        },
        {
          q: "Where is my return?",
          a: "You can track your return shipment using the courier information provided when you sent it back."
        },
        {
          q: "When will I receive my refund?",
          a: "Refunds are processed once we inspect the returned product. This may take a few business days after we receive the package."
        }
      ]
    },
    {
      category: "Care Instructions",
      questions: [
        {
          q: "How do I take care of my Loren Vettori boots?",
          a: "Boots last longer with proper care. Wipe them clean after use, avoid letting them stay wet for long, and condition the leather regularly to prevent drying. Store them in a cool and dry place, preferably with shoe trees to maintain their shape."
        },
        {
          q: "How do I take care of my Loren Vettori jackets?",
          a: "Leather jackets require gentle handling. Avoid exposing them to heavy moisture, and clean them with a soft cloth when needed. Conditioning helps maintain the leather's softness and prevents cracks. Always hang your jacket on a wide hanger to preserve its structure."
        },
        {
          q: "Are Loren Vettori boots water resistant?",
          a: "Our boots are crafted with high-quality leather that naturally repels light moisture, though they are not fully waterproof. For added protection, we recommend applying a leather-safe waterproofing spray."
        },
        {
          q: "Are Loren Vettori jackets water resistant?",
          a: "Leather jackets naturally resist minor moisture but are not waterproof. If your jacket gets damp, let it air dry naturally and avoid heat sources. Using a leather conditioner regularly helps the jacket stay flexible and protected."
        },
        {
          q: "Are Loren Vettori boots resoleable?",
          a: "Yes, many of our boots are constructed with Goodyear welt, making them suitable for resoling."
        },
        {
          q: "Which care products do you recommend?",
          a: "We suggest using high-quality leather conditioners, cleaners, and waterproofing sprays that are specifically designed for leather."
        },
        {
          q: "Should I waterproof my boots and jackets before wearing them?",
          a: "We recommend applying a protective spray to both boots and jackets before first use. This helps guard against water and stains while extending their life."
        }
      ]
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      {faqData.map((section, sectionIdx) => (
        <div key={sectionIdx} className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">{section.category}</h2>
          <div className="space-y-3">
            {section.questions.map((item) => {
              const currentIndex = questionIndex++;
              return (
                <div key={currentIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleQuestion(currentIndex)}
                    className="w-full px-4 md:px-5 py-3 md:py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-700 pr-3 md:pr-4 text-sm md:text-base">{item.q}</span>
                    <ChevronDown
                      style={{ width: '20px', height: '20px' }}
                      className={`text-gray-500 flex-shrink-0 transition-transform ${
                        openQuestion === currentIndex ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openQuestion === currentIndex && (
                    <div className="px-4 md:px-5 py-3 md:py-4 bg-gray-50 text-gray-600 leading-relaxed border-t border-gray-200 text-sm md:text-base">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQPage;