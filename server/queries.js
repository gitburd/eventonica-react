const Pool = require('pg').Pool

// on my server
// const pool = new Pool({
// //   user: 'me',
//   host: 'localhost',
//   database: 'eventonica',
// //   password: 'password',
//   port: 5432,
// })

// on heroku
const pool = new Pool({
  // Make sure you swap out <user> and <password>
  connectionString: process.env.DATABASE_URL || 'postgres://@localhost:5432',
  // Use SSL but only in production
  ssl: process.env.NODE_ENV === 'production'
});

const getEvents = (request, response) => {
    pool.query('SELECT * FROM events', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };

  const getEventById = (request, response) => {
    const id = parseInt(request.params.id)
    console.log(id)
    pool.query('SELECT * FROM events WHERE id = $1', [id], (error, results) => {
      
      if (error) {
        throw error
    }
    response.status(200).json(results.rows)
})
}

const createEvent = (request, response) => {
    const { title,type,location, date } = request.body
    console.log(request.body)
    console.log(title,type,location,date)
    
      pool.query('INSERT INTO events(title,type,location, date) VALUES ($1, $2, $3, $4)', [title,type,location, date], (error, results) => {
          if (error) {
              throw error
            }
            response.status(201).send(`User added with ID: ${response.insertId}`)
    })
  }
  
  const updateEvent = (request, response)=> {
    const id = parseInt(request.params.id)
    const { title,type,location,date } = request.body
  
    pool.query(
      'UPDATE events SET title = $2, type = $3, location = $4, date =$5 WHERE id = $1',
      [id,title,type,location, date],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`event modified with ID: ${id}`)
      }
    )
  }
  
  const deleteEvent = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM events WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`event deleted with ID: ${id}`)
    })
  }
  



  module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
  };