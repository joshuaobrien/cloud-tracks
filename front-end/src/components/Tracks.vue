<template>
    <div id="content-col">
        <div id="content-header">
            <h1>{{playlist.name}}</h1>
        </div>
        <glow></glow>
        <div id="content">
            <ol>
                <track-item v-for="item in tracks" v-bind:track="item" v-bind:key="item.id">
                </track-item>
            </ol>
        </div>
    </div>
</template>

<script>
import TrackItem from './TrackItem.vue'
import Glow from './Glow.vue'
export default {
  name: 'tracks',
  data () {
    return {
        tracks: new Array(),
        playlist
    }
  },
  components: {
      TrackItem,
      Glow
  },
  methods: {
      fetchPlaylist(id) {
            this.$http.get('http://localhost:4567/test/playlist/' + id, {
                before(request) {
                if (this.previousRequest) {
                    this.previousRequest.abort();
                }
                this.previousRequest = request;
                }

            }).then(response => {
                this.tracks = response.body;
                let chunk = response.body;
                console.log(chunk)
            }, response => {
                // error callback
                console.log(">> GET Request failed :(")
            });
      },
      fetchTracks(id) {
            this.$http.get('http://localhost:4567/test/playlist/' + id, {
                before(request) {
                if (this.previousRequest) {
                    this.previousRequest.abort();
                }
                this.previousRequest = request;
                }

            }).then(response => {
                this.tracks = response.body;
                let chunk = response.body;
                console.log(chunk)
            }, response => {
                // error callback
                console.log(">> GET Request failed :(")
            });
      }
  },
  created: function() {
      this.fetchTracks(this.$route.params.id);
      this.fetchPlaylist(this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content-col {
    margin: 0 auto;
    padding-left: 100px;
    padding-right: 100px;
    margin-top: 55px;
    /*background-color: green;*/
    width: 750px;
}

#content-header {
    height: 160px;
    line-height: 160px;
    border-radius: 2px;
    text-align: center;
    /*background-color: red;*/
}

h1 {
    font-size: 36px;
    color: #282828;
}

#content {
    position: relative;
    margin: 0 auto;
    margin-top: 4px;
    padding: 16px;

    box-shadow: 0 -15px 20px -15px lightgray;

    background-color: blue;
    background-color: #f2f2f2;
}
</style>
