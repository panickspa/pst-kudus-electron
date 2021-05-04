<template>
    <webview @did-start-loading="$emit('loading', src)" @did-stop-loading="$emit('loaded', src)" :src="src" :style="`width: ${width}; height: ${height}`" ></webview>
</template>

<script>
    export default {
        props:["src", "width", "height"]
    }
</script>