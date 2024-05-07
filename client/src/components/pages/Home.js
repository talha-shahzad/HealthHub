// 


import React from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="home-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-4xl font-bold text-center mb-8"
      >
        Welcome to Your Awesome App!
      </motion.h1>
      <p className="text-lg text-gray-700 mb-8 max-w-md text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
        perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo
        inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow">
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
