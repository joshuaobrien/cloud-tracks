new Vue({
    el: '#content',

    data: {
        userName: "",
        userPass: "",
        userPassConfirm: ""
    },

    methods: {
        newUserSubmit: function() {
            if (this.userName === "") {
                alert("Please enter a username");
                return;
            }

            if (this.userPass === "") {
                alert("Please enter a password");
                return;
            }

            if (this.userPass !== this.userPassConfirm) {
                alert("Passwords do not match");
                return;
            }

            let newUser = {
                username: this.userName,
                password: this.userPass
            };

            this.$http.post('http://localhost:4567/test/create_user', newUser, {
                emulateJSON: true
            })
        }
    }
})