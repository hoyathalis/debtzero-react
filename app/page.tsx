'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import FinancialQuestionsForm from './components/FinancialQuestionsForm';
import MethodifyAccess from './components/MethodifyAccess';
import StrategyOverview from './components/StrategyOverview';
import ModelSelector from './components/ModelSelector';
import Link from 'next/link';

export default function Home() {
  const [strategies, setStrategies] = useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<'mock' | 'zerodebt' | 'zerodebt-pro'>('mock');
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [financialData, setFinancialData] = useState<any>(null);

  useEffect(() => {
    // This ensures the component is mounted before any client-side state updates
    setStatusMessages([]);
    setCurrentMessageIndex(0);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      const messages = [
        'Analyzing financial information...',
        'Creating a good debt strategy...',
        'Generating personalized recommendations...',
        'Finalizing your debt plan...',
      ];
      setStatusMessages(messages);
      setCurrentMessageIndex(0);
      interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 5000);
    } else {
      setStatusMessages([]);
      setCurrentMessageIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleFinancialDataSubmit = async (data: any) => {
    setFinancialData(data);
    setCurrentStep(1); // Move to MethodifyAccess step
  };

  const handleAccessGranted = () => {
    setCurrentStep(2); // Move to strategy step after access is granted
  };

  const handleGenerateStrategy = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-strategy', {
        financialData,
        isMock: selectedModel === 'mock',
        modelType: selectedModel,
      });
      setStrategies((prev) => [...prev, response.data]);
      setExpandedIndex(strategies.length);
    } catch (error) {
      console.error('Error generating strategy:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStrategy = (index: number) => {
    setStrategies((prev) => prev.filter((_, i) => i !== index));
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else if (expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FinancialQuestionsForm 
              onSubmit={handleFinancialDataSubmit}
              autoAdvance={true} // Add this prop to your form component
            />
          </div>
        );
      case 1:
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <MethodifyAccess onAccessGranted={handleAccessGranted} />
          </div>
        );
      case 2:
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-6">
              <ModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
              {!strategies.length && (
                <button
                  onClick={handleGenerateStrategy}
                  className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Generate Strategy
                </button>
              )}
            </div>
            {loading && (
              <div className="mt-2 text-sm text-gray-600 text-center">
                <p>{statusMessages[currentMessageIndex]}</p>
              </div>
            )}
            <StrategyOverview
              strategies={strategies}
              expandedIndex={expandedIndex}
              setExpandedIndex={setExpandedIndex}
              deleteStrategy={deleteStrategy}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-[90%] mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">
            DebtZero
          </Link>
          <nav>
            <ul className="flex space-x-6 text-gray-700">
              <li>
                <Link href="/about" className="hover:text-green-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-green-600">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-[90%] mx-auto px-4 py-8 w-full">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Take Control of Your Debt</h1>
          <p className="text-lg text-gray-600 mb-6">
            Personalized strategies to help you manage and eliminate debt efficiently.
          </p>
        </section>

        {/* Card View Content */}
        <div className="max-w-4xl mx-auto">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded ${
                currentStep === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Previous
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow mt-12">
        <div className="max-w-[90%] mx-auto px-4 py-6 flex justify-between items-center">
          <p className="text-gray-600">&copy; 2025 DebtMaster. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-gray-600 hover:text-green-600">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-green-600">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}