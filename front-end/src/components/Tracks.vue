<template>
    <div id="content-col">
        <glow></glow>
        <div id="content-header">
            <h1>tracks</h1>
        </div>

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
        tracks: [
            { id: 0, title: 'Track One'},
            { id: 1, title: 'Track Two'},
            { id: 2, title: 'Track Three'},
            { id: 3, title: 'Track Four'},
            { id: 4, title: 'Track Five'},
            { id: 5, title: 'Track Six'},
            { id: 6, title: 'Track Seven'}
        ]
    }
  },
  components: {
      TrackItem,
      Glow
  },
  methods: {
      fetchTracks() {
            // GET /someUrl
            this.$http.get('http://localhost:4567/test/playlist/1', {

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
                console.log(response.body);
                console.log(response.json());
        
            }, response => {
                // error callback
                console.log(">> GET Request failed :(")
            });
      }
  },
  created: function() {
      this.fetchTracks();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content-col {
    margin: 0 auto;
    padding-left: 100px;
    padding-right: 100px;
    margin-top: 100px;
    /*background-color: green;*/
    width: 750px;
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
    padding: 16px;
    /*background-color: blue;*/
    background-color: #f2f2f2;
}
</style>
