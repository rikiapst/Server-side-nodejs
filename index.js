const express = require('express');
const app = express();
app.listen(4000, () => console.log('Listening at Port 4000'));
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }));
const { Pool } = require('pg');

const pool = new Pool();

async function tester() {
  app.post('/api', (request, response) => {
    // console.log('Request Recieved')
    // console.log(request.body);
    const data = request.body;
    // database.push(data)
    // console.log(database)
    response.json({
      status: 'success',
      latitude: data.lat,
      longitude: data.lon
    })
    pool.query(`INSERT INTO location(longitude, latitude) VALUES('${data.lon}', '${data.lat}')`);
  })

}

tester();