import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { CharacterPage } from './pages/Character.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/character/:id',
    element: <CharacterPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
