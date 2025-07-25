import CharacterList from './CharacterList';
import './App.css'; 

//importing for GuessLog component 
import { useEffect, useState } from 'react';
import GuessLog from './components/GuessLog';
import type { HPDetail } from './types';

//removed expoert def func app for GuessLog

function App() {
  const [characters, setCharacters] = useState<HPDetail[]>([]);
  const [target, setTarget] = useState<HPDetail | null>(null);
  const [screen, setScreen] = useState<'game' | 'win' | 'lose'>('game');
  

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
        <GuessLog
        targetCharacter={target}
        characters={characters}  // 👈 add this line
        onWin={() => setScreen('win')}
        onLose={() => setScreen('lose')}
      />
      )}

      {screen === 'win' && (
        <h2>
          🎉 You win! <button onClick={() => window.location.reload()}>Play again</button>
        </h2>
      )}

      {screen === 'lose' && (
        <h2>
          😢 You lost. <button onClick={() => window.location.reload()}>Try again</button>
        </h2>
      )}

      <hr />

      {/* Optional: show full character list below */}
      <CharacterList />
    </div>
  );
}

export default App;