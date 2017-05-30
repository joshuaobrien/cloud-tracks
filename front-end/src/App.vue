<template>
  <div id="app">

    <div class="navbar">

			<ul class="navbar-link-container">
				<li ><router-link to="/">
					<div class="nav-button home-button">home</div>
					<!--<img class="home-image" src="../static/cloud.png">-->
				</router-link></li>

				<li ><router-link to="/playlists">
					<div class="nav-button">playlists</div>
				</router-link></li>

				<li><router-link v-bind:to="loginLink">
					<div class="nav-button">{{getLoginButtonText}}</div>
				</router-link></li>
			</ul>
    </div>

    <router-view></router-view>

		<div class="footer-container">
			<audio src="" controls autoplay/>
		</div>

  </div>
</template>

<script>
import bus from './eventBus'
export default {
  name: 'app',
  data () {
    return {
        loginButtonText: "login",
		loginLink: "/login"
    }
  },

  methods: {
	  handleSession() {
		  if (!this.$session.exists()) {
			this.$session.start();
			this.$session.set('prv', '/');
		  }
	  },
  },

  computed: {
	  getLoginButtonText: {
		  cache: false,
		  get() {
			if (this.$session.has('tok')) {
				this.loginLink = '/logout';
				return "logout";
		  	} else {
				  this.loginLink = '/login';
			  return "login";
			}
		  }
	  },
  },

  created: function() {
	  this.handleSession();
		bus.$on('trackChange', function() {
			$('audio').src = this.$session.get('track');
			$('audio').load();
		});
  }
}
</script>

<style>
.navbar {
	/*background-color: red;*/
	background-color: white;
	background-color: #fcfcfc;
	position: fixed;
	width: 100%;
	top: 0;
	height: 50px;

	text-align: center;
	z-index: 1000;

	box-shadow: 0 7px 20px -10px lightgray;
}

.navbar-link-container > li {
	display: inline-block;
	width: 150px;
	/*background-color: yellow;*/
}

.nav-button {
	width: 100%;
	/*background-color: blue;*/
	/*background-color: #ececec;*/
	display: inline-block;

	color: #626262;
	font-size: 12px;
	letter-spacing: 4px;
	line-height: 50px;

	border-radius: 2px;
}

.nav-button:hover {
	color: black;
	cursor: pointer;
	/*color: #ececec;*/
	/*background-color: #282828;*/
	box-shadow: 0 15px 20px -20px #282828;
}

.home-button {
	color: transparent;
	background-image: url("../static/full-cloud.png");
	background-size: auto 25px;
	background-repeat: no-repeat;
	background-position: center center;
	opacity: 0.7;
}

.home-button:hover {
	color: transparent;
	opacity: 0.9;
}

.footer-container {
	position:fixed;
	height:50px;
	background-color: #fbfbfb;
	bottom:0px;
	left:0px;
	right:0px;
	margin-bottom:0px;

	text-align: center;
	box-shadow: 0 -7px 20px -10px lightgray;
}

button {
	width: 75px;
	height: 100%;
}

audio {
	width: 700px;
	background-color: #f2f2f2;
}
</style>
