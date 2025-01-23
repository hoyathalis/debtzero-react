import React, { useState } from 'react';
import { FaDollarSign, FaCalendarAlt, FaPiggyBank, FaChartLine, FaMoneyBillWave, FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa';

interface StrategyOverviewProps {
  strategies: any[];
  expandedIndex: number;
  setExpandedIndex: (value: number) => void;
  deleteStrategy: (index: number) => void;
}

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

interface DebtDistributionProps {
  debt: any;
}

interface DebtRepaymentPlanProps {
  plan: any[];
}

interface AdditionalSuccessMetricsProps {
  metrics: any;
}

// Collapsible Section Component
const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

// Debt Distribution Component
const DebtDistribution: React.FC<DebtDistributionProps> = ({ debt }) => (
  <div className="mt-2">
    <p className="text-sm text-gray-600">Debt Type: <span className="font-medium">{debt.debtType}</span></p>
    <p className="text-sm text-gray-600">Interest Rate: <span className="font-medium">{debt.interestRate}%</span></p>
    <p className="text-sm text-gray-600">Payment: <span className="font-medium">${debt.payment}</span></p>
    <p className="text-sm text-gray-600">Ending Balance: <span className="font-medium">${debt.endingBalance}</span></p>
    <p className="text-sm text-gray-600">Notes: <span className="font-medium">{debt.notes}</span></p>
  </div>
);

// Debt Repayment Plan Component
const DebtRepaymentPlan: React.FC<DebtRepaymentPlanProps> = ({ plan }) => (
  <div>
    {plan.map((phase, index) => (
      <div key={index} className="p-4 bg-blue-50 rounded-lg mt-2">
        <p className="text-sm font-medium text-gray-700">Month {phase.month}</p>
        <p className="text-sm text-gray-600">Starting Debt: <span className="font-medium">${phase.startingDebt}</span></p>
        <p className="text-sm text-gray-600">Allocated Amount: <span className="font-medium">${phase.allocatedAmountForDebt}</span></p>
        <p className="text-sm text-gray-600">Remaining Debt: <span className="font-medium">${phase.remainingDebt}</span></p>
        <p className="text-sm text-gray-600">Total Interest Paid: <span className="font-medium">${phase.totalInterestPaid}</span></p>
        <p className="flex items-center gap-2 text-sm text-gray-600">
          <FaMoneyBillWave className="text-green-500" />
          <span className="font-medium">{phase.actions}</span>
        </p>
        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-700">Debt Distribution</h4>
          {phase.debtDistribution.map((debt, debtIndex) => (
            <DebtDistribution key={debtIndex} debt={debt} />
          ))}
        </div>
        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-700">Monthly Payment Breakdown</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {phase.debtDistribution.map((debt, i) => (
              <li key={i}>
                Pay ${debt.payment} for {debt.debtType}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
);

// Additional Success Metrics Component
const AdditionalSuccessMetrics: React.FC<AdditionalSuccessMetricsProps> = ({ metrics }) => (
  <ul className="list-disc list-inside text-sm text-gray-700">
    <li>Credit Score Increase: <span className="font-medium">{metrics.CreditScoreIncrease}</span></li>
    <li>Total Debt Paid Off: <span className="font-medium">${metrics.TotalDebtPaidOff}</span></li>
    <li>Months to Debt Freedom: <span className="font-medium">{metrics.MonthsToDebtFreedom}</span></li>
    <li>Monthly Cash Flow Increase: <span className="font-medium">{metrics.MonthlyCashFlowIncrease}</span></li>
    <li>Average Interest Rate Reduction: <span className="font-medium">{metrics.AverageInterestRateReduction}</span></li>
  </ul>
);

// Main Component
export default function StrategyOverview({
  strategies,
  expandedIndex,
  setExpandedIndex,
  deleteStrategy
}: StrategyOverviewProps) {
  return (
    <div className="flex flex-col gap-6">
      {strategies.map((strategy, index) => {
        const isExpanded = expandedIndex === index;
        const nextTwoMonths = strategy.plan.slice(0, 2); // Get the next 2 months' actions

        return (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                #{index + 1} Strategy
              </h2>
              <button
                onClick={() => deleteStrategy(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
            {strategy.persona && (
              <p className="text-sm text-gray-600 mb-4">
                Based on persona: <span className="font-medium text-gray-800">{strategy.persona}</span>
              </p>
            )}
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <FaDollarSign className="text-green-500" />
                <span className="text-sm text-gray-700">Total Debt Reduction: <span className="font-medium">${strategy.success.SuccessByTheNumbers.DebtReduction}</span></span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <FaCalendarAlt className="text-blue-500" />
                <span className="text-sm text-gray-700">Months to Debt Freedom: <span className="font-medium">{strategy.success.SuccessByTheNumbers.MonthsToDebtFreedom}</span></span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <FaPiggyBank className="text-yellow-500" />
                <span className="text-sm text-gray-700">Total Interest Saved: <span className="font-medium">${strategy.success.SuccessByTheNumbers.TotalInterestSaved}</span></span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <FaChartLine className="text-purple-500" />
                <span className="text-sm text-gray-700">Improved Credit Score Potential: <span className="font-medium">{strategy.impact.improvedCreditScorePotential}</span></span>
              </div>
            </div>

            {/* Next 2 Months Actions Summary */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Next 2 Months Actions</h3>
              {nextTwoMonths.map((month, monthIndex) => (
                <div key={monthIndex} className="mt-4">
                  <h4 className="text-md font-medium text-gray-700">Month {month.month}</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {month.debtDistribution.map((debt, debtIndex) => (
                      <li key={debtIndex} className="mt-2">
                        <FaMoneyBillWave className="inline text-green-500" /> Pay <span className="font-medium">${debt.payment}</span> for <span className="font-medium">{debt.debtType}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <button
              onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
              className="mt-4 w-full flex items-center justify-center gap-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {isExpanded ? (
                <>
                  <FaChevronUp />
                  Hide Details
                </>
              ) : (
                <>
                  <FaChevronDown />
                  Show More
                </>
              )}
            </button>

            {isExpanded && (
              <div className="space-y-4 mt-4">
                <CollapsibleSection title="Debt Repayment Plan">
                  <DebtRepaymentPlan plan={strategy.plan} />
                </CollapsibleSection>

                <CollapsibleSection title="Additional Success Metrics">
                  <AdditionalSuccessMetrics metrics={strategy.success.AdditionalSuccessMetrics} />
                </CollapsibleSection>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}