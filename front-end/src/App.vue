<template>
  <div id="app">

    <nav class="navbar">

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
    </nav>

    <router-view></router-view>

		<footer class="footer-container">
			<audio src="" controls autoplay/>
			<p id="nowplaying">Now Playing: Kanye West - Power</p>
		</footer>

  </div>
</template>

<script>
import bus from './eventBus'
export default {
  name: 'app',
  data () {
    return {
        loginButtonText: "login",
		loginLink: "/login",
		isMobile: false,
		track: ""
    }
  },

  methods: {
	  handleSession() {
		  if (!this.$session.exists()) {
			this.$session.start();
			this.$session.set('prv', '/');
		  }
	  },
	  makePath(track, playlist) {
		  return "/media/" + playlist.playlist_id + "/" + track.id + ".m4a";
	  }
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
			var playlist = this.$session.get('playlist');
			var tracks = this.$session.get('tracks');
			var index = this.$session.get('index');
			var track = tracks[index];

			var path = "/media/" + playlist.playlist_id + "/" + track.id + ".m4a"
			$('audio').src = this.makePath(this.$session.get('track'));
			$('audio').load();

			$('#nowplaying').innerHTML = track.artist + " - " + track.name;
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
	height:45px;
	width: 100%;
	background-color: #fbfbfb;
	bottom:0px;

	color: #282828;
	font-size: 13px;

	text-align: center;
	box-shadow: 0 -7px 20px -10px lightgray;
}

.footer-container > p {
	position: absolute;
	margin-left: 15px;
	bottom: 16px;
	display: inline-block;
}

button {
	width: 75px;
	height: 100%;
}

audio {
	margin-top: 5px;
	width: 640px;
	margin-left: -250px;
	background-color: #f2f2f2;
}
</style>
