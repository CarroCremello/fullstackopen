const Countries = ({countriesToShow, showCountry}) => {

    return (
        <ul>
            {countriesToShow.map((country, index)=> <li key={index}>{country.name.common} <button onClick={() => { showCountry(country.name.common) }}>Show</button></li>)}
        </ul>
    )
}

export default Countries