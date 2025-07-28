import React from 'react';
import styled from 'styled-components';
import type { HPDetail } from "../types";

interface Props {
  targetCharacter: HPDetail;
  characters: HPDetail[];
  attempts: string[];
}

const GuessLog: React.FC<Props> = ({ targetCharacter, characters, attempts }) => {

  return (
    <Wrapper>
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
