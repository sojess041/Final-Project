
import { useEffect, useState } from 'react';
import './App.css';

import ScreenStart from './components/ScreenStart';
import ScreenMainGame from './components/ScreenMainGame';
import CharacterList from './components/CharacterList.tsx';
import CharacterReveal from './components/CharacterReveal';
import type { HPDetail } from './types';

//removed export def func app for GuessLog

function App() {
    const [characters, setCharacters] = useState<HPDetail[]>([]);
    const [target, setTarget] = useState<HPDetail | null>(null);
    const [screen, setScreen] = useState<'start' | 'game' | 'characters'>('start');
    const [attempts, setAttempts] = useState<string[]>([]);
    const [result, setResult] = useState<'win' | 'lose' | null>(null);

  const handleGuess = (guess: string) => {
    const normalizedGuess = guess.trim().toLowerCase();
    const correctName = target?.name.toLowerCase();

    const alreadyGuessed = attempts.some(
        (attempt) => attempt.trim().toLowerCase() === normalizedGuess
    );

    if (alreadyGuessed) {
        alert("Can't guess same character");
        return;
    }

    const newAttempts = [...attempts, guess];
    setAttempts(newAttempts);
      if (normalizedGuess === correctName) {
          setResult('win');
      } else if (newAttempts.length >= 5) {
          setResult('lose');
      }
  };

    // fetch characters on mount
  useEffect(() => {
    fetch('https://hp-api.onrender.com/api/characters')
      .then(res => res.json())
      .then((data: HPDetail[]) => {

        const filtered = data.filter(char =>
          char.name &&
          char.house &&
          char.gender &&
          char.yearOfBirth &&
          char.hairColour &&
          char.name !== 'Unknown' &&
          char.house !== 'Unknown' &&
          char.hairColour !== 'Unknown' &&
          char.gender !== 'unknown'
        );
        setCharacters(filtered);
        const random = filtered[Math.floor(Math.random() * filtered.length)];
        setTarget(random);
      });
  }, []);

    const resetGame = () => {
        setAttempts([]);
        setResult(null);
        const random = characters[Math.floor(Math.random() * characters.length)];
        setTarget(random);
        setScreen('game');
    };

    return (
        <div className="App">
            {screen === 'start' && <ScreenStart onStart={() => setScreen('game')} />}

            {screen === 'game' && target && (
                <>
                    <ScreenMainGame
                        target={target}
                        characters={characters}
                        attempts={attempts}
                        result={result}
                        onGuess={handleGuess}
                        onRestart={resetGame}
                    />

                    <button onClick={() => setScreen('characters')}>
                        View All Characters
                    </button>


                    {result && (
                        <>
                            {/* Duplicate win/loss message */}
                            {/* <h2>{result === 'win' ? '🎉 You win!' : '😢 You lost.'}</h2> */}
                            <CharacterReveal character={target} />
                            <button onClick={resetGame}>
                                {result === 'win' ? 'Play again' : 'Try again'}
                            </button>
                        </>
                    )}

                </>
            )}

            {screen === 'characters' && (
                <>
                    <button onClick={() => setScreen('game')}>Back to Game</button>
                    <CharacterList />
                </>
            )}


        </div>
    );

}

export default App;