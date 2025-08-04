import InputBox from './InputBox';
import GuessLog from './GuessLog';
import type { HPDetail } from '../types';
import './ScrM.css';


interface GameScreenProps {
    target: HPDetail;
    characters: HPDetail[];
    attempts: string[];
    result: 'win' | 'lose' | null;
    onGuess: (guess: string) => void;
    onRestart: () => void;
}

const ScreenMainGame: React.FC<GameScreenProps> = ({
    target,
    characters,
    attempts,
    result,
    onGuess,
    onRestart,
}) => (
    <div className={"game-screen"}>
        <h1 className="start-title">Harry Potter Guessing Game</h1>
        <InputBox
            onSubmitGuess={onGuess}
            characterNames={characters.map((c) => c.name)}
            disabled={result !== null}
            placeholder={result ? "Game Over!" : "Guess the character's name: "}
        />

        <GuessLog
            targetCharacter={target}
            characters={characters}
            attempts={attempts}
        />

        {result === 'win' && target && (
            <h2>
                🎉 You win! The character was {target.name}.{' '}
                <button onClick={onRestart}>Play again</button>
            </h2>
        )}

        {result === 'lose' && target && (
            <h2>
                😢 You lost. The correct answer was {target.name}.{' '}
                <button onClick={onRestart}>Try again</button>
            </h2>
        )}


    </div>
)

export default ScreenMainGame;