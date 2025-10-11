import React, { useState, useCallback } from 'react';

interface GameState {
  sprint: number;
  yourScore: number;
  teammateScore: number;
  history: Array<{
    sprint: number;
    yourChoice: 'cooperate' | 'defect';
    teammateChoice: 'cooperate' | 'defect';
    yourPoints: number;
    teammatePoints: number;
  }>;
}

type Strategy = 'idealist' | 'cowboy' | 'pragmatist' | 'grudger';

interface StrategyInfo {
  name: string;
  description: string;
  behavior: string;
}

const strategies: Record<Strategy, StrategyInfo> = {
  idealist: {
    name: 'The Idealist',
    description: 'Always writes clean code, no matter what',
    behavior: 'Always Cooperates',
  },
  cowboy: {
    name: 'The Cowboy Coder',
    description: 'Always cuts corners to ship faster',
    behavior: 'Always Defects',
  },
  pragmatist: {
    name: 'The Pragmatist',
    description: 'Starts with clean code, then mirrors your last move',
    behavior: 'Tit-for-Tat',
  },
  grudger: {
    name: 'The Grudger',
    description: 'Cooperates until you defect once, then never forgives',
    behavior: 'Punishes Forever',
  },
};

const ProjectLifecycleSimulation: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] =
    useState<Strategy>('pragmatist');
  const [gameState, setGameState] = useState<GameState>({
    sprint: 1,
    yourScore: 0,
    teammateScore: 0,
    history: [],
  });
  const [gameComplete, setGameComplete] = useState(false);

  const getTeammateChoice = useCallback(
    (
      strategy: Strategy,
      history: GameState['history']
    ): 'cooperate' | 'defect' => {
      switch (strategy) {
        case 'idealist':
          return 'cooperate';
        case 'cowboy':
          return 'defect';
        case 'pragmatist':
          if (history.length === 0) return 'cooperate';
          return history[history.length - 1].yourChoice;
        case 'grudger':
          if (history.some(round => round.yourChoice === 'defect')) {
            return 'defect';
          }
          return 'cooperate';
        default:
          return 'cooperate';
      }
    },
    []
  );

  const getPayoff = (
    yourChoice: 'cooperate' | 'defect',
    teammateChoice: 'cooperate' | 'defect'
  ) => {
    if (yourChoice === 'cooperate' && teammateChoice === 'cooperate') {
      return { you: 3, teammate: 3 };
    }
    if (yourChoice === 'defect' && teammateChoice === 'cooperate') {
      return { you: 5, teammate: 0 };
    }
    if (yourChoice === 'cooperate' && teammateChoice === 'defect') {
      return { you: 0, teammate: 5 };
    }
    return { you: 1, teammate: 1 };
  };

  const makeChoice = (yourChoice: 'cooperate' | 'defect') => {
    if (gameComplete) return;

    const teammateChoice = getTeammateChoice(
      selectedStrategy,
      gameState.history
    );
    const payoff = getPayoff(yourChoice, teammateChoice);

    const newRound = {
      sprint: gameState.sprint,
      yourChoice,
      teammateChoice,
      yourPoints: payoff.you,
      teammatePoints: payoff.teammate,
    };

    const newGameState = {
      sprint: gameState.sprint + 1,
      yourScore: gameState.yourScore + payoff.you,
      teammateScore: gameState.teammateScore + payoff.teammate,
      history: [...gameState.history, newRound],
    };

    setGameState(newGameState);

    if (newGameState.sprint > 10) {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setGameState({
      sprint: 1,
      yourScore: 0,
      teammateScore: 0,
      history: [],
    });
    setGameComplete(false);
  };

  const getChoiceColor = (choice: 'cooperate' | 'defect') => {
    return choice === 'cooperate' ? 'text-green-600' : 'text-red-600';
  };

  const getChoiceIcon = (choice: 'cooperate' | 'defect') => {
    return choice === 'cooperate' ? '🤝' : '⚡';
  };

  const getChoiceText = (choice: 'cooperate' | 'defect') => {
    return choice === 'cooperate' ? 'Clean Code' : 'Cut Corners';
  };

  return (
    <div className="my-8 p-6 rounded-xl border border-gray-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Project Lifecycle Simulation
      </h3>
      <p className="text-gray-600 mb-6 text-center">
        Play 10 sprints against different engineering archetypes
      </p>

      {/* Strategy Selection */}
      <div className="mb-6">
        <label
          htmlFor="strategy-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Choose your AI teammate:
        </label>
        <select
          id="strategy-select"
          value={selectedStrategy}
          onChange={e => {
            setSelectedStrategy(e.target.value as Strategy);
            resetGame();
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {Object.entries(strategies).map(([key, strategy]) => (
            <option key={key} value={key}>
              {strategy.name} - {strategy.description}
            </option>
          ))}
        </select>
        <div className="mt-2 p-3 rounded-lg">
          <span className="text-sm text-gray-600">
            <strong>Strategy:</strong> {strategies[selectedStrategy].behavior}
          </span>
        </div>
      </div>

      {/* Game Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {gameComplete ? '10' : gameState.sprint}
          </div>
          <div className="text-sm text-gray-600">Sprint</div>
        </div>
        <div className="text-center p-4  rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {gameState.yourScore}
          </div>
          <div className="text-sm text-gray-600">Your Score</div>
        </div>
        <div className="text-center p-4  rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {gameState.teammateScore}
          </div>
          <div className="text-sm text-gray-600">Teammate Score</div>
        </div>
      </div>

      {/* Action Buttons */}
      {!gameComplete && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => makeChoice('cooperate')}
            className="p-4 bg-green-100 hover:bg-green-200 border-2 border-green-300 rounded-lg transition-colors"
          >
            <div className="text-2xl mb-2">🤝</div>
            <div className="font-bold text-green-800">Write Clean Code</div>
            <div className="text-sm text-green-600">
              Take time to do it right
            </div>
          </button>
          <button
            onClick={() => makeChoice('defect')}
            className="p-4 bg-red-100 hover:bg-red-200 border-2 border-red-300 rounded-lg transition-colors"
          >
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-bold text-red-800">Cut Corners</div>
            <div className="text-sm text-red-600">Ship fast, fix later</div>
          </button>
        </div>
      )}

      {/* Game Complete */}
      {gameComplete && (
        <div className="mb-6 p-4 rounded-lg text-center">
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            Project Complete!
          </h4>
          <p className="text-gray-600 mb-4">
            {gameState.yourScore > gameState.teammateScore
              ? 'You had higher individual performance, but was it sustainable?'
              : gameState.yourScore < gameState.teammateScore
                ? 'Your teammate scored higher this time. What could you do differently?'
                : 'You tied! This might be the most stable long-term outcome.'}
          </p>
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}

      {/* History */}
      {gameState.history.length > 0 && (
        <div className="mt-6">
          <h4 className="font-bold text-gray-800 mb-4">Sprint History</h4>
          <div className="space-y-2">
            {gameState.history.slice(-5).map(round => (
              <div
                key={round.sprint}
                className="flex items-center justify-between p-3 rounded-lg text-sm"
              >
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Sprint {round.sprint}:</span>
                  <span className={getChoiceColor(round.yourChoice)}>
                    {getChoiceIcon(round.yourChoice)} You:{' '}
                    {getChoiceText(round.yourChoice)}
                  </span>
                  <span className={getChoiceColor(round.teammateChoice)}>
                    {getChoiceIcon(round.teammateChoice)} Them:{' '}
                    {getChoiceText(round.teammateChoice)}
                  </span>
                </div>
                <div className="text-gray-600">
                  You: +{round.yourPoints}, Them: +{round.teammatePoints}
                </div>
              </div>
            ))}
            {gameState.history.length > 5 && (
              <div className="text-center text-gray-500 text-sm">
                ... and {gameState.history.length - 5} more sprints
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-purple-300/40 border border-purple-200 rounded-lg">
        <h4 className="font-bold text-purple-900 mb-2">💡 What to Notice:</h4>
        <ul className="text-purple-800 text-sm space-y-1">
          <li>• How does each strategy make you feel as a teammate?</li>
          <li>• Which strategies encourage you to cooperate?</li>
          <li>• What happens when you try to exploit different archetypes?</li>
          <li>• How does the relationship evolve over multiple sprints?</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectLifecycleSimulation;
