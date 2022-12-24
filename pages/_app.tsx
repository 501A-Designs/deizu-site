import '../styles/globals.css'
import { AppProps } from 'next/app';
import { ThemeProvider } from "next-themes";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { darkTheme, globalCss } from '../stitches.config';
import * as Toast from '@radix-ui/react-toast';
import Link from 'next/link';
import { BlurHeader } from '../lib/component/BlurHeader';

const globalStyles = globalCss({
  html:{
    margin: 0,
    padding: 0,
    backgroundColor:'$gray1'    
  },
  body: {
    margin: 0,
    padding: 0,
    backgroundColor:'$gray1',
  },
  hr:{
    width:'100%',
    backgroundColor:'$gray5',
    borderRadius:'$rounded',
    border:'1px solid $gray5',
    margin:'$3 0'
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <>
      {/* <ToastContainer
        toastStyle={{
          backgroundColor: '$gray12',
          borderRadius:'9999px',
          boxShadow:'none',
          padding: '0.25em',
          fontSize:'15px',
          border:'1px solid $gray1',
          color:'$gray1',
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
      /> */}
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        value={{
          light: "light",
          dark: darkTheme.className
        }}
      >
        {/* <BlurHeader/> */}
        <Toast.Provider swipeDirection={'down'}>
          <Component {...pageProps} />
        </Toast.Provider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
