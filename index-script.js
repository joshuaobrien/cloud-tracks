new Vue({
    el: '#content',
    data: {
        message: "cloud tracks",
        userLink: "https://www.youtube.com/watch?v=rC3L-Z6x4dg",
        highlight: {
            backgroundColor: '#fafafa'
        }
    },

    methods: {
        pasteLink: function() {
            alert("Pasted")
        },

        highlightFocus: function(on) {
            if (on) {
                this.highlight.backgroundColor = 'white'
            } else {
                this.highlight.backgroundColor = '#fafafa'
            }
        },
    }
})