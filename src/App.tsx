import CharacterList from './CharacterList';
import './App.css';
import InputBox from './components/InputBox';

//importing for GuessLog component 
import { useEffect, useState } from 'react';
import GuessLog from './components/GuessLog';
import type { HPDetail } from './types';

//removed export def func app for GuessLog

function App() {
  const [characters, setCharacters] = useState<HPDetail[]>([]);
  const [target, setTarget] = useState<HPDetail | null>(null);
  const [screen, setScreen] = useState<'game' | 'win' | 'lose'>('game');
  const [attempts, setAttempts] = useState<string[]>([]);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);

  const handleGuess = (guess: string) => {
    const normalizedGuess = guess.trim().toLowerCase();
    const correctName = target?.name.toLowerCase();

    const newAttempts = [...attempts, guess];
    setAttempts(newAttempts);

    if (normalizedGuess === correctName) {
        setResult('win');
        setScreen('win');
    } else if (newAttempts.length >= 5) {
        setResult('lose');
        setScreen('lose');
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
          char.ancestry &&
          char.patronus &&
          char.name !== 'Unknown' &&
          char.house !== 'Unknown' &&
          char.hairColour !== 'Unknown' &&
          char.gender !== 'unknown'
        );
        setCharacters(filtered);
        const random = data[Math.floor(Math.random() * data.length)];
        setTarget(random);
      });
  }, []);

    return (
        <div className="App">
            <h1>Harry Potter Guessing Game</h1>

            {screen === 'game' && target && (
                <>
                    <InputBox
                        onSubmitGuess={handleGuess}
                        characterNames={characters.map(c => c.name)}
                        disabled={result !== null}
                    />

                    <GuessLog
                        targetCharacter={target}
                        characters={characters}
                        attempts={attempts}
                    />
                </>
            )}

            {screen === 'win' && target && (
                <h2>
                    🎉 You win! The character was {target.name}.{' '}
                    <button onClick={() => window.location.reload()}>Play again</button>
                </h2>
            )}

            {screen === 'lose' && target && (
                <h2>
                    😢 You lost. The correct answer was {target.name}.{' '}
                    <button onClick={() => window.location.reload()}>Try again</button>
                </h2>
            )}

            <hr />

            <CharacterList />
        </div>
    );

}

export default App;