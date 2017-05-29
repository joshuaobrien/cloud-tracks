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
        this.$router.push('/');
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