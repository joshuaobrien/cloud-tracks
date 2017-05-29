<template>
  <div id="window">
        <div id="content-row">
            <div id="content">
                <glow></glow>
                <logo-box message="login"></logo-box>
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
                <div class="under-box" @click="">
                    <router-link to="/register">
                        <p class="">create an account</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LogoBox from './LogoBox.vue'
import Glow from './Glow.vue'
export default {
  name: 'login',
  data () {
    return {
        userName: "",
        userPass: ""
    }
  },
  components: {
      LogoBox,
      Glow
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
    /*background-color: red;*/
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
    border: none
}

.button:hover,
.button:focus {
    /*margin-left: 5px;*/
    /*border-width: 1px;*/
    box-shadow: 0 5px 20px -10px black;
    cursor: pointer;
}

.under-box {
    text-align: center;
    width: 100%;
    /*background-color: blue;*/
    margin-top: 20px;
    color: #282828;
    opacity: 0.5;
    font-size: 13px;
    letter-spacing: 1px;
}

.under-box:hover {
    opacity: 0.8;
}

p {
    display: inline-block;
    width: 180px;
    padding: 16px;
}
</style>