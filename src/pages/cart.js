import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import CartProduct from "src/components/CartProduct"
import { useShoppingCart } from "use-shopping-cart"

export default function CartPage(){
    const {cartCount, cartDetails, formattedTotalPrice, clearCart, redirectToCheckout}  = useShoppingCart()
    const [isRedirecting, setRedirecting] = useState(false)


    function sorry() {
        const soSorry = toast.success("Disculpa las molestias, el método de pago actualmente no funciona por motivos financieros de la empresa!");
        
    }
    

    async function onCheckout(){
        if (cartCount > 0){
            try {
                setRedirecting(true)
                const {id} = await axios.post("api/checkout-sessions", cartDetails).then(res => res.data);
                const result = redirectToCheckout(id)
                if(result?.error){
                    console.log(result)
                }
            } catch(error){
                console.log("Error: ", error)
            } finally{
                setRedirecting(false)
            }
        }
    }
    

    return(
        <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
            {cartCount > 0 ? (
                <>
                <h2 className="text-4xl font-semibold">
                 Tú carrito.
                </h2>
                <p className="mt-1 text-xl">
                    {cartCount} items{" "}
                
                <button className="opacity-50 hover:opacity-100 text-base capitalize" onClick={() => clearCart()}>
                    (borrar todo)
                </button>
                </p>
                </>
            ) : (
            <>
               <h2 className="text-4xl font-semibold">
                    Tú carrito está vacio.
               </h2>
               <p className="mt-1 text-xl">
                Mira nuestras increíbles ofertas {""}
                <Link href="/" className="text-red-500 underline">
                    aquí!
                </Link>
               </p>
            </>
            )}
            {cartCount > 0 && <div className="mt-12 space-y-4">
                {Object.entries(cartDetails).map(([productId, product]) => (
                    <CartProduct key={productId} product={product}/>
                ))}
            
                <div className="flex flex-col items-end border-t py-4 mt-8">
                    <p className="text-xl">Total: {" "}
                    <span className="font-semibold">{formattedTotalPrice}</span>
                    </p>
                    <button 
                    disabled={isRedirecting}
                    onClick={sorry}
                    className="border rounded py-2 px-6 bg-yellow-500 hover:bg-yellow-600 border-yellow-600 focus:ring-4 focus:ring-ocapacity-50 focus:ring-yellow-500 text-white transition-colors disabled:ocapacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-500 mt-4 max-w-max">
                        {isRedirecting ? "Reedirigiendo" : "Pagar"}
                    </button>
                </div>
            </div>
            }
        </div>
    )
}


