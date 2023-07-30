import { Provider } from 'react-redux';
import { store } from '../app/store/store';
import Layout from '../layout';
import '../globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        </Provider>
    )
}

