<template>
  <div id="app-container">
    <header>
      <h1><img src="~@/assets/images/device.svg"> m-vue-tpl</h1>
      <p>A simple vue structure, created by {{ name }}.</p>
    </header>
    
    <nav>
      <ul>
        <router-link tag="li" to="/home">
          <a>Home</a>
        </router-link>
        <router-link tag="li" to="/about">
          <a>About</a>
        </router-link>
      </ul>
    </nav>
    
    <div>
      <button @click="getUser">send get request</button>
      <button @click="addUser">send post request</button>
    </div>
    
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {getUser, addUser} from '@/api/user'
  import {mapGetters} from 'vuex'
  
  export default {
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods: {
      async getUser() {
        let err, data
        [err, data] = await getUser()
        if (err) {
          return console.log('[Error]：', err)
        }
        
        console.log('Success, data: ', data)
      },
      async addUser() {
        let err, data
        [err, data] = await addUser()
        if (err) {
          return console.log('[Error]：', err)
        }
        
        console.log('Success, data: ', data)
      }
    }
  }
</script>

<style lang="stylus">
  @import '~@/assets/styles/global.styl'
</style>
