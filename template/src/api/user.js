import fetch from '@/utils/fetch'

const crapApiUrl = {
  userGet: '/users',
  userAdd: '/users'
}

const realApiUrl = {
  userGet: '/users',
  userAdd: '/users'
}

// const apiUrl = process.env.USE_CRAP_API ? crapApiUrl : realApiUrl


const apiUrl = crapApiUrl

export function getUser() {
  return fetch({
    url: apiUrl.userGet,
    method: 'get'
  })
}

export function addUser() {
  return fetch({
    url: apiUrl.userAdd,
    method: 'post'
  })
}
