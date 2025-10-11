import React, { useState } from 'react';

interface PayoffCellProps {
  youScore: number;
  teammateScore: number;
  scenario: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const PayoffCell: React.FC<PayoffCellProps> = ({
  youScore,
  teammateScore,
  scenario,
  isHovered,
  onHover,
  onLeave,
}) => {
  const getCellColor = () => {
    if (youScore === 5)
      return 'bg-green-100 border-green-300 hover:bg-green-200';
    if (youScore === 3) return 'bg-blue-100 border-blue-300 hover:bg-blue-200';
    if (youScore === 1) return 'bg-red-100 border-red-300 hover:bg-red-200';
    return 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200';
  };

  return (
    <div
      className={`p-4 border-2 cursor-pointer transition-all duration-200 rounded-lg ${getCellColor()} ${
        isHovered ? 'shadow-lg' : 'hover:shadow-md'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="text-sm font-medium text-gray-600 mb-2">{scenario}</div>
      <div className="space-y-1">
        <div className="text-lg font-bold text-blue-600">You: {youScore}</div>
        <div className="text-lg font-bold text-purple-600">
          Teammate: {teammateScore}
        </div>
      </div>
    </div>
  );
};

const SprintPayoffMatrix: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const scenarios = {
    'clean-clean': {
      youScore: 3,
      teammateScore: 3,
      scenario: 'Both Write Clean Code',
      explanation:
        'Perfect collaboration! Both of you produce maintainable, well-tested code. The project is stable, velocity is consistent, and you both get positive performance reviews. This is the ideal outcome, but requires mutual trust and commitment to quality.',
    },
    'corners-clean': {
      youScore: 5,
      teammateScore: 0,
      scenario: 'You Cut Corners, They Write Clean',
      explanation:
        'You ship your feature fast and look like a hero to management. Meanwhile, your teammate works late nights debugging integration issues caused by your shortcuts. You get the glory, they get the blame. This is the "temptation" payoff that makes defection attractive.',
    },
    'clean-corners': {
      youScore: 0,
      teammateScore: 5,
      scenario: 'You Write Clean, They Cut Corners',
      explanation:
        "You do the right thing and write quality code, but your teammate's shortcuts cause integration problems that you have to fix. They ship fast and get credited for velocity while you're stuck cleaning up their mess. This is the \"sucker's payoff\" that makes cooperation risky.",
    },
    'corners-corners': {
      youScore: 1,
      teammateScore: 1,
      scenario: 'Both Cut Corners',
      explanation:
        "Integration hell! Both of you ship quickly in isolation, but when it's time to integrate, everything breaks. You spend the final days before deadline frantically debugging compatibility issues. Both of you look bad, the release is delayed, and technical debt compounds for future sprints.",
    },
  };

  const getExplanation = () => {
    if (!hoveredCell) {
      return 'Hover over any cell to see what happens in that scenario. Notice how the individual incentive to cut corners leads to a collective problem when both players follow the same logic.';
    }
    return scenarios[hoveredCell as keyof typeof scenarios].explanation;
  };

  return (
    <div className="my-8 p-6 rounded-xl border border-gray-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        The Sprint Payoff Matrix
      </h3>
      <p className="text-gray-600 mb-6 text-center">
        Impact Score = Performance Review Points (Higher is Better)
      </p>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-3 gap-4 min-w-[600px]">
          {/* Header row */}
          <div></div>
          <div className="text-center font-bold text-purple-600 py-2">
            Teammate Writes Clean Code
          </div>
          <div className="text-center font-bold text-purple-600 py-2">
            Teammate Cuts Corners
          </div>

          {/* Your Clean Code row */}
          <div className="font-bold text-blue-600 flex items-center justify-end pr-4">
            You Write Clean Code
          </div>
          <PayoffCell
            {...scenarios['clean-clean']}
            isHovered={hoveredCell === 'clean-clean'}
            onHover={() => setHoveredCell('clean-clean')}
            onLeave={() => setHoveredCell(null)}
          />
          <PayoffCell
            {...scenarios['clean-corners']}
            isHovered={hoveredCell === 'clean-corners'}
            onHover={() => setHoveredCell('clean-corners')}
            onLeave={() => setHoveredCell(null)}
          />

          {/* Your Cut Corners row */}
          <div className="font-bold text-blue-600 flex items-center justify-end pr-4">
            You Cut Corners
          </div>
          <PayoffCell
            {...scenarios['corners-clean']}
            isHovered={hoveredCell === 'corners-clean'}
            onHover={() => setHoveredCell('corners-clean')}
            onLeave={() => setHoveredCell(null)}
          />
          <PayoffCell
            {...scenarios['corners-corners']}
            isHovered={hoveredCell === 'corners-corners'}
            onHover={() => setHoveredCell('corners-corners')}
            onLeave={() => setHoveredCell(null)}
          />
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-2">Scenario Analysis:</h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          {getExplanation()}
        </p>
      </div>

      <div className="mt-4 p-4  rounded-lg">
        <div className="font-bold text-purple-800 mb-2">🎯 Key Insight:</div>
        <p className="text-purple-700 text-sm">
          The dominant strategy is to &ldquo;Cut Corners&rdquo; because it gives
          you the best outcome regardless of what your teammate does (5 vs 0, or
          1 vs 3). But when both players follow this logic, you end up with the
          worst collective outcome (1,1) instead of the optimal (3,3).
        </p>
      </div>
    </div>
  );
};

export default SprintPayoffMatrix;
