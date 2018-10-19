import axios from 'axios'
import * as Config from './config'

function getTimelines () {
  const wid = arguments[0] ? arguments[0] : 0
  const type = arguments[1] ? arguments[1] : 'retailer'
  const tagid = arguments[2] ? arguments[2] : 0
  const pagestart = arguments[3] ? arguments[3] : 0
  const limit = arguments[4] ? arguments[4] : 10
  return axios({
    method: 'post',
    url: `${Config.bokaApi}/timeline/list`,
    headers: {
      'Authorization': `Bearer ${Config.token}`
    },
    params: {
      wid: wid,
      type: type,
      tagid: tagid,
      pagestart: pagestart,
      limit: limit
    }
  })
}

export default getTimelines
