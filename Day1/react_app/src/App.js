import React, { useState } from 'react'
import quotesArray from './quotes.json'

function App () {
  const [author, setAuthor] = useState(false)
  const [sortArray, setSortArray] = useState([])

  return (
    <div className='App'>
      <input
        type='radio'
        name='author'
        onChange={() => setAuthor(true)}
        checked={author === true}
      ></input>
      <label>Є автор</label>
      <input
        type='radio'
        name='author'
        onChange={() => setAuthor(false)}
        checked={author === false}
      ></input>
      <label>Нема автора</label>
      <ul>
        {quotesArray.map(
          ({ quote, source }) =>
            author === Boolean(source) && (
              <li key={quote}>
                <h3 style={{ color: quote.length > 40 ? 'red' : 'black' }}>
                  {quote}
                </h3>
                <p>{source}</p>
              </li>
            )
        )}
      </ul>
      <button
        onClick={() =>
          setSortArray(
            quotesArray.sort((a, b) => (a.source > b.source ? 1 : -1))
          )
        }
      >
        Сортувати
      </button>
      <ul>
        {sortArray.map(({ quote, source }) => (
          <li key={quote}>
            <h3>{quote}</h3>
            <p>{source}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
