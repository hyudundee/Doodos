# GroupProject-ArchiTech
## Doodos
Team Member: Yijing Liu, Haoran Yu

## Iter 3
Deployed App/UI Link (Might take a while for data from database to load): https://doodos-ui.herokuapp.com/ <br/>
Deployed API Link: https://doodos-api.herokuapp.com/

To access all features in Doodos, one can sign in with _"Dvinci@gmail.com"_ as email, and _"1234567"_ as password. <br/>
For PayPal test, one can sign in with _"Dvinci@gmail.com"_ as email, and _"12345678"_ as password.

__Contribution on Project:__
* UI/Deployment - Yijing Liu
* API - Haoran Yu

__Progress since Iter 2:__<br/>
By the end of Iteration 2, most UI components connects to data on MongoDB through APIs, but most edit features have not been added. <br/>
After Iteration 3, all intended edit features have been implemented on App. Now Doodos is a Web App where users can:
* View posts on Discover page sorted by modified time, Category page filtered by user's favorite categories/selected category, or DoodleMaps page listed by location.
* Sign in or Sign up and get authorization for all implemented functions.
* Add posts after signed in, with the "+" button on NavBar.
* Access Dashboard page to edit user profile or edit/delete posts.
* Like posts, join events, follow other users.
* View liked posts, following users on user profile/dashboard.
* View items in store, add to cart, and checkout.

More details included in UI & API breakdown.

### UI - Yijing Liu

__Progess in Iter 3:__ <br/>

_Posts:_
* Users can now edit, delete or like posts;
* Edit & Delete feature can be accessed from Dashboard page;
* Location value is added to posts for DoodleMaps display;
* Location & Category values now can be edited through Post Add & Post Edit feature;

_Events:_
* Users can join or quit the event by clicking on "Join" on Event page;
* Users who joined the event are listed on the "Attenders" tab on Event Page;

_Users/Profiles:_
* User sign up feature is added;
* A new profile is created when new user signed up, which can be edited through Edit Profile page access from Dashboard;
* Bio, status, location, social network & favorite categories now can be edited through Edit Profile page;
* Users can now follow or unfollow other users;
* Following tab is added to show who the user is following;
* Likes tab now displays all the posts the user like;
* User page would be directed to Dashboard if clicked on the User page of the signed in user;

_Category:_
* Minor issue fixed

_DoodleMaps:_
* DoodleMaps page now displays all posts with location show on map;

_Store:_
* Promotion banner now link correctly to its ticket item;
* Item quantity now can be edited by input or "+"/"-" button before added to cart;
* Users can access cart by the cart icon on NavBar;
* Cart displays all items user added to cart, with remove from cart feature by clicking the trash icon;

_Screenshots:_
* Liked posts would be shown with a colored heart icon. If open in a modal, it would show "Liked" instead of "Like";
![Like](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/Like.JPG).
* Users can check all of his/her liked posts under "Likes" tab on profile/dashboard page;
![Likes](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/Likes.JPG).
* Post items now would show edit & delete button on Dashboard;
![Edit Delete](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/Post%20Edit1.JPG)
* Posts can now be edited through Edit page access from Edit button on Dashboard page;
![Post Edit](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/Post%20Edit2.JPG)
* Profile can now be edited through Profile Edit page;
![Profile Edit](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/Profile%20Edit.JPG)
* Dashboard would show user's following on "Following" tab. When directing to followed user's profile, "Followed" would show instead of "Follow". Click on the button to follow/unfollow.
![Follow](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/Follow.JPG)
* Location & Category modification is added to Post Add feature.
![Post Add](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/Post%20Add.JPG)
* Users now can click on "Join" to join/quit the event. Joined users would be displayed on "Attenders" tab;
![Join Event](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/Join%20Event.JPG)
* Click on the sign up link under sign in modal to switch to sign up modal;
![Sign Up](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/Sign%20Up.JPG)
* DoodleMaps page now show a GoogleMaps app with posts listed by location;
![DoodleMaps](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/DoodleMaps.JPG)
* Before add to cart, user can either modify the quantity directly or click "+"/"-" button;
![Add to Cart](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/Add%20to%20Cart.JPG)
* Users can check items in cart by clicking the cart icon on NavBar, as well as remove items in cart;
![Remove Items](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/Remove%20Items.JPG)
* By clcking on "Checkout", user would be directed to a Paypal page with purchase feature;
![Checkout](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/Checkout.JPG)
* Click "Continue" to checkout or "Cancel..." below to get back to store;
![Continue or Cancel](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%203/Continue%20or%20Cancel.JPG)


### API - Haoran Yu

__Progess in Iter 3:__ <br/>

_New Package Installed:_
* New packages installed: "ejs": "^3.1.3", "paypal-rest-sdk": "^1.8.1", "request": "^2.88.2".
"ejs" is a backend server render package which could rend the page and send it to the browser directly from the API side. Doodos map is created with the help of this package. 

_DoodleMaps based on Google Maps API:_
* A new folder named "views" is created under the root directory of API, and within it, a file named "maps.ejs" is created.
* Besides that, some settings including "app.set('view engine', 'ejs')" is needed in the server.js, which declares to use ejs as the rendedr engine.
* After those settings, a file "maps.js" is created inside the api/routes folder, which handle the request received from the server and send a response with the rendered doodos map.

* log into google account create this app.
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/google-maps/google-maps-created.png)

* Activate google maps jsvascript api for this app and generate api-key, then save it in the .env file.
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/google-maps/api-key-created.png)

* DoodleMaps-set-up01 (connect to google maps api, and created a map view at fixed size).
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/google-maps/doodo-maps-set-up01.png)

* DoodleMaps-set-up02 (create one marker on the map, and changed the marker from default red location icon to small flag, and create info window containing title, image and descriptions).
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/google-maps/click-an-icon-to-see-more-info.png)

* Loop through the posts in the mongo database, if the post has no valid lat and lng (default 0) then skip, else extract necessary informations from the post and create marker, info window for that post. Finally, user could see their post (if created with valid geo info) on the doodos map. On click, they could browse the image and other informaation. They could open multiple windows at the same time, and need to click close to close it.
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/google-maps/doodos-map-set-up02.png)


_Doodos Shop Cart Cgecj based on PayPal-rest-SDK:_
* Reference: https://github.com/paypal/PayPal-node-SDK
* In creating paypal function, firstly, a paypal-rest-sdk, which contains packages and functions needed to execute payment with paypal. * After installation, developer needs to log in paypal developer with their personal account
* Then, create a sandbox account
* Then create a business account and a personal account, the personal account is set to simulate the customer account, and the business account is set to simulate the doodos official account.
* At the test stage the business account holder is named John Doe.
* Then to run the paypal-rest-sdk, just like the google maps, we also need to create a app named doodos and generate client id and client secret which could be used to configure the paypal configuration.

* Sign in developer paypal account and create sanbox and several tes account within the sandbox.
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/paypal/create-paypal-sanbox-account.png)

* Create an app and generate cliendId and clientSecret after filling all the necessary information.
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/paypal/create-new-app.png)

* Each account will have 5000 dollars funding by default, which will change after each transaction.
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/paypal/doodos-online-store-backend.png)

* In the test stage, after logging the payment_json to the console, it is easy to find how paypal use json object to store the transaction infos.
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/paypal/payment-info.png)

* In the test stage, after logging the payment_json to the console, it is easy to find how paypal use json object to store the transaction infos.
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/paypal/paypal-checkout-page-log-in-test-account.png)

* After clicking the checkout button, user will be redirect to paypal login page, he/she could see the shop's information, and after entering their info, they can complish the payment with paypal. Finally, user will be able to complete the payment, and the money will be shipped from his/her account to doodos official business account.
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/paypal/paypal-checkout-page-view-the-pay-info.png)

* If the payment is completed successfully, user will be redirect to this success page to get informed that they have successfully paid the cart, then their cart will be emptied. Or, if failed, user will be redirect to a page writing cancelled to get informed that the payment is not completed, and the cart will remain the same as before.
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/paypal/paypal-checkout-page-payment-success.png)

* For successful payment, a new bill information will be generated and can be logged to the console, with the user's address, name extra, which can be used to deliver the package. (These infos are from user's paypal account)
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/paypal/paypal-checkout-page-payment-info-logged-in-the-console.png)

* After the payment, user's persibal account will decrement by the actual amount he/she has paid.
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/paypal/after-check-out-personal-account.png)

* Accordingly, the doodos' official account will increment by the actual amount the user has paid. However, an interetsting fact is found thar the user's personal account decrement 25 dollars while the doodo's official business account increase less than 25 dollars, it should be some inner logic within paypal-rest-sdk package. (Or algorithm about tax? Still looking for a cause)
![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/paypal/after-check-out-business-account.png)


## Iter 2

__Contribution on Project:__
* UI/Deployment - Yijing Liu
* API - Haoran Yu

__Progress since Iter 1:__<br/>
By the end of Iteration 1, UI and API are only connected through Sign In API. <br/>
After Iteration 2, most UI components now connects to data on MongoDB through APIs including users, events, posts, products, etc.. 

Some progress in the App:
* All contents of posts, events, profiles, store items have now been fetched from database through API.
* Make a New Post is now added and functioning, with picture upload feature.
* Category page is added, offering filters on posts by category.
* A signed in user can see posts in his/her favorite categories in Category page under _Your Feed_.
* User profile page would show posts by the user under _Posts_ tab, and social network links under _About_ tab.
* Store page is added, displaying items selling on the website.

__What's next:__
* More features including update, delete, like for post; edit for profile; join for event; follow for user; purchase for store.
* DoodleMaps page for showing posts on the map by location.
* Register feature for new users to sign up.
* Google sign-in feature if time left.


### UI - Yijing Liu

Deployed App/UI Link (Might take a while for data from database to load): https://doodos-ui.herokuapp.com/

UI structure designed based on the textbook sourcecode along with other tools including:
* __"react-Dropzone"__, __"superagent"__ are used in "PostAddNavItem" component for uploading artworks of the post.
* __"react-pro-sidebar"__ is used as a category bar in Category page.

#### UI Design

__Discover Page__

* The Home/Discover page now has post and event items fetched from database. First 3 items are posted from Front-End with user logged in as Da Vincci. This page would show posts in created time order, from the latest posts to the oldest.
![Discover](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%202/Discover.JPG)

* To make a post, one has to sign in, otherwise will get an error toast when clicking on the __+__ sign.
![Post Add Verification](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%202/Post%20Add%20Verification.JPG)

* Make a new post by filling in the title, description and uploading a picture. More features like selecting categories will be added in the future.
![Post Add](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%202/Post%20Add.JPG)

* Clicking on posts would show a modal with more information of the post including description and post date. The _Like_ feature is still in progress.
![Post](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%202/Post.JPG)

* Clicking on __View More__ on the event slides would guide user to the event page with more details of the event. The _Join_ feature is still in progress.
![Event](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%202/Event.JPG)

__User Page__

* Sign in feature currently only supports standard users. Google sign-in feature still in progress. To test user, one can login using _"Dvinci@gmail.com"_ or _"joemurphy@gmail.com"_ as email, and _"1234567"_ as password.
![Sign In](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%202/Sign%20In.JPG)

* Clicking on the author below would direct to a user profile page, with all of the user's work shown.
![User](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%202/User.JPG)

* About tab would show the user's other information including social network links.
![Social](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%202/Social.JPG)

* A signed in user could access to his/her own dashboard by clicking on the user name and then the dropdown. The current dashboard page is similar to the user profile page. Features like editing profile and posts would be added in the future.
![Dashboard](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%202/Dashboard.JPG)

__Category Page__

* The Category page would show posts by category. The page is directed to _"Your Feed"_ by default. A signed in user would have posts in his/her favorite categories on this page, while a guest would only see all posts unfiltered when directed to Category page.
![Category Dashboard](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%202/Category%20Dashboard.JPG)

* User could switch category by clicking on the sidebar. Favorite categories would be listed under _"Your Category"_ for easier access. Or user can select other categories under _"Explore by Category"_. By clicking on the category the page would show posts under the category only. 
![Posts by Category](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%202/Posts%20by%20Category.JPG)

__Store Page__

* The Store Page displays items selling on the website. The slides on the top are promotions for tickets of the events. All items are shown with pictures and prices, as well as names when hover on it. Add to cart and purchase features are still in progress.
![Store](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%202/Store.JPG)

* Clicking on items would show more information about the items. UI for the modal is still in progress. 
![Item](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%202/Item.JPG)



### API - Haoran Yu

Deployed API Link: https://doodos-api.herokuapp.com/

### Changes to the app

After the iter 1, in the sake of conveniency, the __Trolly.js__ schema is renamed to __Cart.js__, __shoppingItems.js__ to __product.js__.

Group is replaced by favoriteCategories in users' profiles, where user could add different categories to their favorites to filter the posts they are exposed to. 

### Heroku deployment

For conveniency of deployment api/config/default.js is replaced by api/.env. This is also reflected in package.json besides config, the dotenv package is also installed.



### In the Social part, user could:

* In the line Store ,various products is provided to the users, inluding the tickets for events.

* Create post with image and text they want to share with the community.

* Choose a category their posts belongs to

* Filter posts by their categories

* Retrieve and update their post after it is created

* like other people's posts, (CRUD support, user either create, retrieve, update or delete the info)

* comment below other people's posts, (CRUD support, user either create, retrieve, update or delete the info)

* Follow people they are interested in, the data is stored in their user information.

* Set their favorite categories of post in their profile, where they could have shortcut for posts filtered by the category.



### In the Online store part, user could:

* Get all kinds of products and choose what they want to buy.

* If there is no more product in the store, user will be notified when adding that product

* If there is no more product in the cart to remove, user will also be notified when they are trying to remove

* If one product's amount is reduced to 0, it will be removed from the cart

* Get any product's detailed info by get by its Id

* Add, different products to their cart. And after every move, the new total sum ,the number of products in user's cart and the online store will all get updated in no time

* Delete different products to their cart. And after every move, the new total sum ,the number of products in user's cart and the online store will all get updated in no time


![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/onlinestore/add-item-to-cart1.png)

add-item-to-cart


### In the Online Events, user could:

* Register an event and they place will be reserved

* Buy the ticket by clicking the link and get redirected to the online store page

* View the total number of places remained and people's avatars who get registered.


![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/supplement%20for%20iter2/register-an-event.png)

register-an-event

### Data fufillment and User relation set up

To functionalize the app and test it, vivid user datas and profiles, and infos are generated manually. In a total of 20 users, 20 profiles, 23 posts, 9 products and 3 events 1 cart are created for this web app.

Below is a snapshot of the data example


![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/supplement%20for%20iter2/cart-data-example.png)

cart-data-example

![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/supplement%20for%20iter2/event-data-type.png)

event-data-example

![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/supplement%20for%20iter2/post-data-example.png)

post-data-example

![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/supplement%20for%20iter2/product-example.png)

product-example

![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/supplement%20for%20iter2/profile-data-example.png)

profile-data-example

![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/supplement%20for%20iter2/user-data-example.png)

user-data-example

![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/supplement%20for%20iter2/srcimage.png)

image source: https://haoran-yu.imgbb.com/albums


At the next stage, a final checkout and pay method of either Paypal or Alipay will be added to the app, where the user could pay their purchases and finish the shopping process. And we will also try to add google map api to this app, besides improving the backend objects, schemas and routes extra to improve the app.


## Iter 1

Our team is trying to build a platform for artists and graffiti lovers to communicate and share their works. The website is expected to have __Discover__ page for viewing posts and events, __Groups__ page to join groups and communicate, __DoodleMaps__ page to let users view posts by location, and __Store__ page for users to purchase tools and merchandises.

For Iteration 1, the work has been divided into UI part and API part. Yijing Liu works on the UI; Haoran Yu works on the API. 

### UI - Yijing Liu

Deployed UI Link (Sign In API not deployed): https://doodos-ui.herokuapp.com/

UI designed based on the textbook.

#### Routes

Routes so far has access to all pages on NavBar including "/discover", "/groups", "/doodlemaps", "/store", as well as subpages like "/post", "/event", "/author", "/register".

#### UI Design

* Discover page is the home page of the website, showing posts and events with links to see details.
![Discover](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%201/Discover.JPG)

* Hover on Event Section would show description of the event with a button link to the event page.
![Event Hover](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%201/Hover%20on%20Event.JPG)

* Events are shown in slides and can be switched with button, event details can be seen by clicking on _View More_.
![Event Detail](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%201/Event%20Detail.JPG)

* Hover on Posts would show the title of the post, author name and like button are placed under the post.
![Post Hover](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%201/Hover%20on%20Post.JPG)

* Author's profile can be accessed by clicking on the author name.
![User Profile](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%201/User%20Profile.JPG)

* Clicking on the post would pop up a modal showing the details.
![Post Detail](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%201/Post%20Detail.JPG)

* Post details can also be shown in a single page by opening it in a new tab.
![Post Page](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Post%20Detail%20on%20Single%20Page.JPG)

* Click on __+__ button to make a new post.
![New Post](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%201/New%20Post.JPG)

* Sign In feature is on the NavBar. By clicking on it users can either log in with Google or Doodos acounts.
![Sign In](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%201/Sign%20In.JPG)

* Users can go to the register page by clicking on the Sign Up link.
![Sign Up](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%201/Sign%20Up.JPG)

* After signed in, user name would appear on the NavBar, with a success Toast poped.
![Signed In](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/ui/readme_images/Iter%201/User%20Name%20and%20Toast.JPG)


### API - Haoran Yu

The structure of the api referenced this source code

api_design_reference: https://github.com/bradtraversy/devconnector_2.0

commit history of api before July 22 2020 can be found: https://github.com/hyudundee/mern-stack-doodos

### Schema Design

* User includes: String {name, location, ticket, host}, Date{from, to, date} Boolean{ticket}

* Profile              => String {user, bio, status, location, website, }, Date{from, to, date} Boolean{ticket}, List{skills, experience, social}

* User                 => String {name, email, password, avatar}, Date{date}

* Post                 => String {name, text, user, avatar}, Date{date} List{comments, likes}

* Group                => String {name}, Date{date}, List{users}

* Event                => String {name, location, ticket, host}, Date{from, to, date} Boolean{ticket}

* ShoppingItem         => String {name, price, amount, retailer}, Date{date} Boolean{available}, list{delieverymethod}

* Trolly               => String {user, sum},List{buyings}



* Event                => https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/models/Event.js

* Group                => https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/models/Group.js

* Post                 => https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/models/Post.js

* Profile              => https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/models/Profile.js

* User                 => https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/models/User.js

* ShoppingItem         => https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/models/ShoppingItem.js

* Trolly               => https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/models/Trolly.js


### Package Installed

#### dependencies

* bcrypts              => encrypt and decrypt user password

* config               => set up connection to Atlas and other default settings

* mongoose             => connect to database and create schema, provides object relational map

* express              => Backend framework

* jsonwebtoken         => generate token to validate user login status

* express-validator    => validate user info inlcuding token and input

* gravatar             => used to get user profile(connected with google)


#### dev-dependencies

* nodemon              => to watch and run program after a change is saved

* concurrently         => run 'npm start' command concurrently


### screenshots

User register and authentication

![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/user-register-authentication/register-user-da-vincci-and-get-token.png)
register-user-da-vincci-and-get-token

![login-use-generated-token-to-get-user](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/user-register-authentication/login-use-generated-token-to-get-user.png)
login-use-generated-token-to-get-user

![login-user-send-email-not-exist-to-auth.png](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/user-register-authentication/login-user-send-email-not-exist-to-auth.png)
login-user-send-email-not-exist-to-auth

![login-user-send-valid-credentials-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/user-register-authentication/login-user-send-valid-credentials-and-get-token.png)
login-user-send-valid-credentials-and-get-token

![mongodb-user.png](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/user-register-authentication/mongodb-user.png)
mongodb-user

![postman-auth-test](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/user-register-authentication/postman-auth-test.png)
postman-auth-test

![register-user-da-vincci-and-get-token](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/user-register-authentication/register-user-da-vincci-and-get-token.png)
register-user-da-vincci-and-get-token

Profile

![crerate-update-profile-01](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/profile/crerate-update-profile-01.png)
crerate-update-profile-01

![crerate-update-profile](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/profile/crerate-update-profile-02.png)
crerate-update-profile-02

![crerate-update-profile-03-mongodb-updated.png](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/profile/crerate-update-profile-03-mongodb-updated.png)
crerate-update-profile-03-mongodb-updated

![delete-comment.png](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/posts/delete-comment.png)
delete-comment

![15 deployment.png](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/blob/master/api/readme-images/posts/post-comment.png)
post-comment

full images can be found here: https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-ArchiTech/tree/master/api/readme-images
