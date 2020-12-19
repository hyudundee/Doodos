import NotFound from '../NotFound.jsx';
import CategoryPage from './CategoryPage.jsx';
import Dashboard from './CategoryDashboard.jsx';

const categoryRoutes = [
    { path: '/category/:category', component: CategoryPage },
    { path: '/category/', component: Dashboard },
    { path: '*', component: NotFound },
];

export default categoryRoutes;
