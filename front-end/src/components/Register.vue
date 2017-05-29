<template>
  <div id="window">
        <div id="content-row">
            <div id="content">
                <glow></glow>
                <logo-box message="create account"></logo-box>
                <form @submit.prevent="newUserSubmit">
                    <div id="inputs-container">
                            <input class="reg-input" type="text" spellcheck="false" placeholder="username" v-model="userName">
                            <input class="reg-input" type="password" placeholder="password" v-model="userPass">
                            <input class="reg-input" type="password" placeholder="confirm password" v-model="userPassConfirm">
                    </div>

                    <div id="button-container">
                        <input type="submit" value="\\ create" class="button" id="go-button ">
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
  name: 'register',
  data () {
    return {
        userName: "",
        userPass: "",
        userPassConfirm: ""
    }
  },
  components: {
      LogoBox,
      Glow
  },
  methods: {
        newUserSubmit() {
            if (this.userName === "") {
                alert("Please enter a username");
                return;
            }

            if (this.userPass === "") {
                alert("Please enter a password");
                return;
            }

            if (this.userPass !== this.userPassConfirm) {
                alert("Passwords do not match");
                return;
            }

            let newUser = {
                username: this.userName,
                password: this.userPass
            };

            this.$http.post('http://localhost:4567/test/create_user', newUser, {
                emulateJSON: true
            })
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
    margin-top: 18px;
    text-align: center;
}

.button {
    background-color: transparent;
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    height: 45px;
    margin-left: 4px;
    margin-right: 4px;
    color: #282828;
    font-size: 12px;
    line-height: 45px;
    letter-spacing: 4px;
    outline: 0;
    border: none;
}

.button:hover,
.button:focus {
    background-color: transparent;
    box-shadow: 0 5px 20px -10px black;
    cursor: pointer;
}
</style>