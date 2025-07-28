// src/CharacterList.tsx

import { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import type { HPDetail } from '../types.ts'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    min-height: 100vh;
    background: #1b1b1b;                   /* deep charcoal behind everything */
    color: #fff;
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }

  h1, h2, h3 {
    font-family: 'Segoe UI', 'Verdana', sans-serif;
    color: #ffa500;                       /* Naruto-orange for headings */
  }

  p {
    margin: 0;
  }
`

const Header = styled.h1`
  text-align: center;
  margin: 24px 0;
  font-size: 2.4rem;
  text-shadow: 0 0 6px rgba(255,165,0,0.7);
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
  background: #262626;                   /* very dark gray card */
  border: 2px solid #ffa500;            /* bright orange border */
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 200ms ease, box-shadow 200ms ease;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 16px rgba(255,165,0,0.4);
  }

  h3 {
    margin: 12px;
    text-align: center;
    font-size: 1.1rem;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    background: #333;
  }

  .details {
    padding: 12px;
    flex-grow: 1;

    p {
      font-size: 0.85rem;
      line-height: 1.4;
      color: #ddd;
      margin-bottom: 6px;

      strong {
        color: #ffa500;
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