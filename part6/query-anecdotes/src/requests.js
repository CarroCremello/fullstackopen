const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  return response.json()
}

export const createAnecdote = async (newAnecdote) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote),
  })
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  return response.json()
}

export const updateAnecdote = async (updatedAnecdote) => {
  const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote),
  })
  return response.json()
}
