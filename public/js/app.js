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

    this.logIn = () => {
        $http({
            method: 'POST',
            url: '/users/login',
            data: {
                username: this.loginUsername,
                password: this.loginPassword
            }
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    };

    this.logOut = () => {
        $http({
            method: 'DELETE',
            url: '/users'
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    };

    this.createHouse = () => {
        $http({
            method: 'POST',
            url: '/house',
            data: {
                name: this.houseName
            }
        }). then((response)=>{
            console.log(response);
        }).catch((err)=> {
            console.log(err);
        });
    };
}]);
