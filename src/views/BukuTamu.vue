<template>
    <w-view :src="`https://perpustakaan.bps.go.id/digilib/guestbook`" :width="`88vw`" :height="`100vh`"></w-view>
</template>

<script>
import WebView from '@/components/WebView.vue'
    export default {
        components: {
            'w-view' : WebView
        },
    }
</script>