import { Router } from 'express'

import { statusRouter } from './status.routes'

const routes = Router()

routes.use('/api/status', statusRouter)

export { routes }
