
let http = require('http');  
let path = require('path');
let express = require('express');
let app = express();
const jwt = require('jsonwebtoken');
const SECRET = 'gustavodias'
//const session = require('express-session');
const bodyParser = require('body-parser');
const { decode } = require('punycode');
const { nextTick } = require('process');
const Posts = require('./model/Posts');

app.use(bodyParser.json());


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: false}));

app.post('/',(req,res) => {
    console.log('')
    res.render('principal');
})


app.get('/', (req, res) => { // Tela Principal 
    
    res.render('principal');
});

function verifyJWT(req, res){
    const token = req.headers['x-acces-token'];
    const index = lista.findIndex(item => item === token);
    if(index != -1){
        return res.status(401).end()
    }
    jwt.verify(token, SECRET, (err, decoded)=> {
        if(err) {
            return res.status(401).end();
    
        }
        req.userId = decode.userId;
        next();

    })
}

app.get('/usuario',(req, res) => {
    res.json({id: 1, nome:'gustavo'});
})

app.post('/login', (req, res)  => {
    if(req.body.email === 'gustavo' && req.body.password == '456') {
        const token = jwt.sign({userId: 1}, SECRET, {expiresIn: 450 })
        return  res.json({auth: true, token}) 
    }
    res.status(401).end();
})

const lista = [] ; 

app.post('/logout', function(req, res) {
    lista.push(req.headers['x-access-token'])
    res.end();
})



app.listen(3000);
