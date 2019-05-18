const app = angular.module('SplitIt', []);

app.controller('SplitItController', ['$http', function($http) {
    this.bills = [];
    this.house = '';
    this.user = null;
    this.pageError = null;

    this.includePath = 'partials/' + (!this.user ? 'auth' : 'users') + '.html';
    this.changeInclude = (path) => {
        this.includePath = 'partials/'+ path +'.html';
    }

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

            // Log user in
            this.user = response.data.user;
            this.changeInclude('users');
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
            this.user = response.data.user;
            this.loginUsername = '';
            this.loginPassword = '';
            this.changeInclude('users');
        }).catch((err) => {
            console.log(err);
            this.pageError = 'Invalid Credentials';
        });
    };

    this.logOut = () => {
        $http({
            method: 'DELETE',
            url: '/users'
        }).then((response) => {
            console.log(response);
            this.user = null;
            this.changeInclude('auth');
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
            this.getHouse()
        }).catch((err)=> {
            console.log(err);
        });
    };

    this.getHouse = () => {
        $http({
            method: 'GET',
            url: '/house',
        }). then((response)=>{
            console.log(response);
            this.house = response.data;
        }).catch((err)=> {
            console.log(err);
        });

    };

    this.editHouse = (house)=>{
        $http({
            method:'PUT',
            url:'/house/' + house._id,
            data: {
            name: this.updatedHouseName
            }
        }).then((response)=>{
            this.getHouse()
            controller.indexOfEditFormToShow = null;
            console.log(response);
        }).catch((err)=> {
            console.log(err);
        });
    };

    this.deleteHouse = (house)=>{
        $http({
            method:'DELETE',
            url:'/house/' + house._id
        }).then((response)=>{
            this.getHouse()
            console.log(response);
        }).catch((err)=> {
            console.log(err);
        });
    };

    this.getBills = () => {
        $http({
            method: 'GET',
            url: '/bills'
        }).then((response) => {
            console.log(response);
            this.bills = response.data;
        }).catch((err) => {
            console.log(err);
        })
    }

    this.createBill = () => {
        $http({
            method: 'POST',
            url: '/bills',
            data: {
                title: this.newBillTitle,
                total: this.newBillTotal,
                dueDate: this.newBillDueDate,
                members: this.newBillUsers
            }
        }).then((response) => {
            console.log(response);
            this.getBills();
        }).catch((error) => {
            console.log(error);
        })
    }

    this.init = () => {
        $http({
            method: 'GET',
            url: '/users/validate-auth'
        }).then((response) => {
            console.log(response);
            this.user = response.data.user;
            this.changeInclude('users');
        }).catch((err) => {
            console.log(err);
        });
    };
    this.init();

}]);
