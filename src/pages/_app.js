import { Toaster } from "react-hot-toast";
import AppLayout from "src/components/layaout";
import "src/styles/globals.css";
import { CartProvider } from "use-shopping-cart";

const stripkey = "pk_test_51OeIAsCNKLRbUXzdjZocHj6n459q5EGfsqN9ckPMqcXvAZv1D7dOdiIphgXFDs29WzMs0tqulBqf6vh7eg9wcHey00Ctg1s4KX"

export default function App({ Component, pageProps }) {
  return (
    <CartProvider stripe={stripkey} cartMode="checkout-session"     currency="EUR">
      <AppLayout>
        <Component {...pageProps}/>
        <Toaster/>
      </AppLayout>
    </CartProvider>
  )
}
