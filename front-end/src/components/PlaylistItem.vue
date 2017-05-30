<template>
    <li>
        <div class="playlist-item">
            <div class="playlist-thumbnail-container">
                <router-link :to="'/tracks/' + playlist.playlist_id">
                    <img class="thumbnail" v-bind:src="playlist.thumbnail_path" href="#okay" alt="playlist-thumbnail-image">
                </router-link>

                <!--<a class="pp-button" href="#play">
                    <img src="../assets/play-large.png" alt="playbutton-icon">
                </a>-->
            </div>

            <p class="playlist-title">{{truncate(playlist.name)}}</p>
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
  },
  methods: {
      truncate(message) {

          if (message.length > 12) {
              message = message.substring(0, 16) + "...";
          }
          return message;
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
    opacity: 0.8;
    box-shadow: 0 10px 20px -10px black;
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
    object-fit: cover;
}

.playlist-item>p {
    color: #282828;
    letter-spacing: 0.2px;
    width: 160px;
    height: 26px;
    text-overflow: ellipsis;
    word-wrap: break-word;
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
