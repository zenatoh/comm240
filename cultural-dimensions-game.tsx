import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const culturalDimensions = [
  { name: "Power Distance", type: "Both", description: "The extent to which less powerful members accept unequal power distribution." },
  { name: "Individualism vs. Collectivism", type: "Both", description: "The degree to which people are integrated into groups." },
  { name: "Masculinity vs. Femininity", type: "Hofstede", description: "The distribution of values between genders." },
  { name: "Uncertainty Avoidance", type: "Both", description: "Society's tolerance for uncertainty and ambiguity." },
  { name: "Long-Term vs. Short-Term Orientation", type: "Hofstede", description: "The extent to which a society maintains links with its past." },
  { name: "Indulgence vs. Restraint", type: "Hofstede", description: "The extent to which people try to control their desires and impulses." },
  { name: "Performance Orientation", type: "GLOBE", description: "The degree to which a society encourages and rewards performance improvement and excellence." },
  { name: "Assertiveness", type: "GLOBE", description: "The degree to which individuals are assertive, confrontational, and aggressive in social relationships." },
  { name: "Future Orientation", type: "GLOBE", description: "The extent to which individuals engage in future-oriented behaviors." },
  { name: "Humane Orientation", type: "GLOBE", description: "The degree to which a society encourages and rewards individuals for being fair, altruistic, and kind to others." },
  { name: "Gender Egalitarianism", type: "GLOBE", description: "The degree to which a society minimizes gender inequality." },
];

const countries = [
  "United States", "Japan", "Germany", "China", "Brazil", "India", "Russia", "France", "Mexico", "South Africa"
];

const CulturalDimensionsGame = () => {
  const [currentDimension, setCurrentDimension] = useState(null);
  const [currentCountry, setCurrentCountry] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 && !gameOver) {
      endGame();
    }
  }, [timer, gameOver]);

  const startGame = () => {
    nextRound();
    setTimer(30);
    setScore(0);
    setRound(0);
    setGameOver(false);
  };

  const nextRound = () => {
    const randomDimension = culturalDimensions[Math.floor(Math.random() * culturalDimensions.length)];
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    setCurrentDimension(randomDimension);
    setCurrentCountry(randomCountry);
    setShowResult(false);
    setRound((prevRound) => prevRound + 1);
  };

  const handleAnswer = (isHigh) => {
    setScore((prevScore) => prevScore + 1);
    setShowResult(true);
    setTimeout(() => {
      if (round < 5) {
        nextRound();
      } else {
        endGame();
      }
    }, 2000);
  };

  const endGame = () => {
    setGameOver(true);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Cultural Dimensions Game</CardTitle>
      </CardHeader>
      <CardContent>
        {!gameOver ? (
          <>
            <div className="mb-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Round: {round}/5</span>
              <span className="text-lg font-semibold">Score: {score}</span>
              <span className="text-lg font-semibold">Time: {timer}s</span>
            </div>
            {currentDimension && (
              <>
                <p className="mb-2 text-lg font-semibold">{currentDimension.name} ({currentDimension.type})</p>
                <p className="mb-4">{currentDimension.description}</p>
                <p className="mb-6 text-lg">
                  Do you think <strong>{currentCountry}</strong> scores high or low on this dimension?
                </p>
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => handleAnswer(true)}>High</Button>
                  <Button onClick={() => handleAnswer(false)}>Low</Button>
                </div>
              </>
            )}
            {showResult && (
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Result</AlertTitle>
                <AlertDescription>
                  Discuss with your partner why you think this might be the case. Consider historical, social, and economic factors.
                </AlertDescription>
              </Alert>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl mb-6">Your Score: {score} out of 5</p>
            <Button onClick={startGame}>Play Again</Button>
          </div>
        )}
        {!currentDimension && !gameOver && (
          <div className="text-center">
            <Button onClick={startGame}>Start Game</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CulturalDimensionsGame;
