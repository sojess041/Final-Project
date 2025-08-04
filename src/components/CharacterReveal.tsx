// src/components/CharacterReveal.tsx
import React from 'react';
import type { HPDetail } from '../types';

interface CharacterRevealProps {
    character: HPDetail;
}

const CharacterReveal: React.FC<CharacterRevealProps> = ({ character }) => {
    return (
        <div className="character-reveal-box">
            <img
                src={character.image || 'https://via.placeholder.com/150'}
                alt={character.name}
                className="character-image"
            />

            <div className="character-info">
                <h2>{character.name}</h2>
                <p><strong>House:</strong> {character.house}</p>
                <p><strong>Gender:</strong> {character.gender}</p>
                <p><strong>Birth Year:</strong> {character.yearOfBirth}</p>
                <p><strong>Hair Colour:</strong> {character.hairColour}</p>
                <p><strong>Ancestry:</strong> {character.ancestry}</p>
            </div>
        </div>
    );
};

export default CharacterReveal;
