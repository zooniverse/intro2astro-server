const SpreadsheetHandler = require('./spreadsheet-handler');
const sheetsHandler = new SpreadsheetHandler();

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send('it works!');
  });

  app.get('/sheets/:id', function(req, res) {
    sheetsHandler.getSheet(req.params.id, requ.query)
      .then((googleResponse) => {
        res.send(googleResponse);
      });
  });

  app.get('/sheets/:id/values/:range', function(req, res) {
    sheetsHandler.getSheetValues(req.params.id, req.params.range, req.query)
      .then((googleResponse) => {
        res.send(googleResponse);
      });
  });

  app.post('sheets/:id/values/:range', function(req,res) {
    sheetsHandler.appendRow(req.params.id, req.body, req.params.range, req.query)
      .then((googleResponse) => {
        res.send(googleResponse);
      });
  });
}