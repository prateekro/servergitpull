var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const { execSync } = require('child_process'); //https://stackoverflow.com/questions/20643470/execute-a-command-line-binary-with-node-js

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients = [
    {
        "id": "234kjw",
        "text": "Eggs"
    },
    {
        "id": "as82w",
        "text": "Milk"
    },
    {
        "id": "234sk1",
        "text": "Bacon"
    },
    {
        "id": "ppo3j3",
        "text": "Frog Legs"
    }
];


app.get('/ingredients', function(req, res) {
    console.log("GET From SERVER");
    res.send(ingredients);
});

app.post('/ingredients', function(req, res) {
    var ingredient = req.body;
    console.log(req.body);
    ingredients.push(ingredient);
    res.status(200).send("Successfully posted ingredient");
});

app.get('/pullrcc', function(req, res) {
    res.status(200).send("Trying to pull it Sir!")
});

app.get('/execgitpull', function(req, res) {
    // stderr is sent to stderr of parent process
    // you can set options.stdio if you want it to go elsewhere
    let stdout = execSync('ls');
    res.status(200).send("Executed! Please check.")
})

app.listen(6069);
