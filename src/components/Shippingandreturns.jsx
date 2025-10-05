import React from 'react';
import { Package, RefreshCw, Truck, AlertCircle, Globe, Shield, Award, Clock } from 'lucide-react';

const ShippingReturns = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shipping & Returns</h1>
          <p className="text-lg text-gray-600">Your complete guide to our policies and procedures</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Sticky Image */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=800&fit=crop" 
                  alt="Premium Shopping Experience" 
                  className="w-full h-64 lg:h-96 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Need Help?</h3>
                  <p className="text-gray-600 mb-4">Our customer service team is here to assist you with any questions.</p>
                  <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Truck className="text-blue-600" style={{ width: '24px', height: '24px' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Free Shipping</p>
                      <p className="text-sm text-gray-600">Orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <RefreshCw className="text-green-600" style={{ width: '24px', height: '24px' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">30 Days Returns</p>
                      <p className="text-sm text-gray-600">Easy returns policy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Globe className="text-purple-600" style={{ width: '24px', height: '24px' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Worldwide Shipping</p>
                      <p className="text-sm text-gray-600">We ship globally</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Return Policy */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <RefreshCw className="text-blue-600" style={{ width: '28px', height: '28px' }} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Return Policy</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We want you to be happy with every purchase you make with us. If the item you received is not the right size or you simply decide it is not for you, you are welcome to return or exchange it within the United States as long as the following conditions are met:
                </p>
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <p>The product must be unworn, undamaged, and in a condition that allows it to be resold. This means no marks, scratches, or creases, and it should be returned in its original packaging.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <p>Your return request must be initiated within 30 days of receiving your order.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <p>Please note that all shipping costs associated with returns are the responsibility of the customer.</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  We reserve the right to decline returns that do not meet these requirements. Items that have been worn, washed, or altered in any way cannot be accepted. Any product not purchased directly from us cannot be returned or exchanged through our system.
                </p>
              </div>
            </div>

            {/* Timing */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="text-orange-600" style={{ width: '28px', height: '28px' }} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Timing</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Once your return has been received and inspected at our facility, please allow up to <span className="font-semibold text-orange-600">15 business days</span> for your refund or store credit to be issued. If more than 15 business days have passed, please contact our support team so we can assist you further.
              </p>
            </div>

            {/* Refunds */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Package className="text-green-600" style={{ width: '28px', height: '28px' }} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Refunds</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Refunds are credited back to the original form of payment within <span className="font-semibold text-green-600">30 days</span> of the original purchase. If your order was paid fully or partially with a gift card, the amount will be returned in the form of a new gift card. Please note that we cannot provide cash refunds for purchases made using gift cards.
              </p>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Truck className="text-purple-600" style={{ width: '28px', height: '28px' }} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shipping</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Orders within the contiguous United States qualify for standard shipping, which is available at <span className="font-semibold text-purple-600">no cost for purchases over $50</span>. Free return shipping is not included, and customers are responsible for any costs related to returning products.
                </p>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">📦 Expedited Shipping:</p>
                  <p>If you select expedited shipping and place your order after 1 PM ET, your order will ship the next business day. Please remember that orders are not shipped on weekends or U.S. public holidays. Shipping fees are non-refundable.</p>
                </div>
              </div>
            </div>

            {/* Order Changes */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <AlertCircle className="text-yellow-600" style={{ width: '28px', height: '28px' }} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Order Changes and Cancellations</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Orders are processed quickly after they are placed, so any change to an order must be requested as soon as possible. While we do our best to accommodate changes such as address updates, product swaps, or cancellations, we cannot guarantee that all requests can be made once an order has been confirmed. Depending on the timing of the request, a processing fee may apply.
              </p>
            </div>

            {/* Lost or Damaged */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Shield className="text-red-600" style={{ width: '28px', height: '28px' }} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Lost or Damaged Goods</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                If your item arrives damaged or is lost during transit, we will replace it or issue store credit. Please reach out to our customer service team if this happens so we can resolve it quickly.
              </p>
            </div>

            {/* International Shipping */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Globe className="text-indigo-600" style={{ width: '28px', height: '28px' }} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">International Shipping and Returns</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We proudly ship to customers around the world. Please keep in mind that shipping times and return policies may vary depending on your country. Customers outside the United States are also responsible for covering any costs related to returning items internationally.
              </p>
            </div>

            {/* Defective Products */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <Award className="text-teal-600" style={{ width: '28px', height: '28px' }} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Defective or Flawed Products</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We stand behind the quality of our products. If you notice any material or craftsmanship issues, please contact us immediately so our support team can assist. Please note that we cannot accept returns from unauthorized third-party sellers.
              </p>
            </div>

            {/* Repeated Returns */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-l-4 border-orange-400">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Repeated Returns</h2>
              <p className="text-gray-700 leading-relaxed">
                To ensure a fair and smooth experience for everyone, we monitor patterns of repeated returns. If returns are found to be excessive, we may need to apply additional charges, restocking fees, or limit future purchases from being returned.
              </p>
            </div>

            {/* Final Sale */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-lg p-6 md:p-8 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">⚠️ Final Sale Items</h2>
              <p className="text-lg leading-relaxed">
                Any product purchased as part of a final sale promotion cannot be returned or exchanged.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ShippingReturns;