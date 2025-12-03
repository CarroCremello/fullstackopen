import { useState } from 'react'

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const [ allVotes, setAllVotes ] = useState([])
  const all = allVotes.length
  const average = allVotes.length === 0
    ? 0 
    : allVotes.reduce((sum, vote) => sum + vote, 0) / allVotes.length
  const positive = all === 0
    ? 0
    : good / all * 100

  const increaseGood = () => {
    setGood( good + 1 )
    setAllVotes( allVotes.concat( 1 ) )
  }

  const increaseNeutral = () => {
    setNeutral( neutral + 1 )
    setAllVotes( allVotes.concat( 0 ) )
  }
  const increaseBad = () => { 
    setBad( bad + 1 )
    setAllVotes( allVotes.concat( -1 ) )
  }

  return (
    <div>
      <Heading type="h2" text="Give feedback" />
      <Button text="Good" onClick={increaseGood} />
      <Button text="Neutral" onClick={increaseNeutral} />
      <Button text="Bad" onClick={increaseBad} />

      <Heading type="h2" text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} positive={positive} average={average} />
    </div>
  )
}

const Heading = ({type, text}) => {
  const Tag = type
  return (
    <Tag>{text}</Tag>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = ({good, neutral, bad, all, positive, average}) => {
  return (
    <p>
      Good {good} <br />
      Neutral {neutral} <br />
      Bad {bad} <br />
      All {all} <br />
      Average {average} <br />
      Positive {positive}%
    </p>
  )
}

export default App