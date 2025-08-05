// src/components/InputBox.tsx
import React, { useState } from 'react';
import './InputBox.css';


interface InputBoxProps {
    onSubmitGuess: (guess: string) => void;
    onToggleSilhouette: () => void;             //Arielle: for showing silhouette
    silhouetteButtonDisabled: boolean;
    disabled: boolean;
    characterNames: string[];
    placeholder: string;
}

const InputBox: React.FC<InputBoxProps> = ({ onSubmitGuess, disabled, characterNames, placeholder, onToggleSilhouette, silhouetteButtonDisabled }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const guess = input.trim();
        if (!characterNames.map(n => n.toLowerCase()).includes(guess.toLowerCase())) {
            alert('Character not recognized. Try again.');
            return;
        }
        onSubmitGuess(guess);
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginBottom: '20px' }}>
            <input
                type="text"
                placeholder={placeholder || "Guess the character's name"}
                list="char-options"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={disabled}
                style={{ padding: '10px', width: '300px', borderRadius: '8px' }}
            />

            <datalist id="char-options">
                {characterNames.map((name, idx) => (
                    <option key={idx} value={name} />
                ))}
            </datalist>

            <button 
                className='play-button' 
                type="submit" 
                disabled={disabled} 
                style={{ padding: '10px 15px', marginLeft: '10px' }}
            >
                Submit
            </button>

            <button
                className='play-button'
                type="button"
                onClick={onToggleSilhouette}
                disabled={silhouetteButtonDisabled}
                style={{ padding: '10px 15px', marginLeft: '10px' }}
            >
                Show Silhouette
            </button>
        </form>
    );
};

export default InputBox;
