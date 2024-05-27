import { createAndStartApp } from '@/index'
import { Server } from 'node:http'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Test server logic', () => {
    let server: Server

    beforeAll(() => {
        server = createAndStartApp()
    })

    afterAll(() => {
        server.closeAllConnections()
        server.close()
    })

    test('Should get correct CORS preflight and root route response', async () => {
        const preflightResponse = await fetch('http://localhost:3000', {
            method: 'OPTIONS',
        })
        expect(preflightResponse.status).toBe(204)
        expect(
            preflightResponse.headers.get('access-control-allow-methods'),
        ).toBe('GET,OPTIONS,POST')

        const rootRouteResponse = await fetch('http://localhost:3000')
        expect(rootRouteResponse.status).toBe(200)
        expect(await rootRouteResponse.text()).toBe('Hello World!')
    })
})
