import '@/styles/globals.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/store/store';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<style jsx global>
				{`
			html {
				font-family: 'Hi Melody', cursive;
				font-family: 'Stylish', sans-serif;
			}
		`}
			</style>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</>
	)
};

export default App;
