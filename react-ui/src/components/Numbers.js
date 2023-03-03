const Numbers = ({persons, state }) => {
  return (
    <ul>{state.list.map(person => {
		return <li key={person.id}>{person.name} {person.number}</li>
		})}
	</ul>
  )
}

export default Numbers