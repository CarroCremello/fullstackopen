import { useState, useEffect } from 'react'
import coutriesService from './services/countries'
import Search from './components/Search'
import Notification from './components/Notification'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState([])

  const filteredCountries = searchTerm === ''
    ? []
    : countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredCountryName = filteredCountries.length === 1 ? filteredCountries[0].name.common : null

  useEffect(() => {
    console.log('effect 1') 
    coutriesService
      .getCountries()
      .then(initialCountries => {
        setCountries(initialCountries)
        console.log("Countries: ", initialCountries)
      })
      .catch(error => console.error('Error while getting and setting countries: ', error))
  }, [])

  useEffect(() => {
    console.log('effect 2')
    if (!filteredCountryName) return
    coutriesService
      .getCountry(filteredCountryName)
      .then(initialCountry => {
        setCountry(initialCountry)
        console.log("Country: ", initialCountry)
      })
    .catch(error => console.error('Error while getting and setting country: ', error))
  }, [filteredCountryName])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    console.log('Search term: ', event.target.value)
  }

  const showCountry = (countryName) => {
    setSearchTerm(countryName)
  }

  return (
    <>
      <Search label="Search countries: " searchTerm={searchTerm} handleSearch={handleSearch} />
      {filteredCountries.length > 10 && (<Notification message="Too many countries, please specify your search" />)}
      {filteredCountries.length >= 2 && filteredCountries.length <= 10 && (<Countries countriesToShow={filteredCountries} showCountry={showCountry} />)}
      {filteredCountries.length === 1 && (
        country && country.name?.common === filteredCountryName
          ? <Country country={country} />
          : <p>Loading country data…</p>
      )}
    </>
  )
}

export default App
