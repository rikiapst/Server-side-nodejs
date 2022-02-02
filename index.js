require('dotenv').config()
const axios = require('axios').default;
const express = require('express');
const app = express();
app.use(express.json({ limit: '1mb' }));


async function location() {
  app.post('/api', (request, response) => {
    const data = request.body;
    response.json({
      status: 'success',
      latitude: data.lat,
      longitude: data.lon
    })
  })

}


location();

app.get(
  '/weather', async (req, res) => {
    var options = {
      method: 'GET',
      url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
      params: {
        lat: req.query.lat.toString(), lon: req.query.lon.toString()
      },
      headers: {
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'x-rapidapi-key': 'd9fb8c1bb7msh404a91baddfafd2p1991fcjsn15f07bb75d03'
      }
    };
    let result = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly', options);
    let item = result.data

    res.send(
      {
        city_name: item.city_name,
      }
    )
  }
)


app.listen(4000, () => console.log('Listening at Port 4000'));
app.use(express.static('public'))