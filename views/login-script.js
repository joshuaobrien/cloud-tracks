new Vue({
    el: '#content',

    data: {
        userName: "",
        userPass: ""
    },

    methods: {
        loginSubmit: function() {
            if (this.userName === "") {
                alert("Please enter a username");
                return;
            }

            if (this.userPass === "") {
                alert("Please enter a password");
                return;
            }

            let loginData = {
                username: this.userName,
                password: this.userPass
            };

            this.$http.post('http://localhost:4567/test/login', loginData, {
                emulateJSON: true
            }).then(response => {
                if (response.status == 201) {
                    var responseData = response.body
                    if (responseData == 'Success') {
                        return;
                    }
                }
                alert("Login failed");
            }, response => {
                // error callback
                alert("Well cooked");
            });
        }
    }
})