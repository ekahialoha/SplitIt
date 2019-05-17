const app = angular.module('SplitIt', []);

app.controller('SplitItController', ['$http', function($http) {
    this.signUp = () => {
        $http({
            method: 'POST',
            url: '/users',
            data: {
                name: this.createName,
                username: this.createUsername,
                email: this.createEmail,
                password: this.createPassword
            }
        }).then((response) => {
            console.log(response);
            this.createName = '';
            this.createUsername = '';
            this.createEmail = '';
            this.createPassword = '';
        }).catch((err) => {
            console.log(err);
        });
    };
}]);
