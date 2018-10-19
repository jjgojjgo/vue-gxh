import axios from 'axios'
import * as Config from './config'

function applySeller (code, telnum, name) {
  // const flag = arguments[0] ? arguments[0] : 0
  // const pagestart = arguments[1] ? arguments[1] : 0
  // const limit = arguments[2] ? arguments[2] : 5
  return axios({
    method: 'post',
    url: `${Config.bokaApi}/retailer/apply`,
    headers: {
      'Authorization': `Bearer ${Config.token}`
    },
    params: {
      verifycode: code,
      mobile: telnum,
      truename: name
    }
  })
}

export default applySeller
