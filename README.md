# SplitIt
Group Members:
## Christian Kelsom-Martin
## Emmy Shaffer
## Matthew Talamantes

-- LINK TO APP --

https://the-split-it.herokuapp.com/


-- TECHNOLOGIES USED --

1) NODE.JS
2) MONGOOSE
3) JAVASCRIPT
4) HEROKU.DB
5) EXPRESS
6) ANGULARJS
7) BOOTSTRAP

-- APPROACH TAKEN --

The objective of the project was to create a functional Single-Page CRUD Application using MEAN Stack: Node.js, Mongoose, Express, and AngularJS. Our group collectively agreed to create an app designed to help roommates within a given house display the associated bills and mark if each user has/has not paid their portion. Upon splitting the project into three pieces: Users, House, and Bills we equally distributed each portion to a group member. These three pieces would each have their own controller, model, HTML partial, and API with the House model pulling from the Users and the Bills model pulling from the House.

Once each piece was completed we included Two-Step Authentication for new and existing users and began linking the models together by creating objects that would store new/updated data for users that created houses and bills. Users will also have the option to udpate their login/account credentials through the Manage Account functionality. Our logic was designed that a single user could create a house and become the owner of that house. If a user just registered and is not currently within a house they will be prompted to create one. After creating a house they will no longer have the option to create one and have the house they are currently in be displayed after subsequent relogging. From here the user would be able to search and add other users to their house. If necessary they could also remove users from their given house. This model included full CRUD functionality.

Upon being added to a house, users could then create, edit, update, and delete bills from the house using another full CRUD process. Once a bill is created it would list all given members of the house as being UNPAID until the PAID button has been pressed. After the PAID button is pressed it becomes disabled for that given bill. Each bill is linked directly to the house that it was created on and will not be displayed in other houses.

Each piece was then added to the landing page to create a simplistic user experience. The general flow of the app will be that when a user loads the site they will be prompted to either login if they are a current user or register to create an account. Once registered or logged in they will have the landing page loaded in which they will be prompted to either create a new house or browse the bills that are within the house they are currently in. The navigation bar features a link to manage user account data, log out, an About SplitIT which links to this readme, and the logo takes the user back to the landing page once clicked. Styling was done using the Bootstrap framework and the SplitIT logo was custom created by Emmy.


-- UNSOLVED PROBLEMS --

As a group we were able to solve all problems that we had encountered but there are many future implementations that we would like to revist that would meet the goals we had originally set.

-- USER STORIES --

Matthew:
This project was an incredible learning experience for me and I am very impressed with the results of our work. The site looks incredible and functions better than I could have hoped for. It was a great opportunity as a whole to experience what it is like collaborating with others on a single application with much trial and error.

-- FUTURE NOTES --

There are several features that we would like to implement into the app:

1) Functionality that shows the breakdown of what each user/house member needs to pay for each bill
2) Notification of past due payments/delinquencies
3) Allow users to request to join houses as they must current be manually added by the house owner.
