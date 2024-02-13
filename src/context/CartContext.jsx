import { destroyCookie, parseCookies, setCookie } from "nookies"
import { createContext, useContext, useEffect, useState } from "react"

export const CartContext = createContext({})


export function useCart() {
    return useContext(CartContext)
}

const cookies = parseCookies()

let initCart = []
if (cookies.cart != undefined) {
    initCart = JSON.parse(cookies.cart)
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(initCart);
    const [showCartDropDown, setShowCartDropDown] = useState(false);

    useEffect(() => {
        
        return () => {
            setTimeout(() => {
                setShowCartDropDown(false);
            }, 3000);
        };

    }, [showCartDropDown]);

    function handleAddItemToCart(item) {

        console.log("ITEM", item);
        // check if product is already in cart
        const index = cart.findIndex((cartItem) => cartItem.color_product_id === item.color_product_id && item.color_product_id !== null);
        if (index > -1) {
            alert('Item já adicionado ao carrinho');
            return;
        }

        const items = [...cart, item];
        
        setCart(items);
        setCookie(null, "cart", JSON.stringify(items));

        setShowCartDropDown(true);
    }

    function handleRemoveItemFromCart(item) {
        const items = cart;

        const index = items.findIndex(cartItem => cartItem.product_id === item.product_id);
        const newCart = items.filter((cartItem, i) => i !== index);

        setCart(newCart);
        setCookie(null, 'cart', JSON.stringify(newCart));
    }

    function handleUpdateItemFromCart(clickedItemIndex, amount) {
        const item = cart.filter(
            (cartItem) => cart.indexOf(cartItem) == clickedItemIndex
        )
        item.amount = amount

        setCart(cart)

        setCookie(null, 'cart', JSON.stringify(cart))
    }

    function handleColorItemFromCart(selectedColor, color) {
        const items = cart;
        const index = cart.findIndex((item) => item.reference === selectedColor.reference);
        items[index].color = color;
        items[index].color_product_id = color.id;

        setCart(items);
        setCookie(null, "cart", JSON.stringify(items));
    }

    function clearCart() {
        setCart([])
        destroyCookie(null, 'cart')
    }

    const value = {
        cart,
        handleAddItemToCart,
        handleRemoveItemFromCart,
        handleUpdateItemFromCart,
        handleColorItemFromCart,
        clearCart,
        showCartDropDown,
    }

    return (
        <>
            <CartContext.Provider value={value}>
                {children}
            </CartContext.Provider>
        </>
    )
}