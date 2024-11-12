//importing express, handlebars, parser, and finally the validator for the project to peform
import express from 'express';
import { create } from 'express-handlebars';
import bodyparser from 'body-parser';
import { check, validationResult } from 'express-validator';

const app = express();

const hbs = create({});

var PORT = 3000
//all view engines for and static express for the public folder
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));

//get to grab handle bar and style it before rendering
app.get('/', (req, res, next) => {

    res.render('home', {
        showTitle: true,
        style: 'home.css',
        title: "Home",
        pp: "pp",
        h2: "Welcome to the homepage new user!",
        para: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        aa: "About",
        ac: "Contact",
        ah: "Home",
        layout: 'main',
    });
});
//contact get before rendering style into the page
app.get('/contact', function (req, res, next) {

    res.render('contact', {
        showTitle: true,
        style: 'contact.css',
        title: "Contact",
        h1: "Contact Page",
        para: "Here is the contact page that holds information on form submit",
        aa: "About",
        ac: "Contact",
        ah: "Home",
        layout: 'main',
    });
});

//post used to validate form submission and determine if it passes the loop for error checking 
app.post('/contact',
    check('username').isLength({ min: 5, max: 20 }).withMessage('Username is not valid'),
    check('email').isLength({ min: 5, max: 30 }).withMessage('Email is not valid'),
    check('email').isEmail().withMessage('Email is not valid'),
    check('password').isLength({ min: 8, max: 10 }).withMessage('Password is not valid')
    , (req, res) => {
        const errors = validationResult(req);
        const formData = req.body; 

        let emailmsg = '';
        let usernamemsg = '';
        let passwordmsg = '';

        if (!errors.isEmpty()) {
                //LOOP ALL ERRORS and set css for input fields
                let errs = errors.errors
                errs.forEach(item => {
                    if(item.path=='email'){
                        emailmsg = item.msg;
                    }
                    if(item.path=='username'){
                        usernamemsg = item.msg;
                    }
                    if(item.path=='password'){
                        passwordmsg = item.msg;
                    }

                });
        
            res.render('contact', {
                showTitle: true,
                formValid: "error",
                message: "Failed to submit, please verify fields.",
                style: 'contact.css',
                title: "Contact",
                h1: "Contact Page",
                para: "Here is the contact page that holds information on form submit",
                aa: "About",
                ac: "Contact",
                ah: "Home",
                email: formData.email,
                username: formData.username,
                password: formData.password,
                emailmsg: emailmsg,
                usernamemsg, usernamemsg,
                passwordmsg, passwordmsg,
                layout: 'main',
            });
        }
        else {
            res.render('contact', {
                showTitle: true,
                formValid: "success",
                message: "Successfully submitted!",
                style: 'contact.css',
                title: "Contact",
                h1: "Contact Page",
                para: "Here is the contact page that holds information on form submit",
                aa: "About",
                ac: "Contact",
                ah: "Home",
                email: formData.email,
                username: formData.username,
                password: formData.password,
                layout: 'main',
            });
        }

    });

app.get('/about', (req, res, next) => {

    //res.send('<p> <a href="localhost:3000/home">') //requires a http var or const

    res.render('about', {
        showTitle: true,
        style: 'about.css',
        title: "About",
        h1: "About Page",
        h3: "Wes R.",
        para: "This is our about page that holds information on the website creator team.",
        pp: "Hope you enjoyed!",
        aboutpara1: "Some text that can help describes me lorem ipsum ipsum lorem.",
        abouttitle1: "Title: Creator of this Website",
        aboutemail: "W3sBro@examplemail.com",
        aa: "About",
        ac: "Contact",
        ah: "Home",
        layout: 'main',
        button: "contact",

    });
});
app.enable('view cache');

app.listen(3000);