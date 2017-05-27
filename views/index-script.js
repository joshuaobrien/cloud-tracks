new Vue({
    el: '#content',
    data: {
        message: "cloud tracks",
        userLink: "https://www.youtube.com/watch?v=rC3L-Z6x4dg"
    },

    methods: {
        download: function() {
            alert("TEST: " + this.userLink);
        }
    }
})