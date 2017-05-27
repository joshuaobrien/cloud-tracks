<template>
    <li>
        <div class="playlist-item">
            <div class="pp-button" href="#play">
                <img src="../assets/play-large.png">
            </div>

            <p class="playlist-title">{{track.title}}</p>
        </div>
    </li>
</template>

<script>
export default {
  name: 'track-item',
  props: ['track'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.playlist-item {
    margin-top: 2px;
    position: relative;
    height: 50px;
    width: 100%;
    background-color: pink;
    border-radius: 2px;
}

.playlist-item:hover {
    cursor: pointer;
}

.playlist-item:hover > .pp-button {
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

.playlist-item>p {
    color: #282828;
    letter-spacing: 0.5px;
    max-width: 160px;
    max-height: 16px;
    line-height: 50px;
    margin-left: 60px;
}

.playlist-title {
    margin-top: 8px;
    font-size: 16px;
}
</style>
