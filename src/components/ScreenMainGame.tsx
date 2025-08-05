import React, { useState, useEffect } from 'react';
import InputBox from './InputBox';
import GuessLog from './GuessLog';
import SilhouetteHint from './SilhouetteHint';
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
}) => {
    const [showSilhouette, setShowSilhouette] = useState(false);
    const [silhouetteError, setSilhouetteError] = useState('');


    useEffect(() => {
        if (result) {
            setShowSilhouette(false);
        }
    }, [result]);

    const handleToggleSilhouette = () => {
        if (attempts.length < 4) {
            setSilhouetteError('❌ You need at least 4 guesses to unlock the silhouette.');
            return;
        }
        setShowSilhouette(prev => !prev);
        setSilhouetteError(''); // clear error on success
    };

    const disableSilhouetteButton = result !== null || attempts.length < 4;

    return (
        <div className={"game-screen"}>
            <h1 className="start-title">Harry Potter Guessing Game</h1>

            <InputBox
                onSubmitGuess={onGuess}
                characterNames={characters.map((c) => c.name)}
                disabled={result !== null}
                placeholder={result ? "Game Over!" : "Guess the character's name: "}
                onToggleSilhouette={handleToggleSilhouette}
                silhouetteButtonDisabled={disableSilhouetteButton}
            />

            <GuessLog
                targetCharacter={target}
                characters={characters}
                attempts={attempts}
            />

            {showSilhouette && (
                <SilhouetteHint
                    imageUrl={target.image || 'https://via.placeholder.come/150'}
                    show = {true}
                />
            )}

            {silhouetteError && (
                <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                    {silhouetteError}
                </p>
            )}

            {result === 'win' && target && (
                <h2>
                    🎉 You win! The character was {target.name}.{' '}
                </h2>
            )}

            {result === 'lose' && target && (
                <h2>
                    😢 You lost. The correct answer was {target.name}.{' '}
                </h2>
            )}


        </div>
    );
};


export default ScreenMainGame;