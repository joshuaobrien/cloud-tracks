<template>
    <div id="content-col">
        <div id="content-header">
            <h1>{{playlist.name}}</h1>
            <img class="thumbnail" v-bind:src="playlist.thumbnail_path">
        </div>
        <glow></glow>
        <div id="content">
            <ol>
                <track-item v-for="item in tracks" v-bind:track="item" v-bind:playlist="playlist" v-bind:key="item.id">
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
        playlist: {name: ""}
    }
  },
  components: {
      TrackItem,
      Glow
  },
  methods: {
      fetchTracks(id) {
            // this.$http.get('http://localhost:4567/test/playlist_tracks/' + id + '?token=' + this.$session.get('tok'), {
            this.$http.get('https://cloudtracks.sadnc.com/api/test/playlist_tracks/' + id + '?token=' + this.$session.get('tok'), {
                before(request) {
                if (this.previousRequest) {
                    this.previousRequest.abort();
                }
                this.previousRequest = request;
                }

            }).then(response => {
                this.tracks = response.body;
                console.log(this.tracks)
                // console.log(this.tracks);
                this.fetchPlaylist(id);
            }, response => {
                // error callback
                console.log(">> Tracks Request failed :(")
            });
      },
      fetchPlaylist(id) {
            // this.$http.get('http://localhost:4567/test/playlists/' + id + '?token=' + this.$session.get('tok'), {
            this.$http.get('https://cloudtracks.sadnc.com/api/test/playlists/' + id + '?token=' + this.$session.get('tok'), {
                before(request) {
                if (this.previousRequest) {
                    this.previousRequest.abort();
                }
                this.previousRequest = request;
                }

            }).then(response => {
                this.playlist = response.body;
                console.log(this.playlist)
            }, response => {
                // error callback
                console.log(">> Playlist Request failed :(")
            });
      },
      truncate(message) {
        //   if (message.length > 24) {
        //       message = message.substring(0, 21) + "...";
        //   }
          return message;
      }
  },
  created: function() {
      this.fetchTracks(this.$route.params.id);
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
    border-radius: 2px;
    text-align: right;
    line-height: 160px;
    /*background-color: red;*/
}

#content-header > * {
}

.thumbnail {
    display: inline-block;
    width: 120px;
    height: 120px;
    object-fit: cover;
    margin-top: 20px;
    margin-right: 60px;
}

h1 {
    /*background-color: red;*/
    float: left;
    letter-spacing: 4px;
    font-size: 24px;
    color: #282828;
    margin-left: 60px;
    max-width: 475px;
    text-indent: 0;
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
