import Header from "../components/Header";
import "../styles/tailwind-globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="h-screen flex flex-col flex-1">
      <Header />
      
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
