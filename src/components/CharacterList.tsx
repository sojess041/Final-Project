// src/CharacterList.tsx
// ----- Jaylin, Jessie, Arielle
import { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import type { HPDetail } from '../types'

// Global parchment background + fonts
const GlobalStyle = createGlobalStyle`
// JSG: set box-sizing
  *, *::before, *::after {     
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    color: #4b2e2e;
    font-family: 'Marauders Map', serif;
    -webkit-font-smoothing: antialiased;  // JSG: smooth fonts
  }
  h1 {
    font-family: 'Harry P Font', serif;
    color: #4b2e2e;
    margin: 0;
  }
`

const Header = styled.h1`
  text-align: center;
  margin: 24px 0;
  font-size: 3rem;
`

const Container = styled.div`
  width: 90vw;
  max-width: 1400px;
  margin: auto;
  padding: 0 16px 32px;
`

const Grid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`

const Card = styled.div`
  background: #d3ba93;
  border: 2px solid #4b2e2e;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;             /* center everything */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }

  h3 {
    margin: 16px 0 8px;
    text-align: center;
    font-size: 1.2rem;
  }

  img {
    width: 100%;
    aspect-ratio: 3 / 4;            /* consistent portrait shape */
    object-fit: cover;
    background: #eae0d5;
  }

  .details {
    width: 100%;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    p {
      margin: 0;
      font-size: 0.9rem;
      line-height: 1.4;
      strong {
        color: #7d5a42;
      }
    }
  }
`

export default function CharacterList() {
  const [chars, setChars] = useState<HPDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  if (loading) return <p style={{ textAlign: 'center' }}>Loading…</p>
  if (error) return <p style={{ color: '#ff4500', textAlign: 'center' }}>Error: {error}</p>
  if (!chars.length) return <p style={{ textAlign: 'center' }}>No characters found.</p>

  return (
    <>
      <GlobalStyle />
      <Header>Harry Potter Characters</Header>
      <Container>
        <Grid>
          {chars.map(c => (
            <Card key={c.id}>
              <h3>{c.name}</h3>
              <img src={c.image || 'https://via.placeholder.com/220x293'} alt={c.name} />
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