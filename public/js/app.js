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
    this.house = {};
    this.user = null;
    this.pageError = null;
    this.update = {};

    this.includePath = 'partials/' + (!this.user ? 'auth' : 'users') + '.html';
    this.changeInclude = (path) => {
        this.includePath = 'partials/'+ path +'.html';
    };

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

            // Log user in
            this.user = response.data.user;
            this.loadAuthedApp();
            this.createName = '';
            this.createUsername = '';
            this.createEmail = '';
            this.createPassword = '';
            this.confirmPassword = '';
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
            this.loadAuthedApp();
            this.loginUsername = '';
            this.loginPassword = '';
            this.pageError = null;
        }).catch((err) => {
            console.log(err);
            this.pageError = 'Invalid Credentials';
        });
    };

    this.loadAuthedApp = () => {
        this.getUsers();
        this.getHouse();
        this.changeInclude('users');
    };

    this.logOut = () => {
        $http({
            method: 'DELETE',
            url: '/users'
        }).then((response) => {
            console.log(response);
            this.changeInclude('auth');
            this.user = null;
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
            this.loadAuthedApp();
            this.update = {};
            this.user = response.data.user;
            this.confirmPassword = '';
            this.pageError = null;
        }).catch((err) => {
            console.log(err);
            this.pageError = 'CurrentPasswordMismatch';
        });
    };

    this.getUsers = () => {
        $http({
            method: 'GET',
            url: '/users',
        }).then((response) => {
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
        }).then((response) => {
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
        }).then((response) => {
            console.log(response);
            this.house = response.data;
            this.house.allMembers = this.house.member;
            this.house.allMembers.unshift(this.house.owner);
            this.getBills();
        }).catch((err)=> {
            console.log(err);
        });
    };

    this.editHouse = () => {
        $http({
            method: 'PUT',
            url: '/house/' + this.house._id,
            data: {
                name: this.updatedHouseName
            }
        }).then((response) => {
            this.getHouse();
            this.indexOfEditFormToShow = null;
            console.log(response);
        }).catch((err)=> {
            console.log(err);
        });
    };

    this.deleteHouse = () => {
        $http({
            method: 'DELETE',
            url: '/house/' + this.house._id
        }).then((response) => {
            this.getHouse();
            console.log(response);
        }).catch((err)=> {
            console.log(err);
        });
    };

    this.moveMember = (userId) => {
        $http({
            method:'PUT',
            url:'/house/member/' + this.house._id,
            data: {
                member: userId
            }
        }).then((response) => {
            this.loadAuthedApp();
        }).catch((err) => {
            console.log(err);
        });
    };

    this.deleteMember = (userId) => {
        $http({
            method: 'DELETE',
            url: '/house/'+ this.house._id +'/member/' + userId
        }).then((response) => {
            console.log(response);
            this.loadAuthedApp();
        }).catch((err) => {
            console.log(err);
        });
    };

    this.getBills = () => {
        $http({
            method: 'GET',
            url: '/bills/' + this.house._id
        }).then((response) => {
            console.log(response);
            this.bills = response.data;
        }).catch((err) => {
            console.log(err);
        });
    };

    this.payBill = (billId) => {
        $http({
            method: 'PATCH',
            url: '/bills/' + billId
        }).then((response) => {
             this.loadAuthedApp();
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    };

    this.createBill = () => {
        $http({
            method: 'POST',
            url: '/bills',
            data: {
                title: this.newBillTitle,
                total: this.newBillTotal,
                dueDate: this.newBillDueDate,
                house: this.house._id
            }
        }).then((response) => {
            console.log(response);
            this.newBillTitle = '';
            this.newBillTotal = '';
            this.newBillDueDate = '';
            this.getBills();
        }).catch((error) => {
            console.log(error);
        });
    };

    this.updateBill = (billId) => {
        $http({
            method: 'PUT',
            url: '/bills/' + billId,
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
        });
    };

    this.deleteBill = (billId) => {
        $http({
            method: 'DELETE',
            url: '/bills/' + id
        }).then((deleteBill) => {
            console.log(deleteBill);
            const index = this.bills.findIndex(bill => {
                return bill._id === billId;
            });
            this.bills.splice(index, 1);
        }).catch((error) => {
            console.log(error);
        });
    };

    this.verifyAuth = () => {
        $http({
            method: 'GET',
            url: '/users/validate-auth'
        }).then((response) => {
            console.log(response);
            this.user = response.data.user;
            this.loadAuthedApp();
        }).catch((err) => {
            console.log(err);
        });
    };
    this.verifyAuth();
}]);
