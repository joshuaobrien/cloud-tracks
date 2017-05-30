<template>
  <div id="window">
        <div id="content-row">
            <div id="content">
                <glow></glow>
                <logo-box></logo-box>
                <form id="paste-box-container" @submit.prevent="linkSubmit">
                    <input type="text" spellcheck="false" v-model="userLink">
                    <div id="button-container">
                        <div class="icon-button" id="download-button" @click="linkSubmit">
                            <img src="../assets/cloud-download.png">
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
import LogoBox from './LogoBox.vue'
import Glow from './Glow.vue'
export default {
  name: 'landing',
  data () {
    return {
        userLink: "https://www.youtube.com/watch?v=MOFG0dtkGRk"
    }
  },
  components: {
      LogoBox,
      Glow
  },
  methods: {
      linkSubmit() {

            let newLink = {
                url: this.userLink
            };
            this.$http.post('https://cloudtracks.sadnc.com/api/test/download', newLink, {
                emulateJSON: true
            })
        }
  },

  created: function() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #content-row {
    width: 100%;
    margin: auto;
    margin-top: 175px;
    position: relative;
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

  #glow-dot {
      width: 1px;
      height: 1px;
      margin: auto;
      background-color: white;
      box-shadow: 0 0 300px 300px white;
      z-index: -1;
  }

  form {
      position: relative;
      display: inline-block;
      max-width: 620px;
      min-width: 520px;
  }

  #paste-box-container {
      margin-top: 30px;
      width: 100%;
      height: 40px;
  }

  input {
      width: 97%;
      height: 90%;
      padding-left: 12px;
      outline: 0;
      border: none;
      box-shadow: none;
      background-color: #fafafa;
      font-size: 14px;
      letter-spacing: 1px;
      color: #525252;
      border-radius: 2px;
      border-width: 2px;
      border-style: solid;
      border-color: pink;
      box-shadow: 0 10px 20px -10px lightgray;
  }

  input:hover {
      box-shadow: 0 8px 20px -10px gray;
  }

  input:focus {
      outline: 0;
      border-color: lightpink;
      box-shadow: 0 8px 20px -10px gray;
      background-color: white;
  }

  input:focus~#button-container {
      background-color: white;
  }

  #button-container {
      float: right;
      position: absolute;
      right: 5px;
      bottom: 0px;
      text-align: right;
      background-color: #fafafa;
  }

  .icon-button {
      padding-right: 8px;
      padding-left: 12px;
  }

  .icon-button>img {
      padding: 4px;
      opacity: 0.5;
  }

  .icon-button>img:hover {
      cursor: pointer;
      opacity: 0.75;
  }
</style>
