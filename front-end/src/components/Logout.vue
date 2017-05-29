<template>

</template>

<script>
export default {
  name: 'logout',
  data () {
    return {
    }
  },
  
  methods: {
      handleLogout() {
        this.$session.clear();
        this.$router.push('/playlist'); // this will force a login -> playlist
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