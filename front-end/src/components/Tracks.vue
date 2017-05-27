<template>
    <div id="window">
        <div id="content-col">
            <div id="content-header">
                <a href="">
                    <h1>tracks</h1>
                </a>
            </div>

            <div id="content">
                <ol>
                    <track-item v-for="item in playlists" v-bind:playlist="item" v-bind:key="item.id">
                    </track-item>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
import TrackItem from './TrackItem.vue'
export default {
  name: 'tracks',
  data () {
    return {
        playlists: [
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
      TrackItem
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
    margin-top: 50px;
    /*background-color: green;*/
    width: 750px;
}

#content-header {
    height: 75px;
    background-color: #ececec;
    border-radius: 2px;
    text-align: center;
    padding-top: 20px;
}

h1 {
    letter-spacing: 8px;
    font-size: 48px;
    color: #282828;
}

#content {
    position: relative;
    margin: 0 auto;
    margin-top: 2px;
    background-color: #f2f2f2;
    padding: 16px;
}

</style>