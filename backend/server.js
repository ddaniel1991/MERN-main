const express = require('express')
const companion = require('@uppy/companion')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT;
const cors = require('cors')

connectDB()

const app = express();

const corsOptions = {
    origin: true,
    methods: ['GET','PUT','POST'],
    preflightContinue: true,

}
const options = {
    providerOptions: {
        s3: {
            key: process.env.COMPANION_AWS_KEY,
            secret: process.env.COMPANION_AWS_SECRET,
            bucket: process.env.COMPANION_AWS_BUCKET,
            region: process.env.COMPANION_AWS_REGION,
        }
    },
    server: {
        host: 'localhost:4000',
        protocol: 'http',
        path: '/companion'

    },
    filePath: `${__dirname}/uploads`,
    secret: process.env.COMPANION_AWS_SECRET,
    debug: true,
    uploadUrls: ['http://localhost:400/uploads'],
    corsOrigins: true,

}
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.json())
app.use(session({ secret: process.env.JWT_SECRET, resave: true, saveUninitialized: true }))

app.use(express.urlencoded({ extended: false }))

app.use("/api/dishes", require('./routes/dishRoutes'))
app.use("/api/drinks", require('./routes/drinkRoutes'))
app.use("/api/users", require('./routes/userRoutes'))
app.use('/companion', companion.app(options))


app.use(errorHandler)




const server = app.listen(port, () => console.log(`Server started on port ${port}`))
 
companion.socket(server)
