import axios from 'axios'
import * as Config from './config'

function getFriendsList (wid) {
  // const flag = arguments[0] ? arguments[0] : 0
  // const pagestart = arguments[1] ? arguments[1] : 0
  // const limit = arguments[2] ? arguments[2] : 5
  // console.log('in getFriendsList')
  // console.log(`pagestart是${pagestart}`)
  // console.log(`limit是${limit}`)
  return axios({
    method: 'post',
    url: `${Config.bokaApi}/member/friendsCustomer`,
    headers: {
      'Authorization': `Bearer ${Config.token}`
    },
    params: {
      wid: wid,
      pagestart: 0,
      limit: 1000
    }
  })
}

export default getFriendsList
