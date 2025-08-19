import React, { useState, useCallback, useMemo } from 'react';

interface Strategy {
  name: string;
  shortName: string;
  description: string;
  color: string;
  score: number;
  behavior: (history: Array<'cooperate' | 'defect'>) => 'cooperate' | 'defect';
}

interface TournamentResult {
  strategy: string;
  score: number;
  round: number;
}

const EngineeringOrgTournament: React.FC = () => {
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([
    'idealist',
    'cowboy',
    'pragmatist',
    'grudger',
    'forgiving',
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [results, setResults] = useState<TournamentResult[]>([]);
  const [finalResults, setFinalResults] = useState<Strategy[]>([]);

  const strategies: Record<string, Strategy> = useMemo(
    () => ({
      idealist: {
        name: 'The Idealist',
        shortName: 'Idealist',
        description: 'Always writes clean code',
        color: '#10B981',
        score: 0,
        behavior: () => 'cooperate',
      },
      cowboy: {
        name: 'The Cowboy Coder',
        shortName: 'Cowboy',
        description: 'Always cuts corners',
        color: '#EF4444',
        score: 0,
        behavior: () => 'defect',
      },
      pragmatist: {
        name: 'The Pragmatist',
        shortName: 'Pragmatist',
        description: 'Tit-for-Tat strategy',
        color: '#3B82F6',
        score: 0,
        behavior: (history: Array<'cooperate' | 'defect'>) =>
          history.length === 0 ? 'cooperate' : history[history.length - 1],
      },
      grudger: {
        name: 'The Grudger',
        shortName: 'Grudger',
        description: 'Punishes defection forever',
        color: '#8B5CF6',
        score: 0,
        behavior: (history: Array<'cooperate' | 'defect'>) =>
          history.includes('defect') ? 'defect' : 'cooperate',
      },
      forgiving: {
        name: 'The Forgiving Pragmatist',
        shortName: 'Forgiving',
        description: 'Tit-for-Tat but forgives occasionally',
        color: '#F59E0B',
        score: 0,
        behavior: (history: Array<'cooperate' | 'defect'>) => {
          if (history.length === 0) return 'cooperate';
          // 10% chance to forgive after being defected against
          if (history[history.length - 1] === 'defect' && Math.random() < 0.1) {
            return 'cooperate';
          }
          return history[history.length - 1];
        },
      },
      random: {
        name: 'The Random Engineer',
        shortName: 'Random',
        description: 'Makes random choices',
        color: '#6B7280',
        score: 0,
        behavior: () => (Math.random() < 0.5 ? 'cooperate' : 'defect'),
      },
    }),
    []
  );

  const getPayoff = (
    choice1: 'cooperate' | 'defect',
    choice2: 'cooperate' | 'defect'
  ): [number, number] => {
    if (choice1 === 'cooperate' && choice2 === 'cooperate') return [3, 3];
    if (choice1 === 'defect' && choice2 === 'cooperate') return [5, 0];
    if (choice1 === 'cooperate' && choice2 === 'defect') return [0, 5];
    return [1, 1];
  };

  const playMatch = useCallback(
    (
      strategy1: string,
      strategy2: string,
      rounds: number = 50
    ): [number, number] => {
      const s1 = strategies[strategy1];
      const s2 = strategies[strategy2];
      const history1: Array<'cooperate' | 'defect'> = [];
      const history2: Array<'cooperate' | 'defect'> = [];
      let score1 = 0;
      let score2 = 0;

      for (let i = 0; i < rounds; i++) {
        const choice1 = s1.behavior(history2.slice()); // Player 1 sees Player 2's history
        const choice2 = s2.behavior(history1.slice()); // Player 2 sees Player 1's history

        history1.push(choice1);
        history2.push(choice2);

        const [points1, points2] = getPayoff(choice1, choice2);
        score1 += points1;
        score2 += points2;
      }

      return [score1, score2];
    },
    [strategies]
  );

  const runTournament = useCallback(async () => {
    if (selectedStrategies.length < 2) return;

    setIsRunning(true);
    setCurrentRound(0);
    setResults([]);
    setFinalResults([]);

    // Initialize scores
    const tournamentStrategies = selectedStrategies.map(key => ({
      ...strategies[key],
      score: 0,
    }));

    const allResults: TournamentResult[] = [];
    let round = 0;

    // Round-robin tournament
    for (let i = 0; i < selectedStrategies.length; i++) {
      for (let j = i + 1; j < selectedStrategies.length; j++) {
        const strategy1 = selectedStrategies[i];
        const strategy2 = selectedStrategies[j];

        // Play multiple matches between these strategies
        for (let match = 0; match < 5; match++) {
          const [score1, score2] = playMatch(strategy1, strategy2);

          tournamentStrategies[i].score += score1;
          tournamentStrategies[j].score += score2;

          round++;
          setCurrentRound(round);

          // Add intermediate results for animation
          const currentResults = tournamentStrategies
            .map(s => ({
              strategy: s.shortName,
              score: s.score,
              round,
            }))
            .sort((a, b) => b.score - a.score);

          allResults.push(...currentResults);
          setResults([...allResults]);

          // Delay for animation effect
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }

    // Final results
    const final = tournamentStrategies.sort((a, b) => b.score - a.score);
    setFinalResults(final);
    setIsRunning(false);
  }, [selectedStrategies, strategies, playMatch]);

  const resetTournament = () => {
    setCurrentRound(0);
    setResults([]);
    setFinalResults([]);
    setIsRunning(false);
  };

  const toggleStrategy = (strategyKey: string) => {
    setSelectedStrategies(prev =>
      prev.includes(strategyKey)
        ? prev.filter(s => s !== strategyKey)
        : [...prev, strategyKey]
    );
  };

  const getCurrentScores = () => {
    if (results.length === 0) return [];

    const latestRound = Math.max(...results.map(r => r.round));
    return results
      .filter(r => r.round === latestRound)
      .sort((a, b) => b.score - a.score);
  };

  return (
    <div className="my-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Engineering Organization Tournament
      </h3>
      <p className="text-gray-600 mb-6 text-center">
        Watch different strategies compete in a round-robin tournament
      </p>

      {/* Strategy Selection */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-800 mb-3">Select Strategies:</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(strategies).map(([key, strategy]) => (
            <label
              key={key}
              className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selectedStrategies.includes(key)}
                onChange={() => toggleStrategy(key)}
                className="rounded"
                aria-label={strategy.shortName}
              />
              <div className="flex-1 flex items-center">
                <div
                  className="w-4 h-4 rounded-full inline-block mr-2"
                  style={{ backgroundColor: strategy.color }}
                  aria-hidden="true"
                ></div>
                <span className="text-sm font-medium">
                  {strategy.shortName}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={runTournament}
          disabled={isRunning || selectedStrategies.length < 2}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isRunning ? 'Running...' : 'Start Tournament'}
        </button>
        <button
          onClick={resetTournament}
          disabled={isRunning}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Progress */}
      {isRunning && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-800 font-medium">
              Tournament Progress
            </span>
            <span className="text-blue-600">Round {currentRound}</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentRound / (selectedStrategies.length * (selectedStrategies.length - 1) * 2.5)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Live Results */}
      {getCurrentScores().length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-800 mb-3">Current Standings:</h4>
          <div className="space-y-2">
            {getCurrentScores().map((result, index) => {
              const strategy = Object.values(strategies).find(
                s => s.shortName === result.strategy
              );
              const maxScore = Math.max(
                ...getCurrentScores().map(r => r.score)
              );
              const barWidth =
                maxScore > 0 ? (result.score / maxScore) * 100 : 0;

              return (
                <div
                  key={result.strategy}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 text-center font-bold text-gray-600">
                    #{index + 1}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg overflow-hidden">
                    <div
                      className="h-8 flex items-center px-3 text-white font-medium transition-all duration-500"
                      style={{
                        backgroundColor: strategy?.color,
                        width: `${Math.max(barWidth, 15)}%`,
                      }}
                    >
                      <span className="text-sm">{result.strategy}</span>
                    </div>
                  </div>
                  <div className="w-16 text-right font-bold text-gray-800">
                    {result.score}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Final Results */}
      {finalResults.length > 0 && !isRunning && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-bold text-green-800 mb-3">
            🏆 Tournament Complete!
          </h4>
          <div className="space-y-2">
            {finalResults.map((strategy, index) => (
              <div
                key={strategy.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">
                    {index === 0
                      ? '🥇'
                      : index === 1
                        ? '🥈'
                        : index === 2
                          ? '🥉'
                          : `#${index + 1}`}
                  </span>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: strategy.color }}
                  ></div>
                  <span className="font-medium">{strategy.shortName}</span>
                </div>
                <span className="font-bold text-green-700">
                  {strategy.score} points
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <h4 className="font-bold text-purple-800 mb-2">
          🔍 What to Watch For:
        </h4>
        <ul className="text-purple-700 text-sm space-y-1">
          <li>
            • Notice how the Cowboy Coder starts strong but often falls behind
          </li>
          <li>
            • The Pragmatist consistently performs well against most strategies
          </li>
          <li>• Cooperative strategies tend to cluster at the top over time</li>
          <li>
            • Random strategies show the importance of consistent behavior
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EngineeringOrgTournament;
