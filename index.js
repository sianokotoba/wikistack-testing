var express = require('express');
var nunjucks = require('nunjucks');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var models = require('./models');
var Page = models.Page;
var User = models.User;

var app = express();
var wikiRouter = require('./routes/wiki');
var usersRouter = require('./routes/users');

app.engine('html', nunjucks.render);
nunjucks.configure('views', {
  //autoescape: true,
  //express: app,
  noCache: true
})
app.set('view engine', 'html');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/public'));

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

app.get('/', function (req, res) {
    res.redirect('/wiki');
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});

User.sync({force: true})
    .then(function () {
        return Page.sync({force: true});
    })
    .then(function () {
        app.listen(3001, function () {
            console.log('Server is listening on port 3001!');
        });
    });

