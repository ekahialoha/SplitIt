const app = angular.module('SplitIt', []);

app.directive('myConfirmPass', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: (scope, element, attributes, ngModel) => {
            ngModel.$parsers.push((currValue) => {
                const passValidates = currValue === scope.$eval(attributes.myConfirmPass);
                ngModel.$setValidity('confirm', passValidates);
                return (passValidates) ? currValue : undefined;
            });
        }
    };
});

app.controller('SplitItController', ['$http', function($http) {
    this.bills = [];
    this.house = '';
    this.user = null;
    this.pageError = null;
    this.update = {};

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
            this.pageError = null;
        }).catch((err) => {
            console.log(err);
            this.pageError = 'username-taken';
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
            this.pageError = null;
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

    this.updateUser = () => {
        $http({
            method: 'PUT',
            url: '/users',
            data: this.update
        }).then((response) => {
            console.log(response);
            this.update = {};
            this.user = response.data.user;
            this.pageError = null;
            this.changeInclude('users');
        }).catch((err) => {
            console.log(err);
            this.pageError = 'CurrentPasswordMismatch';
        });
    };

    this.getUser = () => {
        $http({
            method: 'GET',
            url: '/users',
        }). then((response)=>{
            console.log(response);
            this.allUsers = response.data;
        }).catch((err)=> {
            console.log(err);
        });

    };


    this.loadManageAccount = () => {
        this.update = {
            name: this.user.name,
            email: this.user.email
        };
        this.changeInclude('manage-account');
    };

     this.createHouse = () => {
        $http({
            method: 'POST',
            url: '/house',
            data: {
                name: this.houseName,
                owner: this.houseOwner
            }
        }). then((response)=>{
            console.log(response);
            this.getHouse()
            this.changeInclude('house');
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
    

    this.moveMember = (user)=>{
        console.log(this.house)
        $http({
            method:'PUT',
            url:'/house/member/' + this.house._id,
            data: {
            member: user
            }
        }).then((response)=>{
            this.house = response.data 
            console.log(response);
        }).catch((err)=> {
            console.log(err);
        });
        console.log(user)
    };

    this.deleteMember = (user) => {
        console.log(user)
        $http({
            method:'DELETE',
            url: '/house/'+ this.house._id +'/member/' + user
        }).then((response)=>{
            console.log(response);
        }).catch((err)=> {
            console.log(err);
        });
    };
    

    this.loadHouse = () => {
        this.getUser()
        this.getHouse();
        this.changeInclude('house');
    }


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
    };

    this.loadBillsPage = () => {
        this.getBills();
        this.getHouse();
        this.changeInclude('bills');
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
            this.newBillTitle = '';
            this.newBillTotal = '';
            this.newBillDueDate = '';
            this.getBills();
        }).catch((error) => {
            console.log(error);
        })
    };

    this.updateBill = (bill) => {
        $http({
            method: 'PUT',
            url: '/bills/' + bill._id,
            data: {
                title: this.updatedTitle,
                total: this.updatedTotal,
                dueDate: this.updatedDueDate
            }
        }).then((response) => {
            console.log(response);
            this.getBills();
            this.indexOfEditFormToShow = null;
        }).catch((error) => {
            console.log(error);
        })
    }

    this.deleteBill = (id) => {
        $http({
            method: 'DELETE',
            url: '/bills/' + id
        }).then((deleteBill) => {
            console.log(deleteBill);
            const index = this.bills.findIndex(bill => {
                return bill._id === id;
            });
            this.bills.splice(index, 1);
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
