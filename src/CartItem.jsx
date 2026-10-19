import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeItem, selectCartCount, selectCartTotal } from './CartSlice.jsx';
import { money } from './ProductList.jsx';

export default function CartItem() {
  const items = useSelector(state => state.cart.items);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState('');
  function change(action) { dispatch(action); setCheckoutMessage(''); }
  return <main className="cart-page">
    <div className="page-heading"><span className="eyebrow">Your growing collection</span><h1>Your cart</h1><p>{count} {count === 1 ? 'plant' : 'plants'} ready for a new home.</p></div>
    {items.length === 0 ? <section className="empty-cart"><span aria-hidden="true">❧</span><h2>A little green goes a long way.</h2><p>Your cart is empty. Find something lovely for your space.</p><a className="button" href="#plants">Continue Shopping</a></section> :
    <div className="cart-layout"><section className="cart-items" aria-label="Plants in your cart">
      {items.map(item => <article className="cart-item" key={item.id}>
        <img src={item.image} alt={item.name} />
        <div className="cart-item-info"><h2>{item.name}</h2><p>Unit price: {money(item.price)}</p>
          <div className="quantity-control"><button aria-label={'Decrease quantity of ' + item.name} disabled={item.quantity === 1} onClick={() => change(decrementQuantity(item.id))}>−</button><span aria-label={'Quantity of ' + item.name}>{item.quantity}</span><button aria-label={'Increase quantity of ' + item.name} onClick={() => change(incrementQuantity(item.id))}>+</button></div>
          <button className="delete-button" aria-label={'Delete ' + item.name} onClick={() => change(removeItem(item.id))}>Delete</button>
        </div>
        <div className="line-total"><small>Plant total</small><strong>{money(item.price * item.quantity)}</strong></div>
      </article>)}
      <a className="continue-link" href="#plants">← Continue Shopping</a>
    </section><aside className="order-summary"><span className="eyebrow">Almost home</span><h2>Order summary</h2><div><span>Total items</span><span>{count}</span></div><div className="order-total"><strong>Total cart amount</strong><strong aria-live="polite">{money(total)}</strong></div><p>Checkout is a demonstration feature. No payment will be collected.</p><button className="button" onClick={() => setCheckoutMessage('Coming Soon — online checkout is on its way!')}>Checkout</button><p role="status">{checkoutMessage}</p></aside></div>}
  </main>;
}
