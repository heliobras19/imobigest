import "../styles/globals.css";
import "../styles/bootstrap.css";
import "../styles/fonts.css";
import { CartProvider } from "../context/CartContext";
import Layout from "../layouts/Layout";
import "../../colors/colors.min.css";
import NextNProgress from "nextjs-progressbar";
import { CategoryProvider } from "../context/CategoryContext";
import { AuthProvider } from "../context/AuthContext";
import { BannerProvider } from "../context/BannerContext";
import {CompanyProvider} from "../context/CompanyContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#333" />

      <CartProvider>
              <AuthProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
              </AuthProvider>
      </CartProvider>

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        async
      />
    </>
  );
}

export default MyApp;
