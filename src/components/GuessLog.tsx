import React, { useState } from 'react';
import styled from 'styled-components';
import type { HPDetail } from "../types";

interface Props {
  targetCharacter: HPDetail;
  characters: HPDetail[];
  onWin: () => void;
  onLose: () => void;
}

const GuessLog: React.FC<Props> = ({ targetCharacter, characters, onWin, onLose }) => {
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState<string[]>([]);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedGuess = guess.trim().toLowerCase();
    const correctName = targetCharacter.name.toLowerCase();
    const newAttempts = [...attempts, guess];
    setAttempts(newAttempts);

    if (normalizedGuess === correctName) {
      setResult('win');
      onWin();
    } else if (newAttempts.length >= 5) {
      setResult('lose');
      onLose();
    }

    setGuess('');
  };

  return (
    <Wrapper>
      {result === 'win' && <Success>You guessed it! The character was {targetCharacter.name}.</Success>}
      {result === 'lose' && <Fail>You lost! The answer was {targetCharacter.name}.</Fail>}

      {!result && (
        <form onSubmit={handleSubmit}>
          <input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Guess the character's name"
          />
          <button type="submit">Submit</button>
        </form>
      )}

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>House</th>
            <th>Gender</th>
            <th>Year</th>
            <th>Hair</th>
            <th>Ancestry</th>
            <th>Status</th>
            <th>Patronus</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((attemptName, idx) => {
            const guessedChar = characters.find(
              c => c.name.toLowerCase() === attemptName.toLowerCase()
            );

            return (
              <tr key={idx}>
                <td>{attemptName}</td>
                <HintCell isMatch={guessedChar?.house === targetCharacter.house}>
                  {guessedChar?.house || '—'}
                </HintCell>
                <HintCell isMatch={guessedChar?.gender === targetCharacter.gender}>
                  {guessedChar?.gender || '—'}
                </HintCell>
                <HintCell isMatch={guessedChar?.yearOfBirth === targetCharacter.yearOfBirth}>
                  {guessedChar?.yearOfBirth || '—'}
                </HintCell>
                <HintCell isMatch={guessedChar?.hairColour === targetCharacter.hairColour}>
                  {guessedChar?.hairColour || '—'}
                </HintCell>
                <HintCell isMatch={guessedChar?.ancestry === targetCharacter.ancestry}>
                  {guessedChar?.ancestry || '—'}
                </HintCell>
                <HintCell isMatch={guessedChar?.alive === targetCharacter.alive}>
                  {guessedChar?.alive ? 'Alive' : 'Deceased'}
                </HintCell>
                <HintCell isMatch={guessedChar?.patronus === targetCharacter.patronus}>
                  {guessedChar?.patronus || '—'}
                </HintCell>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default GuessLog;

// STYLES
const Wrapper = styled.div`
  color: white;
  padding: 20px;
`;

const Success = styled.h2`
  color: limegreen;
`;

const Fail = styled.h2`
  color: red;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;

  th, td {
    padding: 8px 10px;
    border: 1px solid #444;
    text-align: center;
    color: white;
  }

  th {
    background-color: #222;
  }
`;

const HintCell = styled.td<{ isMatch: boolean }>`
  background-color: ${({ isMatch }) => (isMatch ? 'limegreen' : '#2a2a2a')};
`;
