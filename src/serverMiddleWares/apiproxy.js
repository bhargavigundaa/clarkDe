import fs from 'fs';
import path from 'path';

module.exports = function apiproxy(app) {
  app.get('/api/question/:id', (req, res) => {
    const relativePath = `../src/questiaire/question-${req.params.id}.json`;

    fs.readFile(path.join(__dirname, relativePath), 'utf8', (err, data) => {
      if (err) throw err;
      res.send(JSON.parse(data));
    });
  });
};
