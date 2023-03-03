import React, {useEffect, useState } from 'react';
import Content from './components/Content'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

function App() {

  	const [persons, setPersons] = useState([])
	const [allPersons, setAllPersons] = useState([])
	const [newName, setNewName ] = useState('')
	const [newNumber, setNewNumber ] = useState('')
	const [newFilter, setNewFilter] = useState('')

  	useEffect(() => {
		console.log('trying to start')
		personService
			.getAll()
			.then(response => {
				console.log(response)
			setPersons(response)
			setAllPersons(response)
			})
			
		}, [])
	
	const addPerson = (event) => {
    event.preventDefault()
    const person = allPersons.filter((person) =>
        person.name === newName
    )

    if (person.length !== 0) {
        window.alert(`${newName} is already added to the phonebook`)
    } 
	else 
	{
        const personToAdd = {
            name: newName,
            number: newNumber
          }
		  personService
			.create(personToAdd)
			.then(response => {
				setAllPersons(allPersons.concat(personToAdd))
				setNewName('')
				setNewNumber('')
			})
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const deletePerson = (id) => {
	const filteredPerson = allPersons.filter(person => person.id === id)
	const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
	
	if (window.confirm('Person with name ' + personName + ' needs to be deleted')) {
		console.log('Person with name ' + personName + ' will be deleted')
		
		personService
			.remove(personId)
		console.log(`${personName} successfully deleted`)
		setAllPersons(allPersons.filter(person => person.id !== personId))
		}	
	else 
		{
		console.log('Nothing happening here')
		}
	}

  const handleFilterChange = (event) => {
    const regex = new RegExp( event.target.value, 'i' );
    const filteredPersons = () => allPersons.filter(person => person.name.match(regex))
	console.log(filteredPersons)
	setNewFilter(event.target.value)
    setPersons(filteredPersons)
  }
		
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h1>Add new person</h1>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h1>Numbers</h1>
      <Content persons={persons} allPersons={allPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
