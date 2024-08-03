import express from 'express'
import constants from '../../constants.js'
import globalRoute from './global.routes.js'

export default (application) => {
  const router = express.Router()

  router.use(constants.routing.GLOBAL_ROOT, globalRoute(application))

  return router
}
