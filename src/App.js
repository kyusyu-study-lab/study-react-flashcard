import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { FlashCard } from './FlashCard';
import words from './1_Basic300.json'
import { Typography } from '@mui/material';

function App() {
  const [selection, setSelection] = useState([])
  const [answer, setAnswer] = useState(0)
  const [score, setScore] = useState(0)
  const [progress, setProgress] = useState(0)
  const colors = ['primary', 'success', 'error']

  const shuffle = (arr) => {
    const copyArr = [...arr]

    const shuffledArr = copyArr.reduce((_, current, i) => {
      const rand = Math.floor(Math.random() * (i + 1))
      copyArr[i] = copyArr[rand]
      copyArr[rand] = current
      return copyArr
    }, [])
    return shuffledArr
  }

  const initWords = () => {
    const shuffledWords = shuffle(words)
    setSelection(shuffledWords.slice(0, 3))
    setAnswer(Math.floor(Math.random() * 3))
  }

  useEffect(() => {
    initWords()
  }, [])

  useEffect(() => {
    if (progress > 4) {
      alert(`Your score is ${score}`)
      setScore(0)
      setProgress(0)
    }
  }, [progress])

  const selectWord = (i) => {
    let resultScore = score;
    if (answer === i) {
      alert("Correct!")
      resultScore += 1
      setScore(resultScore)
    } else {
      alert(`Wrong... The answer is ${selection[answer].name}.`)
    }
    setProgress(progress + 1)
    initWords()
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <Typography
            variant='h3'
            style={{marginTop: 16}}
          >
            {selection.length > 0 ? selection[answer].description : "Loading..."}
          </Typography>
        <div style={{
          marginTop: 48,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          columnGap: 64,
        }}>
          {selection ? selection.map((item, i) => {
            return (
              <FlashCard
                name={item.name}
                selectWord={() => selectWord(i)}
                color={colors[i]}
              />
            )
          })
          : <></>}
        </div>
          <Typography
            variant='h5'
            style={{marginTop: 48}}
          >
            {`Score: ${score}`}
          </Typography>
      </header>
    </div>
  );
}

export default App;
