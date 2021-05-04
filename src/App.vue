<template>
  <Home/>
</template>

<script>
import Home from "./views/Home"
export default {
  components:{
    Home
  }
}
</script>

<style>
body{
  margin: 0%;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>
