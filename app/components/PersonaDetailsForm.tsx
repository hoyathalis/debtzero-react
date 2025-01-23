'use client';
import React from 'react';

interface PersonaDetailsFormProps {
  selectedPersona: string;
  formData: any;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, path: string) => void;
  handleArrayChange?: (operation: 'add' | 'remove', path: string, index?: number) => void;
}

const PersonaDetailsForm: React.FC<PersonaDetailsFormProps> = ({
  selectedPersona,
  formData,
  handleFormChange,
  handleArrayChange
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-black">{selectedPersona} Details</h2>
      
      <form className="space-y-6">
        {/* Basic Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-black">Risk Profile</label>
            <input
              type="text"
              value={formData.risk_profile}
              onChange={(e) => handleFormChange(e, 'risk_profile')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Investment Horizon</label>
            <input
              type="text"
              value={formData.investment_horizon}
              onChange={(e) => handleFormChange(e, 'investment_horizon')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
        </div>

        {/* Financial Data Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-black">Monthly Take Home Income</label>
            <input
              type="number"
              value={formData.financial_data.monthly_take_home_income}
              onChange={(e) => handleFormChange(e, 'financial_data.monthly_take_home_income')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Essential Expenses</label>
            <input
              type="number"
              value={formData.financial_data.essential_expenses}
              onChange={(e) => handleFormChange(e, 'financial_data.essential_expenses')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
        </div>

        {/* Additional Financial Factors */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-black">Additional Financial Factors</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-black">Emergency Fund</label>
              <input
                type="number"
                value={formData.financial_data.additional_financial_factors.emergency_fund}
                onChange={(e) => handleFormChange(e, 'financial_data.additional_financial_factors.emergency_fund')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Upcoming Expenses</label>
              <input
                type="number"
                value={formData.financial_data.additional_financial_factors.upcoming_expenses}
                onChange={(e) => handleFormChange(e, 'financial_data.additional_financial_factors.upcoming_expenses')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">401k Match</label>
              <input
                type="text"
                value={formData.financial_data.additional_financial_factors.employer_401k_match}
                onChange={(e) => handleFormChange(e, 'financial_data.additional_financial_factors.employer_401k_match')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
          </div>

          {/* Variable Income Range */}
          <div className="mt-4">
            <h4 className="text-md font-semibold mb-2 text-black">Side Gig Income Range</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                value={formData.financial_data.additional_financial_factors.monthly_variable_income_from_side_gig[0]}
                onChange={(e) => handleFormChange(e, 'financial_data.additional_financial_factors.monthly_variable_income_from_side_gig[0]')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="Minimum"
              />
              <input
                type="number"
                value={formData.financial_data.additional_financial_factors.monthly_variable_income_from_side_gig[1]}
                onChange={(e) => handleFormChange(e, 'financial_data.additional_financial_factors.monthly_variable_income_from_side_gig[1]')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="Maximum"
              />
            </div>
          </div>

          {/* Retirement Savings */}
          {formData.financial_data.additional_financial_factors.retirement_savings && (
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2 text-black">Retirement Savings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black">401k Contribution</label>
                  <input
                    type="number"
                    value={formData.financial_data.additional_financial_factors.retirement_savings.contribution_401k}
                    onChange={(e) => handleFormChange(e, 'financial_data.additional_financial_factors.retirement_savings.contribution_401k')}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Current Balance</label>
                  <input
                    type="number"
                    value={formData.financial_data.additional_financial_factors.retirement_savings.current_balance}
                    onChange={(e) => handleFormChange(e, 'financial_data.additional_financial_factors.retirement_savings.current_balance')}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Debts Section */}
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-black">Debts</h3>
            <button
              type="button"
              onClick={() => handleArrayChange?.('add', 'financial_data.debts')}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Debt
            </button>
          </div>
          
          {formData.financial_data.debts.map((debt: any, index: number) => (
            <div key={index} className="mt-4 p-4 border rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-md font-semibold text-black">Debt #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => handleArrayChange?.('remove', 'financial_data.debts', index)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black">Name</label>
                  <input
                    type="text"
                    value={debt.name}
                    onChange={(e) => handleFormChange(e, `financial_data.debts[${index}].name`)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Amount</label>
                  <input
                    type="number"
                    value={debt.amount}
                    onChange={(e) => handleFormChange(e, `financial_data.debts[${index}].amount`)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">APR (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={debt.apr}
                    onChange={(e) => handleFormChange(e, `financial_data.debts[${index}].apr`)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Payment Type</label>
                  <select
                    value={debt.payment.type}
                    onChange={(e) => handleFormChange(e, `financial_data.debts[${index}].payment.type`)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  >
                    <option value="minimum">Minimum</option>
                    <option value="fixed">Fixed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Payment Amount</label>
                  <input
                    type="number"
                    value={debt.payment.amount}
                    onChange={(e) => handleFormChange(e, `financial_data.debts[${index}].payment.amount`)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default PersonaDetailsForm;