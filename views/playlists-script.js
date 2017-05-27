Vue.component('playlist-item', {
    // The todo-item component now accepts a
    // "prop", which is like a custom attribute.
    // This prop is called todo.
    props: ['playlist'],

    template: `<li>
                    <div class="playlist-item">
                        <div class="playlist-thumbnail-container">
                            <a href="#tracks">
                                <img class="thumbnail" src="assets/res/thumbnail-placeholder.jpg" href="#okay">
                            </a>

                            <a class="pp-button" href="#play">
                                <img src="assets/res/play-large.png">
                            </a>
                        </div>

                        <p class="playlist-title">{{playlist.title}}</p>
                        <p class="playlist-artist">{{playlist.artist}}</P>
                    </div>
                </li>`
})

new Vue({
    el: '#content',

    data: {
        playlists: [
            { id: 0, title: 'Title One', artist: 'Artist One' },
            { id: 1, title: 'Title Two', artist: 'Artist Two' },
            { id: 2, title: 'Title Three', artist: 'Artist Two' },
            { id: 3, title: 'Title Four', artist: 'Artist Three' },
            { id: 4, title: 'Title Five', artist: 'Artist Four' },
            { id: 5, title: 'Title Six', artist: 'Artist Four' },
            { id: 6, title: 'Title Seven', artist: 'Artist Four' }
        ],
        isHovered: false
    }
})