'use client'; // Enable client-side interactivity

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Card from './components/persona';
import Loading from './components/loading';
import PersonaSelection from './components/PersonaSelection';
import PersonaDetailsForm from './components/PersonaDetailsForm';
import StrategyOverview from './components/StrategyOverview';
import { PERSONAS, PERSONA_DATA } from './data/personaData';
import ModelSelector from './components/ModelSelector';
import Link from 'next/link';

export default function Home() {
  const [selectedPersona, setSelectedPersona] = useState<keyof typeof PERSONA_DATA | null>(null);
  const [strategies, setStrategies] = useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [selectedModel, setSelectedModel] = useState<'mock' | 'zerodebt' | 'zerodebt-pro'>('mock');
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      const messages = [
        'Analyzing financial information...',
        'Creating a good debt strategy...',
        'Generating personalized recommendations...',
        'Finalizing your debt plan...'
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

  const handlePersonaClick = (persona: keyof typeof PERSONA_DATA) => {
    setSelectedPersona(persona);
    setFormData(PERSONA_DATA[persona as keyof typeof PERSONA_DATA]); 
    setExpandedIndex(-1);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, path: string) => {
    const keys = path.split('.');
    const value = e.target.value;

    setFormData((prevData: any) => {
      const newData = { ...prevData };
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleGenerateStrategy = async () => {
    if (!selectedPersona) return;

    setLoading(true);
    try {
      const response = await axios.post('/api/generate-strategy', {
        persona: selectedPersona,
        financialData: formData, // Ensure formData contains financial data
        isMock: selectedModel === 'mock'
      });
      setStrategies((prev) => [...prev, { ...response.data, persona: selectedPersona }]);
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

        {/* Persona Selection */}
        <div className="flex flex-col gap-8">
          <PersonaSelection
            personas={PERSONAS}
            selectedPersona={selectedPersona}
            handlePersonaClick={handlePersonaClick}
          />

          {selectedPersona && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Persona Details Form */}
              <div className="lg:col-span-1">
                <PersonaDetailsForm
                  selectedPersona={selectedPersona}
                  formData={formData}
                  handleFormChange={handleFormChange}
                />
              </div>

              {/* Strategy and Model Selection */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                  <ModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
                </div>
                <button
                  onClick={handleGenerateStrategy}
                  className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Generating...' : 'Generate Strategy'}
                </button>
                {loading && (
                  <div className="mt-2 text-sm text-gray-600 text-center">
                    <p>{statusMessages[currentMessageIndex]}</p>
                  </div>
                )}
                <StrategyOverview
                  strategies={strategies}
                  expandedIndex={expandedIndex}
                  setExpandedIndex={setExpandedIndex}
                  deleteStrategy={deleteStrategy} // Pass deleteStrategy prop
                />
              </div>
            </div>
          )}
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
