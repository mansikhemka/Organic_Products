/**
 * Created by mansikhemka on 10/10/16.
 */


const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const functionality = require('./functionality');

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

const page1 = require('./route/page1');
const page2 = require('./route/page2');

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'hbs');

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', page1);
app.use('/page2', page2);

app.post('/requisite', (req, res)=>{
    functionality.fetchprice(req.body.dish, (result)=>{
        console.log(result);
        res.send(result);
    })
})
app.post('/savingdb',(req,res)=>{
    functionality.saver(req.body.items, req.body.cost, (result)=>{
        console.log(result);
        res.send(result);
    })
})
app.get('/showingdb',(req,res)=>{
    functionality.showing((result)=> {
        console.log(result);
        res.send(result);
    })
})
app.listen(4000, ()=>{
    console.log('http://localhost:4000');
})