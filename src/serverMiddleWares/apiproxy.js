import fs from 'fs';
import path from 'path';

module.exports = function apiproxy(app) {
  app.get('/api/question/:id', (req, res) => {
    const relativePath = `../src/questinaire/question-${req.params.id}.json`;

    fs.readFile(path.join(__dirname, relativePath), 'utf8', (err, data) => {
      if (err) throw err;
      res.send(JSON.parse(data));
    });
  });

  app.post('/api/answers/:id', (req, res) => {
    console.log(req.body); //eslint-disable-line
    res.sendStatus(200);
  });
};
