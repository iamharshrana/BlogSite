const express = require('express');
const morgan = require('morgan');
const mongoose  = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//connect to mongoDb
const dbURI = 'mongodb+srv://blogwritter:5vc1OJRsIsoQnEVR@cluster0.2rcbsrp.mongodb.net/'//5vc1OJRsIsoQnEVR   blogwritter
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//middleware & static route
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});


//blog routes
app.use('/blogs', blogRoutes);


//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});