//To Run: node server.js  (use control c to stop server)
// Go to browser: http://localhost:3000/

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//For Heroku
const port = process.env.PORT || 3000;


//create an app using express
var app = express();


//App middleware to serve public static page
//To Run: http://localhost:3000/help.html
app.use(express.static(__dirname + '/public'));

//App .use is to register a middleware (call next to tell middleware when we done
// looks like a filter for all reqquest
app.use(  (req, res, next) => {

    var now = new Date().toString();


    var log = `${now} ${req.method} ${req.url}`;

        fs.appendFile('server.log', log + '\n', (err) => {
            if(err){
                console.log('Unable to append to server log');
            }
        });

   /*
    res.render('maintainance.hbs', {

        pageTitle: 'Under maintainance',
        welcomeMsg: 'This is a maintainance msg'

    });
    */
    next();

});


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=> {
    return text.toUpperCase();
});

//Use handle bar (handle bar is using a default "views" folder
app.set('views engine', 'hbs');

//http://localhost:3000/about_me
    app.get('/about_me', (req, res) => {

        res.render('about_me.hbs', {

            pageTitle: 'About Page',
            currentYear: new Date().getFullYear()

        });

    });

//http://localhost:3000/home
    app.get('/home', (req, res) => {

        res.render('home.hbs', {

            pageTitle: 'About Page',
            currentYear: new Date().getFullYear(),
            welcomeMsg: 'This is a welcome msg'

        });

    });

//http://localhost:3000/maintainance
    app.get('/maintainance', (req, res) => {

        res.render('maintainance.hbs', {

            pageTitle: 'Under maintainance',
            welcomeMsg: 'This is a maintainance msg'

        });

    });

//handler for http get request
app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>')

    //res.send();  <-- send JSON response
    res.send({
        name:'Gary',
        likes: [
            'bike',
            'run'
        ]
    });
});



http://localhost:3000/about
app.get('/about', (req, res) => {

    res.send('About Page');

});


//handler for http get request
app.get('/bad', (req, res) => {

    //res.send();  <-- send JSON response
    res.send({
        errorMessage:'Unable to handle request'


    });
});


//bind app to a port  (Run local)
/*
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
*/


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

