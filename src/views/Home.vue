<template>
  <div class="home">
    <w-view @loading="showSpinner(true)" @loaded="showSpinner(false)" :src="src" :width="`90vw`" :height="`100vh`"></w-view>
    <div class="navigation bg-danger pr-2 pl-2">
      <b-button 
        @click="changeSourceUrl(`https://perpustakaan.bps.go.id/digilib/guestbook`)" 
        squared variant="light" 
        class="menu mb-3">
        <div class="d-flex flex-column justify-content-center">
          <span>
            <i-person font-scale="3"></i-person>
          </span>
          <span>
            Buku Tamu
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
      <b-button @click="changeSourceUrl(`https://kuduskab.bps.go.id/`)" squared variant="light" class="menu">Website BPS Kabupaten Kudus</b-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import WebView from '@/components/WebView.vue'

export default {
  name: 'Home',
  components: {
    'w-view' : WebView
  },
  methods: {
    changeSourceUrl(evt){
      this.src=evt
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
    width: 12vw;
  }
  .menu{
    height: 150px;
    width: 150px;
    color: red;
  }
</style>
