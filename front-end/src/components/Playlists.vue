<template>
    <div id="content-col">
        <header id="content-header">
            <h1>playlists</h1>
        </header>
        <glow></glow>

        <main id="content">
            <ol>
                <playlist-item v-for="item in playlists" v-bind:playlist="item" v-bind:key="item.id">
                </playlist-item>
            </ol>
        </main>
    </div>
</template>

<script>
import PlaylistItem from './PlaylistItem.vue'
import Glow from './Glow.vue'
export default {
  name: 'playlists',
  data () {
    return {
        playlists: new Array()
    }
  },
  components: {
      PlaylistItem,
      Glow
  },
  methods: {
      fetchPlaylists() {
            // this.$http.get('http://localhost:4567/test/playlists?token=' + this.$session.get('tok'), {
            this.$http.get('https://cloudtracks.sadnc.com/api/test/playlists?token=' + this.$session.get('tok'), {
                before(request) {
                if (this.previousRequest) {
                    this.previousRequest.abort();
                }
                this.previousRequest = request;
                }
                
            }).then(response => {
                this.playlists = response.body;
                let chunk = response.body;
                // console.log(chunk)
        
            }, response => {
                // error callback
                console.log(">> GET Request failed :(")
            });
      },
      handleSession() {
          if (this.$session.has('tok')) {
              return true;
          } else {
              console.log("Can't access playlits without loggin in");
              this.$router.push('/login');
          }
          return false;
      }
  },
  created: function() {
      if (!this.handleSession()) {
          return;
      }
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
    margin-top: 55px;
    /*background-color: green;*/
    max-width: 1130px;
    min-width: 750px;
}

#content-header {
    height: 75px;
    line-height: 75px;
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
    /*background-color: blue;*/
    background-color: #f2f2f2;
}

li {
    display: inline-block;
}
</style>
