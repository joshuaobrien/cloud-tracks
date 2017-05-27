new Vue({
    el: '#content',

    data: {
        userName: "",
        userPass: ""
    },

    methods: {
        submit: function() {
            alert("Username: " + this.userName + "\nPassword: " + this.userPass);
        }
    }
})