import axios from 'axios'
import * as Config from './config'

function getOrders () {
  const flag = arguments[0] ? arguments[0] : 0
  const pagestart = arguments[1] ? arguments[1] : 0
  const limit = arguments[2] ? arguments[2] : 5
  return axios({
    method: 'get',
    url: `${Config.bokaApi}/order/orderList/user`,
    headers: {
      'Authorization': `Bearer ${Config.token}`
    },
    params: {
      flag: flag,
      pagestart: pagestart,
      limit: limit
    }
  })
}

export default getOrders
