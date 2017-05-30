<template>
    <figure id="content">
        <div id="logo-container">
            <img id="logo" src="../assets/cloud.png" alt="cloud-tracks-logo">
        </div>

        <div id="title">
            <p>{{message}}</p>
        </div>
    </figure>
</template>

<script>
export default {
  name: 'logo-box',
  props: {
      message: {
          default: "cloud tracks"
      }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content-row {
    width: 100%;
    margin: auto;
    margin-top: 200px;
    position: relative;
    /*background-color: green;*/
}

#content {
    margin: auto;
    position: relative;
    width: 100%;
    /*background-color: blue;*/
    text-align: center;
}

#content>div {
    display: block;
    box-sizing: border-box;
}

#logo-container {
    width: 150px;
    height: 100px;
    margin: auto;
    /*background-color: pink;*/
}

#logo {
    width: 150px;
}

#title {
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    font-size: 18px;
    letter-spacing: 24px;
    color: #282828;
    text-indent: 36px;
    opacity: 0.8;
}
</style>