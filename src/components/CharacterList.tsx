// src/CharacterList.tsx

import { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import type { HPDetail } from '../types.ts'


/*styling for list */
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #fdfaf4; /* parchment tone */
    color: #4b2e2e;       /* deep brown */
    font-family: 'Marauders Map', serif;
  }

  h1, h2, h3 {
    font-family: 'Marauders Map', serif;
    color: #4b2e2e;
  }

  p {
    margin: 0;
  }
`



const Header = styled.h1`
  text-align: center;
  margin: 24px 0;
  font-size: 380%;
`

const Container = styled.div`
  width: 90vw;
  max-width: 1400px;
  margin: auto;
  padding: 16px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 8px 0;
`

const Card = styled.div`
  background: #fffaf0; /* parchment card */
  border: 2px solid #d2b48c; /* tan border */
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);

  h3 {
    margin: 12px;
    text-align: center;
    font-size: 1.2rem;
    color: #4b2e2e;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    background: #eae0d5;
  }

  .details {
    padding: 12px;


    p {
      font-size: 0.9rem;
      line-height: 1.4;
      color: #4b2e2e;
      margin-bottom: 20px;

      strong {
        color: #7d5a42;
      }
    }
  }


`

export default function CharacterList() {
  const [chars, setChars] = useState<HPDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    fetch('https://hp-api.onrender.com/api/characters')
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json() as Promise<HPDetail[]>
      })
      .then(setChars)
      .catch(e => {
        console.error(e)
        setError(e.message)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading…</p>
  if (error)   return <p style={{ color: '#ff4500', textAlign: 'center' }}>Error: {error}</p>
  if (!chars.length) return <p>No characters found.</p>

  return (
    <>
      <GlobalStyle />
      <Header>Harry Potter Characters</Header>
      <Container>
        <Grid>
          {chars.map(c => (
            <Card key={c.id}>
              <h3>{c.name}</h3>
              {c.image && <img src={c.image} alt={c.name} />}
              <div className="details">
                <p><strong>House:</strong> {c.house || 'Unknown'}</p>
                <p><strong>Actor:</strong> {c.actor || 'Unknown'}</p>
                <p><strong>Gender:</strong> {c.gender}</p>
                <p><strong>Born:</strong> {c.yearOfBirth || 'Unknown'}</p>
                <p><strong>Hair:</strong> {c.hairColour || 'Unknown'}</p>
              </div>
            </Card>
          ))}
        </Grid>
      </Container>
    </>
  )
}