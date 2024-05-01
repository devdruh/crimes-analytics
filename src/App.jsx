import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

export function Fallback() {
    return <p>Performing initial data load</p>;
}

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}

function App() {
    return <RouterProvider router={router} fallbackElement={<Fallback />} />
}

export default App
