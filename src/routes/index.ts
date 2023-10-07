import express from 'express'
import chat from './chatRoutes'

const router = express.Router()

router.get('/healthcheck', ((_,res) => res.sendStatus(200)))

router.use(chat)

export default router