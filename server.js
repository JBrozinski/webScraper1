
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");


var PORT = process.env.PORT || 3000;

var app = express();

var routes = require("./routes");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(routes);


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://mongodb://user:Password1234@ds053449.mlab.com:53449/heroku_4hhqpfj6";

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build/'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI || "mongodb://user:Password1234@ds053449.mlab.com:53449/heroku_4hhqpfj6");

// Listen on the port
app.listen(PORT, function () {
  console.log("Listening on port: " + PORT);
});
