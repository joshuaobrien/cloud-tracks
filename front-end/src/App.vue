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
	background-color: white;
	background-color: #fcfcfc;
	position: fixed;
	width: 100%;
	top: 0;

	text-align: center;
	z-index: 1000;

	box-shadow: 0 7px 20px -10px lightgray;
}

.navbar-link-container > li {
	display: inline-block;
	height: 50px;
	width: 150px;
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
</style>
