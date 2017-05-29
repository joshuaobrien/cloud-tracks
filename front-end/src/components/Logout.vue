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
      destroySession() {
          this.$session.destroy();
      }
  },

  created: function() {
      this.destroySession();
      this.$router.push('/');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>