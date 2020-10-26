<template>
  <div>
    <form @submit.prevent="search">
      <input v-model="username" type="text" placeholder="Github Username">
      <button>Search</button>
    </form>
     <h1>{{gottenUsername}}</h1> 
     <ul>
       <li v-for="(item, index) in repos" :key="index">
         {{item.name}}
       </li>
       <img :src="avatar" alt="" srcset="">
     </ul>
  </div>
</template>

<script setup>
import {ref} from "vue"
    export const username = ref(null)
    export const gottenUsername = ref(null)
    export const repos = ref('')

    export const avatar = ref('')

    export const search = () => {
      if(username.value == null){
        alert('empty')
      }else{
          gottenUsername.value = username.value
          username.value = ''
          fetch(`https://api.github.com/users/${gottenUsername.value}`)
          .then((response) => response.json())
          .then((data) => {
            avatar.value = data.avatar_url
            console.log(data)
          })

          fetch(`https://api.github.com/users/${gottenUsername.value}/repos`)
          .then((response) => response.json())
          .then((data) => {
            repos.value = data
          })
      }
      
    }
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 20px;
}
</style>
