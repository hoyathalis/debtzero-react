import React, { useState } from 'react';
import {
  FaDollarSign,
  FaCalendarAlt,
  FaPiggyBank,
  FaChartLine,
  FaMoneyBillWave,
  FaChevronDown,
  FaChevronUp,
  FaTrash,
  FaCheckCircle,
  FaExclamationTriangle,
  FaGraduationCap,
  FaHome,
} from 'react-icons/fa';

interface StrategyOverviewProps {
  strategies: Strategy[];
  expandedIndex: number;
  setExpandedIndex: (value: number) => void;
  deleteStrategy: (index: number) => void;
}

interface Strategy {
  persona?: string;
  success: {
    SuccessByTheNumbers: {
      DebtReduction: number;
      MonthsToDebtFreedom: number;
      TotalInterestSaved: number;
    };
    AdditionalSuccessMetrics: {
      CreditScoreIncrease: number;
      TotalDebtPaidOff: number;
      MonthsToDebtFreedom: number;
      MonthlyCashFlowIncrease: number;
      AverageInterestRateReduction: number;
    };
  };
  impact: {
    improvedCreditScorePotential: number;
  };
  plan: PlanPhase[];
}

interface PlanPhase {
  month: number;
  startingDebt: number;
  allocatedAmountForDebt: number;
  remainingDebt: number;
  totalInterestPaid: number;
  actions: string;
  debtDistribution: Debt[];
}

interface Debt {
  debtType: string;
  interestRate: number;
  payment: number;
  endingBalance: number;
  notes: string;
}

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

interface DebtDistributionProps {
  debt: Debt;
}

interface DebtRepaymentPlanProps {
  plan: PlanPhase[];
}

interface AdditionalSuccessMetricsProps {
  metrics: Strategy['success']['AdditionalSuccessMetrics'];
}

// Collapsible Section Component
const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-gray-200 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
      >
        <h4 className="text-md font-medium text-gray-700">{title}</h4>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

// Debt Distribution Component
const DebtDistribution: React.FC<DebtDistributionProps> = ({ debt }) => (
  <div className="mt-2">
    <p className="text-sm text-gray-600">
      <span className="font-medium">{debt.debtType}</span>: ${debt.payment} per month
    </p>
  </div>
);

// Debt Repayment Plan Component
const DebtRepaymentPlan: React.FC<DebtRepaymentPlanProps> = ({ plan }) => (
  <div>
    {plan.map((phase, index) => (
      <div key={index} className="p-4 bg-gray-50 rounded-md mt-2">
        <p className="text-sm font-medium text-gray-700">Month {phase.month}</p>
        <p className="text-sm text-gray-600">
          Starting Debt: <span className="font-medium">${phase.startingDebt}</span>
        </p>
        <p className="text-sm text-gray-600">
          Allocated Amount: <span className="font-medium">${phase.allocatedAmountForDebt}</span>
        </p>
        <p className="text-sm text-gray-600">
          Remaining Debt: <span className="font-medium">${phase.remainingDebt}</span>
        </p>
        <p className="text-sm text-gray-600">
          Total Interest Paid: <span className="font-medium">${phase.totalInterestPaid}</span>
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-600 mt-2">
          <FaMoneyBillWave className="text-green-500" />
          <span className="font-medium">{phase.actions}</span>
        </p>
        <div className="mt-2">
          <h5 className="text-sm font-medium text-gray-700">Debt Distribution</h5>
          {phase.debtDistribution.map((debt, debtIndex) => (
            <DebtDistribution key={debtIndex} debt={debt} />
          ))}
        </div>
        <div className="mt-2">
          <h5 className="text-sm font-medium text-gray-700">Monthly Payment Breakdown</h5>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {phase.debtDistribution.map((debt, i) => (
              <li key={i}>
                Pay <span className="font-medium">${debt.payment}</span> for{' '}
                <span className="font-medium">{debt.debtType}</span>
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
    <li>
      Credit Score Increase: <span className="font-medium">{metrics.CreditScoreIncrease}</span>
    </li>
    <li>
      Total Debt Paid Off: <span className="font-medium">${metrics.TotalDebtPaidOff}</span>
    </li>
    <li>
      Months to Debt Freedom: <span className="font-medium">{metrics.MonthsToDebtFreedom}</span>
    </li>
    <li>
      Monthly Cash Flow Increase: <span className="font-medium">${metrics.MonthlyCashFlowIncrease}</span>
    </li>
    <li>
      Average Interest Rate Reduction: <span className="font-medium">{metrics.AverageInterestRateReduction}</span>
    </li>
  </ul>
);

// Updated Action Item Component
interface ActionItemProps {
  month: number;
  debts: Debt[];
}

const ActionItem: React.FC<ActionItemProps> = ({ month, debts }) => {
  const totalPayment = debts.reduce((total, debt) => total + debt.payment, 0);

  return (
    <div className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium text-gray-700">Month {month}</h4>
        <span className="text-sm text-gray-600">Total: ${totalPayment.toLocaleString()}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {debts.map((debt, index) => (
          <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm text-gray-700">
            {getDebtIcon(debt.debtType)}
            <span>{debt.debtType}: ${debt.payment.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get icons based on debt type
const getDebtIcon = (debtType: string) => {
  switch (debtType.toLowerCase()) {
    case 'credit card':
      return <FaExclamationTriangle className="text-yellow-500" />;
    case 'student loan':
      return <FaGraduationCap className="text-blue-500" />;
    case 'mortgage':
      return <FaHome className="text-indigo-500" />;
    default:
      return <FaCheckCircle className="text-green-500" />;
  }
};

// Main Component
export default function StrategyOverview({
  strategies,
  expandedIndex,
  setExpandedIndex,
  deleteStrategy,
}: StrategyOverviewProps) {
  return (
    <div className="flex flex-col gap-6">
      {strategies.map((strategy, index) => {
        const isExpanded = expandedIndex === index;
        const nextThreeMonths = strategy.plan.slice(0, 3); // Get the next 3 months' actions

        return (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Strategy #{index + 1}</h2>
              <button
                onClick={() => deleteStrategy(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Delete Strategy"
              >
                <FaTrash />
              </button>
            </div>

            {strategy.persona && (
              <p className="text-sm text-gray-600 mb-4">
                Based on persona:{' '}
                <span className="font-medium text-gray-800">{strategy.persona}</span>
              </p>
            )}

            {/* Actions Section */}
            <div className="bg-blue-50 p-6 rounded-md shadow-inner">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">Strategy for next quarter:</h3>
              {/* 3 Months Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {nextThreeMonths.map((month, monthIndex) => (
                  <ActionItem key={monthIndex} month={month.month} debts={month.debtDistribution} />
                ))}
              </div>
            </div>

            {/* Impacts Section */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-md shadow-sm">
                <FaDollarSign className="text-green-600" size={20} />
                <span className="text-sm text-gray-700">
                  Total Debt Reduction:{' '}
                  <span className="font-medium">${strategy.success.SuccessByTheNumbers.DebtReduction.toLocaleString()}</span>
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-md shadow-sm">
                <FaCalendarAlt className="text-yellow-500" size={20} />
                <span className="text-sm text-gray-700">
                  Months to Debt Freedom:{' '}
                  <span className="font-medium">{strategy.success.SuccessByTheNumbers.MonthsToDebtFreedom}</span>
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-md shadow-sm">
                <FaPiggyBank className="text-purple-500" size={20} />
                <span className="text-sm text-gray-700">
                  Total Interest Saved:{' '}
                  <span className="font-medium">${strategy.success.SuccessByTheNumbers.TotalInterestSaved.toLocaleString()}</span>
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-md shadow-sm">
                <FaChartLine className="text-indigo-500" size={20} />
                <span className="text-sm text-gray-700">
                  Improved Credit Score:{' '}
                  <span className="font-medium">{strategy.impact.improvedCreditScorePotential}</span>
                </span>
              </div>
            </div>

            {/* Toggle More Details */}
            <button
              onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
              className="mt-6 w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* More Details Section */}
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
