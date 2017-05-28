<template>
  <div id="app">

    <div class="navbar">

			<ul class="navbar-link-container">
				<li><router-link to="/">
					<div class="nav-button">home</div>
				</router-link></li>

				<li><router-link to="/login">
					<div class="nav-button">login</div>
				</router-link></li>

				<li><router-link to="/register">
					<div class="nav-button">register</div>
				</router-link></li>

				<li><router-link to="/playlists">
					<div class="nav-button">playlists</div>
				</router-link></li>

				<li><router-link to="/tracks">
					<div class="nav-button">tracks</div>
				</router-link></li>
			</ul>
      <!--<a class="help">
        <router-link to="/">Home</router-link>
      </a>

      <a>
        <router-link to="/login">Login</router-link>
      </a>

      <a>
        <router-link to="/register">Register</router-link>
      </a>

			<a>
        <router-link to="/playlists">Playlists</router-link>
      </a>

			<a>
        <router-link to="/tracks">Tracks</router-link>
      </a>-->
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.navbar {
	/*background-color: red;*/
	/*background-color: #ececec;*/
	position: fixed;
	width: 100%;
	top: 0;

	text-align: center;
	z-index: 1000;
}

.navbar-link-container > li {
	display: inline-block;
	height: 50px;
	width: 120px;
	margin-left: 15px;
	margin-right: 15px;
}

.nav-button {
	width: 100%;
	/*background-color: blue;*/
	/*background-color: #ececec;*/
	display: inline-block;

	color: #282828;
	font-size: 12px;
	letter-spacing: 4px;
	line-height: 50px;
}

.nav-button:hover {
	cursor: pointer;
}
</style>
