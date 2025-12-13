const Country = ({country}) => {
    if (!country) return null
    
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>
                Capital: {country.capital}<br />
                Area: {country.area}
            </p>
            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )
}

export default Country