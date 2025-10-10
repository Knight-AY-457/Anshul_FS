import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCard from './ProductCard'

function App() {
  return (
    <div className="flex gap-6 p-6">
      <ProductCard
        name="Wireless Headphones"
        price={1500}
        description="Noise-cancelling Bluetooth headphones with 20hr battery."
        instock={true}
      />
      <ProductCard
        name="Smart Watch"
        price={3000}
        description="Fitness tracker with heart-rate monitoring and GPS."
        instock={false}
      />
      <ProductCard
        name="Gaming Mouse"
        price={700}
        description="High Senstivity RGB mouse with 6  buttons."
        instock={true}
      />
    </div>
  );
}
export default App