new Vue({
    el: '#content',
    data: {
        message: "cloud tracks",
        userLink: "https://www.youtube.com/watch?v=rC3L-Z6x4dg",
        inputStyle: {
            backgroundColor: '#fafafa'
        }
    },

    methods: {
        pasteLink: function() {
            alert("Pasted")
        },

        hoverOn: function() {
            this.inputStyle.backgroundColor = 'white'
        },

        hoverOff: function() {
            this.inputStyle.backgroundColor = '#fafafa'
        }
    }
})