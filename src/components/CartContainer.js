import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import {cartTotal, clearCart} from '../store/cartSlice'
const CartContainer = ({ cart = [] }) => {
  const total = useSelector(state => state.cartState.total)
  const Cart = useSelector(state => state.cartState.cartList)

  useEffect(() => {
    dispatch(cartTotal())
  })
  
  const dispatch = useDispatch();
  if (Cart.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <article>
        {Cart.map(item => {
          return <CartItem key={item.id} item = {item} />;
        })}
      </article>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>{total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch(clearCart())}>clear cart</button>
      </footer>
    </section>
  );
};

export default CartContainer;
