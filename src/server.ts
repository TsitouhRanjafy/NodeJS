import dotenv from "dotenv"
import express, { Application, urlencoded, Request, Response} from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { createServer } from 'node:http'
import memcached from 'memcached'

dotenv.config();
const app: Application = express();
const server = createServer(app);
const PORT = process.env.PORT || 4000;
const Memcached = new memcached('127.0.0.1:11211',{ retries: 5,remove: true })

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    try {
        Memcached.get('otp',(err,data) => {
            if (!err){
                res.status(StatusCodes.OK).send(`
                    <h1 style="color:green;font-family: sans-serif;">OTP: ${ data }</h1>
                    `)
                return
            }
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`
                <h1 style="color:red;font-family: sans-serif;">${ ReasonPhrases.INTERNAL_SERVER_ERROR }</h1>
            `)
        })
    } catch (error) {
        throw error
    }
})

app.post('/',(req: Request, res: Response) => {
    const { otp } = req.query

    if (!otp){
        res.status(StatusCodes.BAD_REQUEST).send({
            "status": ReasonPhrases.BAD_REQUEST,
            "message": "query otp required"
        })
        return;
    }

    Memcached.set('otp',otp,900,(err) => {
        if (err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                "status": ReasonPhrases.INTERNAL_SERVER_ERROR,
                "message": "erreur lors du caching"
            })
            return;
        }
    })
    res.status(StatusCodes.OK).send({
        "status": ReasonPhrases.OK,
        "message": "otp cached"
    })
})


server.listen(PORT, () => {
    console.log(` server running at http://localhost:${PORT}`);
})