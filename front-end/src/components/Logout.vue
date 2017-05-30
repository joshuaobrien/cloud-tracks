<template>

</template>

<script>
import bus from '../eventBus'
export default {
  name: 'logout',
  data () {
    return {
    }
  },
  
  methods: {
      handleLogout() {
        this.$session.clear();
        bus.$emit('trackChange');
        this.$router.push('/playlists'); // this will force a login -> playlist
      }
  },

  created: function() {
      this.handleLogout();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>