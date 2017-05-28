<template>
    <div id="glow-dot"></div>
</template>

<script>
export default {
  name: 'glow',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#glow-dot {
    width: 1px;
    height: 1px;
    margin: auto;
    background-color: white;
    box-shadow: 0 0 300px 300px white;
    z-index: -1;
}
</style>
