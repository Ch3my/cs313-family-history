// const PORT debe existir para que levante en Heroku
const PORT = process.env.PORT || 5000
const path = require('path')
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/index'))
app.post('/calculateRate', function (req, res) {
  var result = {}
  result.data = {}
  result.data.weight = req.body.weight
  result.data.mailType = mailTypeName(req.body.mailType)
  result.result = calculateRate(req.body.mailType, req.body.weight)
  res.render('pages/calculateRate', { req, res, result })
})
app.post('/calculateRateApi', function (req, res) {
  var result = {}
  result.data = {}
  result.data.weight = req.body.weight
  result.data.mailType = mailTypeName(req.body.mailType)
  result.result = calculateRate(req.body.mailType, req.body.weight)
  res.json(result)
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

function calculateRate(mailType, weight) {
  var result = 0
  switch (mailType) {
    case 'LS':
      // Letters Stamped
      if (weight < 1) {
        result = 0.55
      } else if (weight >= 1 && weight < 2) {
        result = 0.70
      } else if (weight >= 2 && weight < 3) {
        result = 0.85
      } else if (weight >= 3) {
        result = 1
      }
      break
    case 'LM':
      // Letters Metered
      if (weight < 1) {
        result = 0.50
      } else if (weight >= 1 && weight < 2) {
        result = 0.65
      } else if (weight >= 2 && weight < 3) {
        result = 0.80
      } else if (weight >= 3) {
        result = 0.95
      }
      break
    case 'LE':
      // large Envelopes
      if (weight < 1) {
        result = 1
      } else if (weight >= 1 && weight < 2) {
        result = 1.15
      } else if (weight >= 2 && weight < 3) {
        result = 1.30
      } else if (weight >= 3 && weight < 4) {
        result = 1.45
      } else if (weight >= 4 && weight < 5) {
        result = 1.60
      } else if (weight >= 5 && weight < 6) {
        result = 1.75
      } else if (weight >= 6 && weight < 7) {
        result = 1.90
      } else if (weight >= 7 && weight < 8) {
        result = 2.05
      } else if (weight >= 8 && weight < 9) {
        result = 2.20
      } else if (weight >= 9 && weight < 10) {
        result = 2.35
      } else if (weight >= 10 && weight < 11) {
        result = 2.50
      } else if (weight >= 11 && weight < 12) {
        result = 2.65
      } else if (weight >= 12 && weight < 13) {
        result = 2.80
      }
      break
    case 'FC':
      // Fist Class- Used Zone 1 & 2 for the prices
      if (weight < 1) {
        result = 3.66
      } else if (weight >= 1 && weight < 2) {
        result = 3.66
      } else if (weight >= 2 && weight < 3) {
        result = 3.66
      } else if (weight >= 3 && weight < 4) {
        result = 3.66
      } else if (weight >= 4 && weight < 5) {
        result = 4.39
      } else if (weight >= 5 && weight < 6) {
        result = 4.39
      } else if (weight >= 6 && weight < 7) {
        result = 4.39
      } else if (weight >= 7 && weight < 8) {
        result = 4.39
      } else if (weight >= 8 && weight < 9) {
        result = 5.19
      } else if (weight >= 9 && weight < 10) {
        result = 5.19
      } else if (weight >= 10 && weight < 11) {
        result = 5.19
      } else if (weight >= 11 && weight < 12) {
        result = 5.19
      } else if (weight >= 12 && weight < 13) {
        result = 5.71
      }
      break
  }
  return result
}

function mailTypeName(code) {
  switch (code) {
    case 'LS':
      return 'Letters (Stamped)'
      break
    case 'LM':
      return 'Letters (Metered)'
      break
    case 'LE':
      return 'Large Envelopes (Flats)'
      break
    case 'FC':
      return 'First-Class Package Service -- Retail'
      break
  }
}