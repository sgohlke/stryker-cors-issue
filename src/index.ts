import cors from 'cors'
import express from 'express'
import { Server } from 'node:http'

export function createAndStartApp(): Server {
    const app = express()

    app.use(
        cors({
            methods: ['GET', 'OPTIONS', 'POST'],
            origin: 'http://localhost:3000',
        }),
    )

    app.get('/', (_request, response) => {
        response.send('Hello World!')
    })

    return app.listen({ port: 3000 })
}
