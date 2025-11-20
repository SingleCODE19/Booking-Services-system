import React from 'react';
import Calculator from '../components/Calculator';

const CalculatorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Service Price Calculator</h2>
        </div>
        <Calculator />
        <p className="text-slate-500 text-center mt-6 text-sm font-medium">
          *Final price may vary based on floor condition.
        </p>
      </div>
    </div>
  );
};

export default CalculatorPage;