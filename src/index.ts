import "dotenv/config";
import express from "express"
import cors from 'cors'
import router from "./routes"

const app = express()
const port = 5000

app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.use(router)

app.get('/', (_,res)=>{
    res.send("App is running")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})