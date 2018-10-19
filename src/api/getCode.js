import axios from 'axios'
import * as Config from './config'

function getCode (telnum) {
  // const flag = arguments[0] ? arguments[0] : 0
  // const pagestart = arguments[1] ? arguments[1] : 0
  // const limit = arguments[2] ? arguments[2] : 5
  return axios({
    method: 'get',
    url: `${Config.bokaApi}/verifyMobile`,
    headers: {
      'Authorization': `Bearer ${Config.token}`
    },
    params: {
      phone: telnum,
      type: 'apply'
    }
  })
}

export default getCode
