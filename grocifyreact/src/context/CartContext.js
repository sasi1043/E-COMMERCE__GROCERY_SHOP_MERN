import { useContext, useEffect } from "react";
import { createContext, useState } from "react"

const CartContext=createContext();

export default function CartProvider({children}){
 
     const [price, setPrice] = useState(() => {
  const savedPrice = localStorage.getItem("price");
  return savedPrice ? Number(savedPrice) : null;
});


    const[cart,setCart]=useState(()=>{
        const savedCart=localStorage.getItem("cart");
        return savedCart? JSON.parse(savedCart):[];
    });


    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
    },[cart])

    function addCart(product){
      setCart((prevCart)=>{
        const alreadyCart=prevCart.some((item)=>item._id===product._id);

        if (alreadyCart) return prevCart;
        return [...prevCart,product];
      })
    }

    function removeCart(id){
        setCart((prevCart)=>prevCart.filter((item)=>item._id!==id))
    }

    function storeprice(totalprice){
        setPrice(totalprice);
        localStorage.setItem("price", totalprice);
    }

    function clearCart(){
        setCart([]);
        localStorage.removeItem("cart");
    }
    return(
        <CartContext.Provider value={{price,storeprice,cart,addCart,removeCart,clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
   return useContext(CartContext)
}

