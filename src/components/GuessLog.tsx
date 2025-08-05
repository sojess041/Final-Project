import React from 'react';
import styled from 'styled-components';
import type { HPDetail } from "../types";
import './GuessLog.css';

interface Props {
  targetCharacter: HPDetail;// The correct answer character
  characters: HPDetail[];// All possible characters from the API
  attempts: string[];// Names of characters guessed by the user
}

//display hints
const GuessLog: React.FC<Props> = ({ targetCharacter, characters, attempts }) => {

  return (
    <div className="guess-log-wrapper guess-log">
      <Table>
        <thead>
          <tr>
            <th style={{ color: 'white', backgroundColor: '#222' }}>Name</th>

            <th style={{ color: 'white', backgroundColor: '#222' }}>House</th>
            <th style={{ color: 'white', backgroundColor: '#222' }}>Gender</th>
            <th style={{ color: 'white', backgroundColor: '#222' }}>Year</th>
            <th style={{ color: 'white', backgroundColor: '#222' }}>Hair</th>
            <th style={{ color: 'white', backgroundColor: '#222' }}>Ancestry</th>
            <th style={{ color: 'white', backgroundColor: '#222' }}>Status</th>

          </tr>
        </thead>
        <tbody>
          {attempts.map((attemptName, idx) => {
            const guessedChar = characters.find(
              c => c.name.toLowerCase() === attemptName.toLowerCase()
            );

            return (
              <tr key={idx}>
                {/* <td>{attemptName}</td> */}
                <HintCell isMatch={guessedChar?.name.toLowerCase() === targetCharacter.name.toLowerCase()}>
                  {guessedChar?.name || '—'}
                </HintCell>
                <HintCell isMatch={guessedChar?.house === targetCharacter.house}>
                  {guessedChar?.house || '—'}
                </HintCell>
                <HintCell isMatch={guessedChar?.gender === targetCharacter.gender}>
                  {guessedChar?.gender || '—'}
                </HintCell>
                {/* JSG: Up or Down arrow for birth year */}
                <HintCell isMatch={guessedChar?.yearOfBirth === targetCharacter.yearOfBirth}>
                  {guessedChar?.yearOfBirth
                    ? guessedChar.yearOfBirth === targetCharacter.yearOfBirth
                      ? guessedChar.yearOfBirth
                      : `${guessedChar.yearOfBirth} ${guessedChar.yearOfBirth > targetCharacter.yearOfBirth ? '↓' : '↑'
                      }`
                    : '—'}
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

              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default GuessLog;

// JSG: USING 'guess-log-wrapper' FROM GuessLog.css INSTEAD
// const Wrapper = styled.div`
//   color: white;
//   padding: 20px;
// `;

const Table = styled.table`
  width: 100%;
  margin: 0.5rem auto;      // JSG: Center the table
  border-collapse: collapse;

  th, td {
    padding: 16px 10px;
    border: 1px solid #444;
    text-align: center;
    white-space: normal;      // JSG: Allow text wrapping
  }

  th {
    background-color: #222;
  }

  @media (max-width: 600px) {   // JSG: Design for narrow screens
    th, td {
      font-size: 0.65rem;
      padding: 8px 2px;
    }
  }
`;

//styles each cell depending if match
const HintCell = styled.td<{ isMatch: boolean }>`
  background-color: ${({ isMatch }) => (isMatch ? 'limegreen' : '#2a2a2a')};
  color: ${({ isMatch }) => (isMatch ? 'black' : 'white')}; 
`;
