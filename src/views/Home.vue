<template>
  <div class="home">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div v-if="$route.path != '/option'" class="navigation bg-danger text-center pr-2 pl-2">
      <b-button 
        @click="changeSourceUrl(`/`)"
        squared variant="light" 
        class="menu mb-3"
      >
        <div class="d-flex flex-column justify-content-center">
          <span>
            <i-house font-scale="3"></i-house>
          </span>
          <span>
            Home
          </span>
        </div>
      </b-button>
      <b-button 
        @click="changeSourceUrl(`/perpustakaan`)" 
        squared variant="light" 
        class="menu mb-3">
        <div class="d-flex flex-column justify-content-center">
          <span>
            <i-person font-scale="3"></i-person>
          </span>
          <span>
            Buku Tam
          </span>
        </div>
      </b-button>
      <b-button @click="changeSourceUrl(`/survey`)" squared variant="light" class="menu mb-3">
        <div class="d-flex flex-column justify-content-center">
          <span>
            <i-survey font-scale="3"></i-survey>
          </span>
          <span>
            Survey Kepuasan
          </span>
        </div>
      </b-button>
      <b-button @click="changeSourceUrl(`/bpskudus`)" squared variant="light" class="menu">
        <img style="width: 80%; height: auto;" src="../assets/BPS black.png">
        <span>Website <br>BPS Kudus</span>
      </b-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */

export default {
  name: 'Home',
  methods: {
    changeSourceUrl(evt){
      if(evt.includes('http')) {
        this.$store.state.src = evt
        if(this.$route.path != "/webview") this.$router.push("/webview")
      }
      else if(this.$route.path != evt) this.$router.push(evt)
    },
    showSpinner(evt){
      this.spinner = evt
      console.log(evt ? 'loading...' : 'loaded!!', this.src, process.env)
    }
  },
  data() {
    return {
      src :"https://perpustakaan.bps.go.id/digilib/guestbook",
      spinner: false
    }
  },
}
</script>
<style>
  .home{
    display: flex;
  }
  .navigation{
    display: flex;
    flex-direction: column;
    vertical-align: center;
    justify-content: center;
    align-items: center;
    width: 12vw;
  }
  .menu{
    height: 150px;
    width: 150px;
    color: red;
  }
</style>
