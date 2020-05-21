import express from 'express';

const app = express();

app.get('/api/auth', (req, res) => {
  res.send('Hello World, from express');
});
 
app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);