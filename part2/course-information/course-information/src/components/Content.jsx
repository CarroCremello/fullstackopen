import Part from './Part'

const Content = ({parts}) => {
  console.log('Content parts =', parts)
  return (
    <ul>
      {parts.map( part => <Part key={part.id} part={part}/>)}
    </ul>
  )
}

export default Content