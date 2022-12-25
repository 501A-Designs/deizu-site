import '../styles/globals.css'
import { AppProps } from 'next/app';
import { ThemeProvider } from "next-themes";
import { darkTheme, globalCss } from '../stitches.config';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  useEffect(() => {
    const down = (e:any) => {
      if (e.key === 'k' && e.metaKey) router.push('/')
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        value={{
          light: "light",
          dark: darkTheme.className
        }}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
