import fs from 'fs';
import path from 'path';

module.exports = function apiproxy(app) {
  app.get('/api/*', (req, res) => {
    const relativePath = `../src/questiaire/question-${2}.json`;

    fs.readFile(path.join(__dirname, relativePath), 'utf8', (err, data) => {
      if (err) throw err;
      res.send(JSON.parse(data));
    });
  });
};
