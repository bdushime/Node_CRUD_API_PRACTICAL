// import express from 'express'

// const PORT = 801
// const app = express();


// const conversionRates = {
//     usd: 1300,
//     eur:1450,
// }



// app.use(express.json());


// app.get('/',(req,res)=>{
//     res.status(200).json('Hello world')
// })


// app.get('/convert',(req,res)=>{
//     const {amount, currency} = req.query;

//     const convertedAmount = parseFloat(amount) * conversionRates[currency];

//     res.json({
//         input:{amount:parseFloat(amount), currency:currency},
//         convertedAmount,
//         unit: 'rwf'
//     })
// })




// app.listen(PORT,()=>{
//     console.log(`Server listening at ${PORT}`)
// })


import express from'express';
import path from 'path';
import posts from './routes/posts.js'
import users from './routes/users.js'
import books from './routes/books.js'
import tasks from './routes/tasks.js'
import igikorwa from './routes/igikorwa.js'

const port = process.env.PORT || 8000;



const app = express();

app.use((req,res,next)=>{
    console.log(`Request: ${req.method} ${req.url} --${new Date().toISOString()}`);
    next();
})

app.use(express.static());

app.use((req,res,next)=>{
    const start = Date.now();

    res.on('finish',()=>{
        const duration = Date.now() - start;

        console.log(`Request: ${req.method} ${req.url}  --Time: ${duration}`)
    })
    next()
})


app.use((req,res,next)=>{
    const hour = new Date().getHours();
    if(hour >= 0){
       return res.status(403).json({message:'System closed. Try again tomorrow'})
    }
    next();
})

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));




// setup static folder
app.use(express.static(path.join(__dirname,'public')))


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});


app.get('/about',(req,res)=>{
   res.sendFile(path.join(__dirname,'public','about.html'));
})

Routes
app.use('/api/posts',posts);

app.use('/api/users',users);

app.use('/api/books',books);

app.use('/api/tasks',tasks);

app.use('/api/igikorwa',igikorwa);


app.listen(port,()=>console.log('Sever is running on port 8000'));

 


