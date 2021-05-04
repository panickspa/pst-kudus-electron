<template>
  <div class="about">
    <div class="slideshow-container" style="width: 100%; height:100%; overflow: hidden;">
      <div class="slides fades" v-for="wall in wallList" :key="`wallpape-${wall.id}`">
        <div class="wallpape">
          <img class="wall-img" :src="wall.path">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const {ipcRenderer} = require("electron")
export default {
  beforeMount(){
    ipcRenderer.send("get-wall")
    ipcRenderer.on("retrive-wall", (even, arg) => {
      this.wallList = arg
    })
  },
  mounted(){
    this.showSlides();
    if(this.caraousel) clearInterval(this.caraousel)
    this.carousel = setInterval(function(){
      this.showSlides();
    }.bind(this), 5000)
  },
  methods:{
    showSlides(){
      // console.log(this.slideIndex)
      var i;
      var slides = document.getElementsByClassName("slides");
      if(slides.length){  
        // if (n < 1) {this.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            if(i !== this.slideIndex-1)
            slides[i].style.display = "none";  
        }
        slides[this.slideIndex-1].style.display = "block";
        this.slideIndex = this.slideIndex+1
        if (this.slideIndex > slides.length) {
          this.slideIndex = 1
        }
      }
    }
  },
  data() {
    return {
      wallList: [],
      options:{
        rewind: true,
        type: 'loop',
        width: "100%",
        perPage: 1,
        gap: '0px',
        autoplay: true,
        arrows: 'slider',
      },
      slideIndex: 1,
      caraousel: null
    }
  },
  beforeDestroy(){
    clearInterval(this.caraousel)
  },
  // watch:{
  //   '$router': {
  //     deep: true,
  //     handler: function(){
  //       if(this.caraousel) clearInterval(this.caraousel)
  //     }
  //   }
  // }
}
</script>
<style>
  .about{
    width: 88vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .wall-img{
    position: absolute;
    width: 100%;
    height: auto;
  }
  .wallpape{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .slideshow-container {
    position: relative;
    margin: auto;
  }
  .slides {
    display: block;
    width: 100%;
    height: 100%;
  }
  img {vertical-align: middle;}
  .fades {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 2s;
    animation-name: fade;
    animation-duration: 1.5s;
  }

@-webkit-keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}
</style>