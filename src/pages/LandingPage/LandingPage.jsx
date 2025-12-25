import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import mainLanding from '../../assets/images/main landing page.jpg';
import blackImg from '../../assets/images/107c02d9996dfe83fb8bdd868196319fa864018f.jpg';
import greenImg from '../../assets/images/4469b82376e6d6e4dd6477a7a98cf42a45a38a05.jpg';
import whiteImg from '../../assets/images/45d4af846a0c593ecfde4bf49b9637f4ae8a63f2.jpg';
import matchaImg from '../../assets/images/4d22ce807689d07a2d316c9b9bd21294008059d1.jpg';
import herbalImg from '../../assets/images/4ed1bd594c5d611a95d9efd892f14ba62c6c68c4.jpg';
import chaiImg from '../../assets/images/a7b47e9ba4ca5788c18b5bb669f80c10404bf9ca.jpg';
import oolongImg from '../../assets/images/c3915d82a0f798034b1306ab0f3cec5d43cb46ce.jpg';
import rooibosImg from '../../assets/images/e488290fae054f73ee109d481150f5b34f3acb4c.jpg';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white pt-[114px] pb-16">
        <div className="max-w-[1280px] mx-auto px-8">
        <div className="max-w-[1204px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-[120px] min-h-[628px]">
            {/* Hero Image */}
            <div className="w-full lg:w-[628px] h-[400px] lg:h-[628px] bg-[#D9D9D9] flex-shrink-0">
              <img
                src={mainLanding}
                alt="Tea varieties on spoons"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hero Content */}
            <div className="flex-1 max-w-[456px] flex flex-col gap-[30px] text-center lg:text-left">
              <h1 style={{ fontFamily: 'Prosto One', fontSize: '36px', lineHeight: '44px', fontWeight: 400 }} className="text-gray-900 text-2xl lg:text-4xl">
                Every day is unique, just like our tea
              </h1>
              
              <div className="font-['Montserrat'] font-normal text-base leading-6 tracking-[0.5px] space-y-6">
                <p>
                  Lorem ipsum dolor sit amet consectetur. Orci nibh nullam risus adipiscing odio. Neque lacus nibh eros in.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Orci nibh nullam risus adipiscing odio. Neque lacus nibh eros in.
                </p>
              </div>
              
              <button 
                className="bg-gray-900 text-white px-10 py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors w-fit mx-auto lg:mx-0"
                onClick={() => window.location.href = '/collections'}
              >
                BROWSE TEAS
              </button>
            </div>
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider">450+ KIND OF LOOSEF TEA</h3>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider">CERTIFICATED ORGANIC TEAS</h3>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider">FREE DELIVERY</h3>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider">SAMPLE FOR ALL TEAS</h3>
            </div>
          </div>
          
          <div className="text-center">
            <button className="border border-gray-900 text-gray-900 px-12 py-3 text-xs font-medium uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors">
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <h2 className="text-3xl font-normal text-center text-gray-900 mb-12">
            Our Collections
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Black Tea */}
            <Link to="/collections/black-tea" className="group flex flex-col">
              <div className="w-full h-48 md:h-64 lg:h-72 overflow-hidden relative">
                <img
                  src={blackImg}
                  alt="Black Tea"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center text-xs md:text-sm font-medium text-gray-900 mt-3 uppercase tracking-wide">BLACK TEA</h3>
            </Link>

            {/* Green Tea */}
            <Link to="/collections/green-tea" className="group flex flex-col">
              <div className="w-full h-48 md:h-64 lg:h-72 overflow-hidden relative">
                <img
                  src={greenImg}
                  alt="Green Tea"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center text-xs md:text-sm font-medium text-gray-900 mt-3 uppercase tracking-wide">GREEN TEA</h3>
            </Link>

            {/* White Tea */}
            <Link to="/collections/white-tea" className="group flex flex-col">
              <div className="w-full h-48 md:h-64 lg:h-72 overflow-hidden relative">
                <img
                  src={whiteImg}
                  alt="White Tea"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center text-xs md:text-sm font-medium text-gray-900 mt-3 uppercase tracking-wide">WHITE TEA</h3>
            </Link>

            {/* Matcha */}
            <Link to="/collections/matcha" className="group flex flex-col">
              <div className="w-full h-48 md:h-64 lg:h-72 overflow-hidden relative">
                <img
                  src={matchaImg}
                  alt="Matcha"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center text-xs md:text-sm font-medium text-gray-900 mt-3 uppercase tracking-wide">MATCHA</h3>
            </Link>

            {/* Herbal Tea */}
            <Link to="/collections/herbal-tea" className="group flex flex-col">
              <div className="w-full h-48 md:h-64 lg:h-72 overflow-hidden relative">
                <img
                  src={herbalImg}
                  alt="Herbal Tea"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center text-xs md:text-sm font-medium text-gray-900 mt-3 uppercase tracking-wide">HERBAL TEA</h3>
            </Link>

            {/* Chai */}
            <Link to="/collections/chai" className="group flex flex-col">
              <div className="w-full h-48 md:h-64 lg:h-72 overflow-hidden relative">
                <img
                  src={chaiImg}
                  alt="Chai"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center text-xs md:text-sm font-medium text-gray-900 mt-3 uppercase tracking-wide">CHAI</h3>
            </Link>

            {/* Oolong */}
            <Link to="/collections/oolong" className="group flex flex-col">
              <div className="w-full h-48 md:h-64 lg:h-72 overflow-hidden relative">
                <img
                  src={oolongImg}
                  alt="Oolong"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center text-xs md:text-sm font-medium text-gray-900 mt-3 uppercase tracking-wide">OOLONG</h3>
            </Link>

            {/* Rooibos */}
            <Link to="/collections/rooibos" className="group flex flex-col">
              <div className="w-full h-48 md:h-64 lg:h-72 overflow-hidden relative">
                <img
                  src={rooibosImg}
                  alt="Rooibos"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center text-xs md:text-sm font-medium text-gray-900 mt-3 uppercase tracking-wide">ROOIBOS</h3>
            </Link>

            {/* Teaware */}
            <Link to="/collections/teaware" className="group flex flex-col">
              <div className="w-full h-48 md:h-64 lg:h-72 overflow-hidden relative">
                <img
                  src={oolongImg}
                  alt="Teaware"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center text-xs md:text-sm font-medium text-gray-900 mt-3 uppercase tracking-wide">TEAWARE</h3>
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
};

export default LandingPage;