<template>
    <div style="width: 88vw; height:100vh;">
        <div class="d-flex flex-row" style="height: 38px;">
            <b-button squared name="home" @click="home" style="height: 38px;"><i-house></i-house></b-button>
            <b-button squared name="prev" @click="prev" style="height: 38px;"><i-left></i-left></b-button>
            <b-button squared name="next" @click="next" style="height: 38px;"><i-right></i-right></b-button>
            <b-form @submit.stop.prevent @submit="goto" class="w-100">
                <b-input disabled v-model="src" name="url-input" ref="urlInput" style="border-radius: 0%; height: 38px;"></b-input>
            </b-form>
        </div>
        <div class="content">
            <w-view @did-fail-load="crashed" :ref="`view`" :src="src" v-bind:class="{
                'w-100': !error,
                'hide' : error
            }" style="height: 100%; overflow: auto;"
            httpreferrer="https://kuduskab.bps.go.id"
            :plugins="false"></w-view>
            <div v-bind:class="{
                'w-100 d-flex flex-column justify-content-center align-items-center text-center' : error,
                'hide' : !error
            }" style="height: 100%; overflow: auto;">
                <div class="container">
                    <i-x-eamark></i-x-eamark>
                    <h1>Can't Load the page requested</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import WebView from '@/components/WebView.vue'
    export default {
        components: {
            'w-view' : WebView,
        },
        methods: {
            prev(){
                this.$refs.view.$el.goBack()
            },
            next(){
                this.$refs.view.$el.goForward()
            },
            home(){
                this.$refs.view.$el.loadURL("https://kuduskab.bps.go.id").then(e => {
                    console.log(e)
                    this.error = false
                    this.$refs.urlInput.$el.value = "https://kuduskab.bps.go.id/"
                }).catch(err => {
                    this.error = true
                    console.log(err)
                })
            },
            goto(){
                let url = this.$refs.urlInput.$el.value.includes("http://") || this.$refs.urlInput.$el.value.includes("file://") || this.$refs.urlInput.$el.value.includes("https://") ? this.$refs.urlInput.$el.value : "https://"+this.$refs.urlInput.$el.value
                this.$refs.view.$el.loadURL(url).then(e => {
                    console.log(e)
                    this.error = false
                    this.$refs.urlInput.$el.value = url
                }).catch(err => {
                    this.error = true
                    console.log(err)
                })
            },
            failed(){
                console.log("failed to load")
            },
            crashed(){
                console.log("crashed")
            }
        },
        data() {
            return {
                src : `https://kuduskab.bps.go.id/`,
                error: false
            }
        },
    }
</script>
<style scoped>
    .hide{
        display: none;
    }
    .content{
        height: calc(100% - 38px);
    }
</style>