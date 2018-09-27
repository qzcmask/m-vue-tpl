import axios from 'axios'

// CORS Cross-Origin Macro
const ALLOW_ORIGIN = 'Access-Control-Allow-Origin'
const ALLOW_HEADERS = 'Access-Control-Allow-Headers'
const ALLOW_METHODS = 'Access-Control-Allow-Methods'

const CONTENT_TYPE = 'Content-Type'
const X_AUTH_TOKEN = 'x-auth-token'

const isDev = process.env.NODE_ENV === 'development'

// axios settings
axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.withCredentials = true
axios.defaults.headers[CONTENT_TYPE] = 'application/json'

// CORS configs
// axios.defaults.headers[ALLOW_ORIGIN] = '*'
// axios.defaults.headers[ALLOW_HEADERS] = '*'
// axios.defaults.headers[ALLOW_METHODS] = '*'

// create axios instance
const service = axios.create()

// request interceptor
service.interceptors.request.use(config => {
  // you can modify the request headers here
  return config
}, error => {
  Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(response => {
  // response interceptors can be used to permission-control
  const data = response.data
  console.log('Response: ', response)
  if (data.code !== 0) {
    // have error
    return [data.message, null]
  } else {
    // request success
    return [null, response.data.data]
  }
}, error => {
  return [Promise.reject(error), null]
})

export default service
