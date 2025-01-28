'use client';

import { useState } from 'react';
import { FaLock, FaChartLine, FaLightbulb, FaSync } from 'react-icons/fa';

interface MethodifyAccessProps {
  onAccessGranted: () => void;
}

export default function MethodifyAccess({ onAccessGranted }: MethodifyAccessProps) {
  const [loading, setLoading] = useState(false);

  const handleConnectBanks = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onAccessGranted();
    }, 2000);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FaLock className="text-green-600" /> <span className="text-black">Connect Your Accounts</span>
      </h2>
      <p className="text-gray-600 mb-8 text-center">
      </p>
      
      <div className="space-y-4">
        <div className="border p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="flex-1">
                <h3 className="font-semibold mb-2 text-black">Why connect your accounts?</h3>
                <ul className="text-gray-600 space-y-3">
                <li className="flex items-center gap-2">
                  <FaChartLine className="text-green-600" /> Analyze your complete liability portfolio
                </li>
                <li className="flex items-center gap-2">
                  <FaLightbulb className="text-green-600" /> Get tailored debt optimization strategies
                </li>
                <li className="flex items-center gap-2">
                  <FaSync className="text-green-600" /> Monitor your debt reduction progress in real-time
                </li>
                </ul>
            </div>
          </div>
        </div>

        <button
          onClick={handleConnectBanks}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 ${
            loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? (
            <>
              <FaSync className="animate-spin" /> Connecting...
            </>
          ) : (
            'Connect Bank Accounts'
          )}
        </button>

        <p className="text-sm text-gray-500 text-center mt-4 flex items-center justify-center gap-2">
          <FaLock className="text-gray-500" /> Your data is encrypted and secure.
        </p>
      </div>
    </div>
  );
}