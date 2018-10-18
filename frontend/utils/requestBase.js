import axios from 'axios'

export default function () {
  return axios.create({
    baseURL: 'http://harrytportfolio.com:30001'
  })
}
