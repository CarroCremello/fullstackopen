import Button from "./Button"

const Person = ({person, deletePerson}) => {
    const id = person.id
    return (
        <li key={id}>
            {person.name} {person.number} <Button type="" text="Delete" onClick={() => deletePerson(id)} />
        </li>
    )
}

export default Person