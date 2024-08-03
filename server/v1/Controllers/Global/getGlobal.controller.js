import { error, success } from '../../Utils/responseAPI.util.js'

export default {
  test: async (req, res, io) => {
    // io.to('blackjack-room').emit('time', new Date())
    // if (response) {
    //   return res
    //     .status(200)
    //     .send(success('success and stuff', res.statusCode, response))
    // }
    //
    // return res
    //   .status(400)
    //   .send(error('Something went wrong', res.statusCode, {}))
  },
}
