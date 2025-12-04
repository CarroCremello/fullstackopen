const Total = ({parts}) => {

  console.log('Total parts =', parts)

  let total = parts.reduce( (accumulator, part) => accumulator + part.exercises, 0 )

  return <p>Number of exercises {total}</p>
}

export default Total