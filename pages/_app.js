import Head from "next/head";
import Navbar from "../components/Navbar";

import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Head>
        <title>Vizzy - Dataviz solutions</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
