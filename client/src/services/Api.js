import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://localhost:7777`
   // baseURL: `https://bouldershare-mhaccxlned.now.sh`
  })
}
