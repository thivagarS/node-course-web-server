const express = require('express');
const fs = require('fs');

// Template engine
const hbs = require('hbs');

const app = express();

// To setup partials
hbs.registerPartials(__dirname + '/views/partials');

// To set view engine as hbs
app.set('view engine', 'hbs');

// The value returned will be automatically rendered in html with help of partails
// helper without arguments . return value will be passed into html directly it will search and inject it
hbs.registerHelper('getCurrentYear' , () => {
    return new Date ().getFullYear()
})

// helper with arguments . it will take argument n process it n then it will inject , varaible is passed in render method
// parameter is passed with a space b/w function name n parameter eg : fn pr pr --- inside hbs
hbs.registerHelper('screamIt', text => {
    return text.toUpperCase();
})

// ****** each time when there is request like posting data or requesting a url page middleware executes
app.use((request, response, next) => {
    let log = `${new Date().toString()} ${request.method} : ${request.url}`;
    fs.appendFile('server.log', `${log}\n`, error => {
        if(error)
            console.log('Unable to write log ...')
    })
    console.log(log);
    next();
})

// ****** each time when there is request like posting data or requesting a url page middleware executes
// app.use((request, response, next) => {
//     response.render('maintainence.hbs', {
//         pageTile : 'Maintaince Page'
//     });
//     next();
// })
// To serve static files
// not working test this
app.use(express.static(__dirname + '/public'));
app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTile : 'Home page ...',
        year : new Date ().getFullYear(),
        welcomeMsg : 'Hiiiii !!!'
    });
})

app.get('/about' , (request, response) => {
    // To serve dynamic files
    response.render('about.hbs', {
        pageTile : 'About Page ...',
        year : new Date ().getFullYear()
    });
})

app.listen(8080)