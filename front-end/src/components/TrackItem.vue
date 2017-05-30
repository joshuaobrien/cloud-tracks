<template>
    <li>
        <div @click="setTrack(track.filepath)" class="track-item">
            <div class="pp-button" href="#play">
                <img src="../assets/play-large.png">
            </div>
            <p class="artist">{{track.artist + " - "}}</p>
            <p class="title">{{track.name}}</p>
            <p class="duration">{{convertTime(track.duration)}}</p>
        </div>
    </li>
</template>

<script>
import bus from '../eventBus'
export default {
  name: 'track-item',
  props: ['track', 'playlist'],
  data () {
    return {
    }
  },
  methods: {   
      convertTime(seconds) {
          var minutes = Math.floor(seconds/60);
          var subSeconds = Math.floor((seconds/60 - minutes) * 60);
          if (subSeconds < 10) {
            subSeconds = "0" + subSeconds;
          }
          return minutes + ":" + subSeconds;
      },

      setTrack(track, playlist) {
            var serverPath = "/media/" + playlist.playlist_id + "/" + track.id;
            var testPath = "/static/splittapes/" + playlist.playlist_id + "/" + track.id + ".m4a";

            console.log(testPath);
            this.$session.set('track', testPath);
            bus.$emit('trackChange');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.track-item {
    margin-top: 2px;
    position: relative;
    height: 50px;
    width: 100%;
    /*background-color: pink;*/
    border-radius: 4px;
    border-bottom: 1px solid #ddd;
}

.track-item:hover {
    cursor: pointer;
}

.track-item:hover > .pp-button {
    opacity: 1;
}

.pp-button {
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: orangered;
    border-radius: 500px;
    opacity: 0;
    text-align: center;
    top: 10px;
    left: 10px;
}

.pp-button:hover {
    cursor: pointer;
}

.pp-button>img {
    width: 25px;
    height: 25px;
    margin-top: 2.5px;
}

p {
    display: inline-block;
    color: #282828;
    letter-spacing: 0.2px;
    line-height: 50px;
    font-size: 13px;
}

.title {
    margin-left: 16px;
}

.artist {
    opacity: 0.55;
    margin-left: 50px;
}

.duration {
    float: right;
    margin-right: 16px;
}
</style>
