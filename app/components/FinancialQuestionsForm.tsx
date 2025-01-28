import { useState } from 'react';

interface FinancialQuestionsFormProps {
    onSubmit: (data: any) => void;
    selectedModel: string;
}

export default function FinancialQuestionsForm({ onSubmit, selectedModel }: FinancialQuestionsFormProps) {
    const [formData, setFormData] = useState({
        monthlyIncome: '3800',
        monthlyExpenses: '2400',
        debtPaymentCapacity: '825', // Sum of all debt payments
        emergencyFunds: '2000',
        has401k: false,
        hasInvestments: false,
        // Hardcoded debt information
        debts: [
            {
                name: "Credit Card",
                amount: 6500,
                apr: 24.99,
                payment: { type: "minimum", amount: 195 }
            },
            {
                name: "Car Loan",
                amount: 12000,
                apr: 6.5,
                payment: { type: "fixed", amount: 350 }
            },
            // {
            //     name: "Student Loan",
            //     amount: 25000,
            //     apr: 5.8,
            //     payment: { type: "fixed", amount: 280 }
            // }
        ]
        ,
        additionalFactors: {
            monthlyVariableIncome: [200, 400],
            upcomingExpenses: 800,
            employer401kMatch: "Not available"
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSliderChange = (name: string, value: number) => {
        setFormData({ ...formData, [name]: value.toString() });
    };

    const handleInputChange = (name: string, value: string) => {
        // Ensure the input is a valid number
        if (!isNaN(Number(value))) {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            financial_data: {
                monthly_take_home_income: parseFloat(formData.monthlyIncome),
                essential_expenses: parseFloat(formData.monthlyExpenses),
                debts: formData.debts,
                additional_financial_factors: {
                    emergency_fund: parseFloat(formData.emergencyFunds),
                    monthly_variable_income_from_side_gig: formData.additionalFactors.monthlyVariableIncome,
                    upcoming_expenses: formData.additionalFactors.upcomingExpenses,
                    employer_401k_match: formData.additionalFactors.employer401kMatch
                }
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Please answer some quick questions</h2>
            
            {/* Income Slider and Input */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">1. What's your income/month?</label>
                <div className="flex items-center space-x-4">
                    <input
                        type="range"
                        name="monthlyIncome"
                        min="0"
                        max="100000"
                        value={formData.monthlyIncome}
                        onChange={(e) => handleSliderChange('monthlyIncome', parseFloat(e.target.value))}
                        className="flex-1"
                    />
                    <input
                        type="number"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                        className="w-24 p-2 border rounded text-black"
                        min="0"
                        max="100000"
                    />
                </div>
                <div className="text-sm text-gray-600">${formData.monthlyIncome}</div>
            </div>

            {/* Expenses Slider and Input */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">2. How much are your monthly expenses?</label>
                <div className="flex items-center space-x-4">
                    <input
                        type="range"
                        name="monthlyExpenses"
                        min="0"
                        max="50000"
                        value={formData.monthlyExpenses}
                        onChange={(e) => handleSliderChange('monthlyExpenses', parseFloat(e.target.value))}
                        className="flex-1"
                    />
                    <input
                        type="number"
                        name="monthlyExpenses"
                        value={formData.monthlyExpenses}
                        onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                        className="w-24 p-2 border rounded text-black"
                        min="0"
                        max="50000"
                    />
                </div>
                <div className="text-sm text-gray-600">${formData.monthlyExpenses}</div>
            </div>

            {/* Debt Payment Capacity Slider and Input */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">3. How much can you set aside for debt payments?</label>
                <div className="flex items-center space-x-4">
                    <input
                        type="range"
                        name="debtPaymentCapacity"
                        min="0"
                        max="20000"
                        value={formData.debtPaymentCapacity}
                        onChange={(e) => handleSliderChange('debtPaymentCapacity', parseFloat(e.target.value))}
                        className="flex-1"
                    />
                    <input
                        type="number"
                        name="debtPaymentCapacity"
                        value={formData.debtPaymentCapacity}
                        onChange={(e) => handleInputChange('debtPaymentCapacity', e.target.value)}
                        className="w-24 p-2 border rounded text-black"
                        min="0"
                        max="20000"
                    />
                </div>
                <div className="text-sm text-gray-600">${formData.debtPaymentCapacity}</div>
            </div>

            {/* Emergency Funds Slider and Input */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">4. How much do you have saved for emergencies?</label>
                <div className="flex items-center space-x-4">
                    <input
                        type="range"
                        name="emergencyFunds"
                        min="0"
                        max="50000"
                        value={formData.emergencyFunds}
                        onChange={(e) => handleSliderChange('emergencyFunds', parseFloat(e.target.value))}
                        className="flex-1"
                    />
                    <input
                        type="number"
                        name="emergencyFunds"
                        value={formData.emergencyFunds}
                        onChange={(e) => handleInputChange('emergencyFunds', e.target.value)}
                        className="w-24 p-2 border rounded text-black"
                        min="0"
                        max="50000"
                    />
                </div>
                <div className="text-sm text-gray-600">${formData.emergencyFunds}</div>
            </div>

            {/* 401k and Investments */}
            <div className="flex space-x-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">5. Do you contribute to 401(k)?</label>
                    <select
                        value={formData.has401k ? 'yes' : 'no'}
                        onChange={(e) => setFormData({...formData, has401k: e.target.value === 'yes'})}
                        className="w-full p-2 border rounded text-black"
                    >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">6. Do you have investments?</label>
                    <select
                        value={formData.hasInvestments ? 'yes' : 'no'}
                        onChange={(e) => setFormData({...formData, hasInvestments: e.target.value === 'yes'})}
                        className="w-full p-2 border rounded text-black"
                    >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Next
            </button>
        </form>
    );
}