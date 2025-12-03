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

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all, positive, average}) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={all} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={positive} />
      </tbody>
    </table>
  )
}

export default App