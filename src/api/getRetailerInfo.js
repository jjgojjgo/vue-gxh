import axios from 'axios'
import * as Config from './config'

function getRetailerInfo (uid) {
  return axios({
    method: 'get',
    url: `${Config.bokaApi}/retailer/info?uid=${uid}`,
    headers: {
      'Authorization': `Bearer ${Config.token}`
    }
  })
}

export default getRetailerInfo
