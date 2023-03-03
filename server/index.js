const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use(morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]

app.get('/api/persons', (request, response) => {
	console.log('In the get for api/persons all')
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log('In the get for api/persons',id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
	response.status(400).send('Current password does not match');
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  persons = persons.find(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const personName = body.name
    const personNumber = body.number

    if (Object.keys(body).length === 0) {
        return response.status(400).json({
          error: 'content missing'
        })
    }
	
	const person = {
        name: personName,
        number: personNumber
        }

	persons = persons.concat(person)
	response.json(persons)
})

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });
  
 // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
	  console.log('Looking for the rest')
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT)
console.log(`Server running on port ${PORT}`)