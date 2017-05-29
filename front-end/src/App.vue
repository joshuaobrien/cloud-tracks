<template>
  <div id="app">

    <div class="navbar">

			<ul class="navbar-link-container">
				<li><router-link to="/">
					<div class="nav-button home-button">___</div>
					<!--<img class="home-image" src="../static/cloud.png">-->
				</router-link></li>

				<li><router-link to="/login">
					<div class="nav-button">{{loginButtonText}}</div>
				</router-link></li>

				<li><router-link to="/playlists">
					<div class="nav-button">playlists</div>
				</router-link></li>
			</ul>
    </div>

    <router-view></router-view>

		<div class="footer-container">
			<button type="button">PLAY</button>
			<button type="button">PAUSE</button>
		</div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        loginButtonText: "login"
    }
  },
  methods: {
	  handleSession() {
		  if (this.$session.exists()) {
			  this.loginButtonText = "logout";
		  } else {
			  this.loginButtonText = "login";
		  }
	  }
  },
  created: function() {
	  this.handleSession();
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
	color: white;
	background-image: url("../static/cloud.png");
	background-size: auto 25px;
	background-repeat: no-repeat;
	background-position: center center;
}

.home-button:hover {
	color: white;
}

.footer-container {
	position:fixed;
	height:50px;
	background-color: #f2f2f2;
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
</style>
