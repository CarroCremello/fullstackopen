const Part = ({part}) => {
  console.log('Part: ', part)
  return (
    <li key={part.id}>
        {part.name} {part.exercises}
    </li>
  )
}

export default Part