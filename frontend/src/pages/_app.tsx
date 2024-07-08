import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { ApolloProvider } from '@apollo/client';
import client from "../lib/apolloClient";

function App({ Component, pageProps }: AppProps)  {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path ? "active" : "";
  return (
    <ApolloProvider client={client}>

    <div className="flex flex-col h-screen">
      <nav className="navbar-default">
        <Link href="/" passHref>
          <button className={`p-2 ${isActive('/')}`}>Home</button>
        </Link>
        <Link href="/countries" passHref>
          <button className={`p-2 ${isActive('/countries')}`}>Countries</button>
        </Link>
      </nav>
      <Component {...pageProps} />
    </div>
    </ApolloProvider>

  )
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
