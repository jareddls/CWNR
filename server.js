import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express()

app.use(bodyParser.json())
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: '0',
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: '0',
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database)
})

app.listen(3000, ()=> {
    console.log("app is running on port 3000")
})


app.post('/login', (req, res) => {
    const { email, password } = req.body
    if (email == database.users[0].email && password == database.users[0].password) {
        res.json("logged in")
    } else {
         res.status(400).json("error logging in")
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body
    database.users.push({
            id: '125',
            name: name,
            email: email,
            password: password,
            entries: '0',
            joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

/*
/ --> res = this is working
/login --> POST = returns success/fail
/register --> POST = returns new user object that was made
/profile/:userId --> GET = returns the user object that's being used


*/