<template>
    <div id="content-col">
        <glow></glow>
        <div id="content-header">
            <h1>playlists</h1>
        </div>

        <div id="content">
            <ol>
                <playlist-item v-for="item in playlists" v-bind:playlist="item" v-bind:key="item.id">
                </playlist-item>
            </ol>
        </div>
    </div>
</template>

<script>
import PlaylistItem from './PlaylistItem.vue'
import Glow from './Glow.vue'
export default {
  name: 'playlists',
  data () {
    return {
        playlists: [
            { id: 0, title: 'Title One', artist: 'Artist One' },
            { id: 1, title: 'Title Two', artist: 'Artist Two' },
            { id: 2, title: 'Title Three', artist: 'Artist Two' },
            { id: 3, title: 'Title Four', artist: 'Artist Three' },
            { id: 4, title: 'Title Five', artist: 'Artist Four' },
            { id: 5, title: 'Title Six', artist: 'Artist Four' },
            { id: 6, title: 'Title Seven', artist: 'Artist Four' }
        ]
    }
  },
  components: {
      PlaylistItem,
      Glow
  },
  methods: {
      fetchPlaylists() {
            // GET /someUrl
            this.$http.get('http://localhost:4567/test/playlist/idgoeshere', {

                // use before callback
                before(request) {

                // abort previous request, if exists
                if (this.previousRequest) {
                    this.previousRequest.abort();
                }

                // set previous request on Vue instance
                this.previousRequest = request;
                }

            }).then(response => {
                // success callback
                console.log(response.json());
            }, response => {
                // error callback
                console.log(">> GET Request failed :(")
            });
      }
  },
  created: function() {
      this.fetchPlaylists();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content-col {
    position: relative;
    margin: 0 auto;
    padding-left: 100px;
    padding-right: 100px;
    margin-top: 100px;
    /*background-color: green;*/
    max-width: 1130px;
    min-width: 750px;
}

#content-header {
    height: 60px;
    border-radius: 2px;
    text-align: center;
    padding-top: 20px;
}

h1 {
    font-size: 36px;
    color: #282828;
}

#content {
    position: relative;
    margin: 0 auto;
    margin-top: 4px;
    /*background-color: blue;*/
    background-color: #f2f2f2;
}

li {
    display: inline-block;
}
</style>
