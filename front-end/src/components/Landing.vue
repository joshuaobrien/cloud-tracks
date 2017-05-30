<template>
  <div id="window">
        <div id="content-row">
            <div id="content">
                <glow></glow>
                <logo-box></logo-box>
                <form id="paste-box-container" @submit.prevent="linkSubmit">
                    <input type="text" spellcheck="false" v-model="userLink" v-bind:class="{ 'blocked': isDownloading}">
                    <div id="button-container">
                        <div class="icon-button" id="download-button" @click="linkSubmit">
                            <img src="../assets/cloud-download.png">
                        </div>
                    </div>
                </form>

                <div class="under-box" @click="">
                    <p v-if="isDownloading">{{statusMessage}}</p>
                </div>

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
        userLink: "https://www.youtube.com/watch?v=MOFG0dtkGRk",
        statusMessage: "DOWNLOADING...",
        isDownloading: false
    }
  },
  components: {
      LogoBox,
      Glow
  },
  methods: {
      linkSubmit() {

          if (!this.$session.has('tok')) {
                alert("Please login to access this feature")
                this.$router.push("/login");
                return;
          }

            let newLink = {
                url: this.userLink
            };
            // this.$http.post('http://localhost:4567/test/download', newLink, {
            this.$http.post('https://cloudtracks.sadnc.com/api/test/download', newLink, {
                emulateJSON: true
            }).then(response => {
                if (response.status === 420) {
                    alert("Bad link: please try another video");
                    return;
                }

                if (response.status === 421) {
                    alert("This video has already been downloaded");
                    return;
                }

                // TURN THIS ON IFF THERE IS A WAY TO TURN IT OFF!!!
                // this.isDownloading = true;

            }, response => {
                // error callback
                alert("Something went wrong: ensure you only paste YouTube links");
            });
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

  .blocked {
      color: lightgray;
      background-color: #f8f8f8;
  }

  .blocked:focus {
      color: lightgray;
      background-color: #f8f8f8;
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

  .under-box {
    text-align: center;
    width: 100%;
    /*background-color: blue;*/
    margin-top: 20px;
    color: #282828;
    opacity: 0.5;
    font-size: 13px;
    letter-spacing: 2px;
}

p {
    display: inline-block;
    width: 180px;
    padding: 16px;
}
</style>
