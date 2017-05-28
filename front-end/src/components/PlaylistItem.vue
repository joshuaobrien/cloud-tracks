<template>
    <li>
        <div class="playlist-item">
            <div class="playlist-thumbnail-container">
                <a href="#tracks">
                    <img class="thumbnail" v-bind:src="playlist.thumbnail_path" href="#okay">
                </a>

                <a class="pp-button" href="#play">
                    <img src="../assets/play-large.png">
                </a>
            </div>

            <p class="playlist-title">{{playlist.name}}</p>
            <!--<p class="playlist-artist">{{playlist.artist}}</P>-->
        </div>
    </li>
</template>

<script>
export default {
  name: 'playlist-item',
  props: ['playlist'],
  data () {
    return {
        thumbnail: "static/thumbnail-placeholder.jpg"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.playlist-item {
    margin: 12px;
    height: 210px;
    width: 160px;
    /*background-color: pink;*/
    display: inline-block;
    border-radius: 2px;
}

.playlist-thumbnail-container {
    position: relative;
    background-color: lightcyan;
    width: 160px;
    height: 160px;
}

.playlist-thumbnail-container:hover {
    cursor: pointer;
}

.playlist-thumbnail-container:hover .pp-button {
    opacity: 1;
}

.pp-button {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: orangered;
    border-radius: 500px;
    top: 55px;
    left: 55px;
    opacity: 0;
    text-align: center;
}

.pp-button:hover {
    background-color: orange;
}

.pp-button>img {
    width: 40px;
    height: 40px;
    margin-top: 5px;
}

.thumbnail {
    height: 160px;
    width: 160px;
    object-fit: fill;
}

.playlist-item>p {
    color: #282828;
    letter-spacing: 0.2px;
    max-width: 160px;
    max-height: 16px;
}

.playlist-title {
    margin-top: 8px;
    font-size: 13px;
}

.playlist-artist {
    margin-top: 8px;
    font-size: 12px;
    opacity: 0.8;
}
</style>
