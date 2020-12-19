import NotFound from '../NotFound.jsx';
import Category from "../Category/Category.jsx";
import Discover from "../Discover/Discover.jsx";
import DoodleMaps from "../DoodleMaps/DoodleMaps.jsx";
import Store from "../Store/Store.jsx";
import User from "../User/User.jsx";
import Post from "../Discover/Post.jsx";
import Event from "../Discover/Event.jsx";
import Edit from "../User/Edit.jsx";
import About from "../About.jsx";
import Dashboard from "../User/Dashboard.jsx";
import Item from '../Store/ItemPage.jsx';
import EditProfile from "../User/EditProfile.jsx";
import Cancel from "../Store/Cancel.jsx";
import Success from "../Store/Success.jsx";

const routes = [
    { path: '/discover', component: Discover },
    { path: '/category/:category?', component: Category },
    { path: '/doodlemaps', component: DoodleMaps },
    { path: '/store', component: Store },
    { path: '/post/:id', component: Post },
    { path: '/edit/:id', component: Edit },
    { path: '/profile/', component: EditProfile },
    { path: '/item/:id', component: Item },
    { path: '/user/:id/:tab?', component: User },
    { path: '/event/:id/:tab?', component: Event },
    { path: '/dashboard/:tab?', component: Dashboard },
    { path: '/success/', component: Success },
    { path: '/cancel/', component: Cancel },
    { path: '/about', component: About },
    { path: '*', component: NotFound },
];

export default routes;
