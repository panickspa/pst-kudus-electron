<template>
    <webview v-if="src.includes('http')" @did-start-loading="$emit('loading', src)" @did-stop-loading="$emit('loaded', src)" :src="src" :style="`width: ${width}; height: ${height}`" ></webview>
    <survey v-else></survey>
</template>

<script>
    import Survey from "../views/Survey"
    export default {
        props:["src", "width", "height"],
        components:{
            survey: Survey
        }
    }
</script>