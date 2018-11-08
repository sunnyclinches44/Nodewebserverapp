const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) throw err;
        console.log(`The data ${log} was appended to the server log file.`); 
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         title: 'Maintenance',
//         description: 'The site is under maintenance'
//     });
// });

app.use(express.static(__dirname +'/public'));

app.get('/', (req, res, next) => {
   res.render('home.hbs',{
       title: 'Home Page',
       description: 'Home Page description'
   });
});

app.get('/about', (req, res, next) => {
    res.render('about.hbs',{
       title: 'About Page',
       description: 'About Page description'
    });
});

//Web server port
app.listen(3000,() => {
    console.log(`Server started on the port: 3000`);
});