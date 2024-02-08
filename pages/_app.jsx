import { useEffect } from "react";
import { useRouter } from "next/router";

import authRoutes from "@/configs/authRoutes";

import "@/styles/globals.css";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    if (!Boolean(user.userId)) {
      if (authRoutes.includes(router.asPath)) router.replace("/login");
    }
  }, []);

  return <Component {...pageProps} />;
};

export default App;
