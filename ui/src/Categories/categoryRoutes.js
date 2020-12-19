import NotFound from '../NotFound.jsx';
import CategoryPage from './CategoryPage.jsx';
import Dashboard from './CategoryDashboard.jsx';
import User from "../User/User.jsx";
import Post from "../Discover/Post.jsx";
import Event from "../Discover/Event.jsx";
import Register from "../User/Register.jsx";

const categoryRoutes = [
    { path: '/category/:category', component: CategoryPage },
    { path: '/category/', component: Dashboard },
    { path: '*', component: NotFound },
];

export default categoryRoutes;
