import fs from 'fs';
import path from 'path';

module.exports = function apiproxy(app) {
  app.get('/api/question/:id', (req, res) => {
    const relativePath = `../src/questinaire/question-${req.params.id}.json`;

    fs.readFile(path.join(__dirname, relativePath), 'utf8', (err, data) => {
      if (err) {
        res.sendStatus(500);
      }
      res.send(JSON.parse(data));
    });
  });

  app.post('/api/answers/:id', (req, res) => {
    try {
      console.log(JSON.stringify(req.body)); //eslint-disable-line
    } catch (e) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
};
