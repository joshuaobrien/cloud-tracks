<template>
  <div id="window">
        <div id="content-row">
            <div id="content">
                <logo-box></logo-box>
                <div id="glow-dot"></div>
                <form @submit.prevent="loginSubmit">
                    <div id="inputs-container">
                        <div class="reg-input">
                            <input type="text" spellcheck="false" id="user-box" v-model="userName" placeholder="username">
                        </div>
                        <div class="reg-input">
                            <input type="password" id="pass-box" v-model="userPass" placeholder="password">
                        </div>
                    </div>

                    <div id="button-container">
                        <input type="submit" value="\\ login" class="button" id="go-button ">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import LogoBox from './LogoBox.vue'

export default {
  name: 'login',
  data () {
    return {
        userName: "",
        userPass: ""
    }
  },
  components: {
      LogoBox
  },
  methods: {
        loginSubmit() {
            if (this.userName === "") {
                alert("Please enter a username");
                return;
            }

            if (this.userPass === "") {
                alert("Please enter a password");
                return;
            }

            let loginData = {
                username: this.userName,
                password: this.userPass
            };

            this.$http.post('http://localhost:4567/test/login', loginData, {
                emulateJSON: true
            }).then(response => {
                if (response.status == 201) {
                    var responseData = response.body
                    if (responseData == 'Success') {
                        return;
                    }
                }
                alert("Login failed");
            }, response => {
                // error callback
                alert("Well cooked");
            });
        }
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

  #glow-dot {
      width: 1px;
      height: 1px;
      margin: auto;
      background-color: white;
      box-shadow: 0 0 300px 300px white;
      z-index: -1;
  }

  form {
      display: inline-block;
      width: 300px;
      margin-top: 30px;
      /*background-color: red;*/
  }

  .reg-input {
      margin-top: 12px;
      position: relative;
  }

  input {
      width: 100%;
      height: 32px;
      padding-left: 12px;
      padding-right: 12px;
      margin-left: -12px;
      outline: 0;
      border: none;
      box-shadow: none;
      background-color: #f8f8f8;

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

  #button-container {
      margin: 0 auto;
      margin-top: 24px;
      text-align: center;
  }

  .button {
      box-sizing: border-box;
      display: inline-block;
      width: 150px;
      height: 45px;
      /*background-color: yellow;*/
      margin-left: 4px;
      margin-right: 4px;
      background-color: #fcfcfc;
      color: #282828;
      font-size: 12px;
      line-height: 45px;
      letter-spacing: 4px;
      outline: 0;
      border: none;
  }

  .button:hover,
  .button:focus {
      /*margin-left: 5px;*/
      border-width: 1px;
      box-shadow: 0 0 2px 0 #737373;
      cursor: pointer;
  }
</style>