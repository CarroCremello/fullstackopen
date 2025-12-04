const Person = ({person}) => {

    return <li key={person.id}>{person.name}</li>
}

export default Person