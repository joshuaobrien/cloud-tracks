new Vue({
    el: '#content',

    data: {
        userName: "testuser",
        userPass: "password1",
        userPassConfirm: "password1"
    },

    methods: {
        submit: function() {
            if (this.userName === "") {
                alert("Please enter a username");
                return;
            }

            if (this.userPass === "") {
                alert("Please enter a password")
                return;
            }

            if (this.userPass !== this.userPassConfirm) {
                alert("Passwords do not match")
                return;
            }

            let newUser = {
                username: this.userName,
                password: this.userPass
            }
            this.$http.post('localhost:4567/test/create_user', newUser)
                .then(function(response) {
                    alert("It worked?");
                });
        }
    }
})