import axios from 'axios'
import * as Config from './config'

function getUserInfo () {
  return axios({
    method: 'get',
    url: `${Config.bokaApi}/user/show`,
    headers: {
      'Authorization': `Bearer ${Config.token}`
    }
  })
}

export default getUserInfo
