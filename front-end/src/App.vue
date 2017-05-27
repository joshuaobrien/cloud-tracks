<template>
  <div id="app">

    <div>
      <button type="button">
        <router-link to="/">Home</router-link>
      </button>
      <button type="button">
        <router-link to="/login">Login</router-link>
      </button>
      <button type="button">
        <router-link to="/register">Register</router-link>
      </button>
			<button type="button">
        <router-link to="/playlists">Playlists</router-link>
      </button>
			<button type="button">
        <router-link to="/tracks">Tracks</router-link>
      </button>
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
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

div {
	display: block;
}

div:hover {
	cursor: default;
}

body {
	overflow-x: hidden;
	text-decoration-color: none;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	color: #ececec;
	display: block;
	background-color: #ececec;
}

a {
	color: inherit;
	font-style: none;
	text-decoration: none;
}

#window {
	width: 100%;
	/*background-color: red;*/
	background-image: url('assets/tile-light.jpg');
	background-repeat: repeat;
	background-color: #ececec;
}
</style>
