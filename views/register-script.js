new Vue({
    el: '#content',

    data: {
        userName: "",
        userPass: "",
        userPassConfirm: ""
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

            if (this.userPass === this.userPassConfirm) {
                alert("Username: " + this.userName + "\nPassword: " + this.userPass);
            } else {
                alert("Passwords do not match")
            }
        }
    }
})