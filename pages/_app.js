import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
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
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
