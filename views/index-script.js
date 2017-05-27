new Vue({
    el: '#content',
    data: {
        message: "cloud tracks",
        userLink: "https://www.youtube.com/watch?v=rC3L-Z6x4dg"
    },

    methods: {
        linkSubmit: function() {

            let newLink = {
                url: this.userLink
            };

            this.$http.post('http://localhost:4567/test/download', newLink, {
                emulateJSON: true
            })
        }
    }
})