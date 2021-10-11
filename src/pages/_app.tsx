import Header from "../components/Header";
import "../styles/tailwind-globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
