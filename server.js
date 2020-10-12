const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const lances = [{
    name: 'Franklyn',
    value: 10
}];

app.use(bodyParser.json());
app.disable('etag');
app.get('/api/min-bid', (req, res) => {
  const minLanceReduce = lances.reduce((lance1, lance2) => {
    if (lance1.value > lance2.value) {
        lance1 = lance2;
    }
    return lance1;        
  });
  res.send(minLanceReduce);
})

app.post('/api/post-bid', (req, res) => {
    if (req.body) {
      lances.push(req.body)
        res.status(201).send({
            message: "Valor adicionado com sucesso!"
        })
    } else {
      res.status(500).send({
        message: "Valores invalidos"
      })
    }
})

app.listen(port);