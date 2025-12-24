import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-8 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Collections */}
          <div>
            <h3 className="text-xs md:text-sm font-medium text-gray-900 uppercase tracking-wider mb-3 md:mb-4">
              COLLECTIONS
            </h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li><Link to="/collections/black-tea" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">Black teas</Link></li>
              <li><Link to="/collections/green-tea" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">Green teas</Link></li>
              <li><Link to="/collections/white-tea" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">White teas</Link></li>
              <li><Link to="/collections/herbal-tea" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">Herbal teas</Link></li>
              <li><Link to="/collections/matcha" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">Matcha</Link></li>
              <li><Link to="/collections/chai" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">Chai</Link></li>
              <li><Link to="/collections/oolong" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">Oolong</Link></li>
              <li><Link to="/collections/rooibos" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">Rooibos</Link></li>
              <li><Link to="/collections/teaware" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">Teaware</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-xs md:text-sm font-medium text-gray-900 uppercase tracking-wider mb-3 md:mb-4">
              LEARN
            </h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li><Link to="/about" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">About us</Link></li>
              <li><Link to="/about-teas" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">About our teas</Link></li>
              <li><Link to="/tea-academy" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">Tea academy</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs md:text-sm font-medium text-gray-900 uppercase tracking-wider mb-3 md:mb-4">
              CUSTOMER SERVICE
            </h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li><Link to="/ordering" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">Ordering and payment</Link></li>
              <li><Link to="/delivery" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">Delivery</Link></li>
              <li><Link to="/privacy" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">Privacy and policy</Link></li>
              <li><Link to="/terms" className="text-xs md:text-sm text-gray-600 hover:text-gray-900">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs md:text-sm font-medium text-gray-900 uppercase tracking-wider mb-3 md:mb-4">
              CONTACT US
            </h3>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-start space-x-2">
                <span className="text-xs md:text-sm">📍</span>
                <p className="text-xs md:text-sm text-gray-600">
                  3 Falahi, Falahi St, Pasdaran Ave,<br />
                  Shiraz, Fars Provience<br />
                  Iran
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs md:text-sm">📧</span>
                <p className="text-xs md:text-sm text-gray-600">
                  Email: amoopur@gmail.com
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs md:text-sm">📞</span>
                <p className="text-xs md:text-sm text-gray-600">
                  Tel: +98 9173038406
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;