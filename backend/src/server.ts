import express, { Express } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
console.log("dotenv", dotenv);

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())

app.get('/', (req, res) => { res.send('Server is Running')})
