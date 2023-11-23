import { Provider } from 'react-redux';
import { store } from '../app/store/store';
import Layout from '../layout';
import '../globals.css';

import { useTokenLocalStorage } from '../app/hooks/useToken';


function MyApp({ Component, pageProps }) {
    // jwt token for login
    useTokenLocalStorage();

    return (
        <Provider store={store}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        </Provider>
    )
}

