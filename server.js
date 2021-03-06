import express from 'express'
import cors from 'cors'
import APILoader from './lib/restful/apiLoader.js'
import errorHandler from './lib/restful/errorHandler.js'
// import { campus_rec } from './lib/mysql/model/campus_record.js'
// await campus_rec.sync({ force: false }).then(() => console.log('campus_rec table created'))

const app = express()

app.use(cors())
app.use(express.json()) // to support JS7ON-encoded bodies
app.use(
    express.urlencoded({
        // to support URL-encoded bodies
        extended: true,
    })
)

APILoader(app)

app.use(errorHandler)
app.listen(8080, () => {
    console.log('Junyi API Server Running on port 8080')
})
