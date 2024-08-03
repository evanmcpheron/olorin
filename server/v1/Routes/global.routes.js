import express from 'express'
import { globalRoute } from '../Controllers/Global/globalIndex.controller.js'

export default ({ app }) => {
  const router = express.Router()

  // @route    GET /v1/global/test
  // @desc     test GET route
  // @access   PUBLIC
  router.get(
    '/test',
    async (req, res) => await globalRoute.get.test(req, res, app.io)
  )

  return router
}
