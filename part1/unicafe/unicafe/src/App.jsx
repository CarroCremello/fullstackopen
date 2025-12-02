import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => { setGood( good + 1 ) }
  const increaseNeutral = () => { setNeutral( neutral + 1 ) }
  const increaseBad = () => { setBad( bad + 1 ) }

  return (
    <div>
      <Heading type="h2" text="Give feedback" />
      <Button text="Good" onClick={increaseGood} />
      <Button text="Neutral" onClick={increaseNeutral} />
      <Button text="Bad" onClick={increaseBad} />

      <Heading type="h2" text="Statistics" />
      <Display good={good} neutral={neutral} bad={bad} />
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

const Display = ({good, neutral, bad}) => {
  return (
    <p>
      Good {good} <br />
      Neutral {neutral} <br />
      Bad {bad}
    </p>
  )
}

export default App