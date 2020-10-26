<template>
  <div>
    <Nav></Nav>
    <form @submit.prevent="search">
      <input v-model="username" type="text" placeholder="Github Username">
      <button>Search Username</button>
    </form>
    <div class="profile">
      <img class="profile_img" v-if="clone"  src='./assets/github.png' alt="" srcset="">
      <img class="profile_img" :src='avatar' alt="" srcset="">
      <div class="profile_about">
        <h1><span class="username"> {{gottenUsername || 'Username'}} </span> <span>First {{amount || 0}} repos</span></h1>
        <h4><span>{{followers}} - followers</span><span>{{following}} - following</span></h4>
        <h2>Website - <a :href="website" target="_blank">{{website}}</a></h2>
      </div>
    </div>
    <ul>
      <h3>REPOS -</h3>
      <li v-for="(item, index) in repos" :key="index">{{item.name}}  - <a :href="item.html_url" target="_blank">Link</a></li>
    </ul>
     
  </div>
</template>

<script setup>
import {ref} from "vue"

//Used refs
    export const username = ref(null)
    export const gottenUsername = ref(null)
    export const repos = ref('')
    export const avatar = ref('')
    export const followers = ref('')
    export const following = ref('')
    export const website = ref('')
    export const amount = ref('')
//Img clone
    export const clone = ref(true)



//fetch function
    export const search = () => {
      if(username.value == null){
        alert('Set a username')
      }else{
          gottenUsername.value = username.value
          username.value = ''
          fetch(`https://api.github.com/users/${gottenUsername.value}`)
          .then((response) => response.json())
          .then((data) => {
            avatar.value = data.avatar_url
            followers.value = data.followers
            following.value = data.following
            website.value = data.blog
            console.log(data)
            clone.value = false
          })

          fetch(`https://api.github.com/users/${gottenUsername.value}/repos`)
          .then((response) => response.json())
          .then((data) => {
            repos.value = data
            amount.value = data.length
            clone.value = false
          })
      }
      
    }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap');
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'quicksand';

  --radis: 5px;
}
#app {
  padding: 20px;
}
form{
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-between;
}
form input{
  width: 60%;
  padding: 0 10px;
  outline: none;
  font-size: 20px;
  border: 2px solid #E8E8E8;
  border-radius: var(--radis)
}
form button{
  width: 35%;
  font-size: 20px;
  background: #5981CF;
  border: none;
  outline: none;
  color: white;
  border-radius: var(--radis)
}
/* PROFILE */
.profile{
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.profile_img{
  border-radius: 50%;
  width: 350px;
}
.profile_about{
  width: 60%;
}
.profile_about h1{
  padding: 20px 30px;
  width: 100%;
  background: #EEEEEE;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--radis)
}
.profile_about h1 .username{
  text-transform: uppercase;
}
.profile_about h4{
  padding: 20px 0;
  width: 50%;
  margin: 5px 0; 
  display: flex;
  justify-content: space-between;
  align-items: center;
}
ul li{
  list-style: none;
  padding: 20px;
  background: #EEEEEE;
  margin: 10px 0;
  border-radius: var(--radis);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media screen and (max-width: 1020px) {
  form button, form input{
    font-size: 14px;
    padding: 0 5px;
  }
  .profile{
    flex-direction: column
  }
  .profile_img{
    margin-bottom: 20px;
    width: 200px;
  }
  .profile_about{
    width: 100%;
  }
  .profile_about h1{
    font-size: 15px;
  }
  .profile_about h4{
    width: 100%;
  }
  .profile_about h2{
    font-size: 15px;
  }
}
</style>