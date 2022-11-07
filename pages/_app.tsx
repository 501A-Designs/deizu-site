import '../styles/globals.css'
import { AppProps } from 'next/app';
// import { ThemeProvider } from "next-themes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { darkTheme } from '../stitches.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        toastStyle={{
          backgroundColor: 'var(--system3)',
          borderRadius:'var(--borderRadius2)',
          boxShadow:'0 8px 30px rgba(0, 0, 0, 0.12)',
          padding: '0.25em',
          fontSize:'15px',
          border:'1px solid var(--system0)',
          color:'var(--txtColor1)',
          textAlign:'center'
        }}
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="system"
        value={{
          light: "light",
          dark: darkTheme.className
        }}
      > */}
        <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </>
  )
}

export default MyApp
