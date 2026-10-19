import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartCount } from './CartSlice.jsx';
import { categories } from './plants.js';

export const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
export function Navbar({ page }) {
  const count = useSelector(selectCartCount);
  return <header className="navbar">
    <a className="brand" href="#home"><span aria-hidden="true">❧</span><span>Paradise<small>NURSERY</small></span></a>
    <nav aria-label="Main navigation">
      <a href="#home" aria-current={page === 'home' ? 'page' : undefined}>Home</a>
      <a href="#plants" aria-current={page === 'plants' ? 'page' : undefined}>Plants</a>
      <a className="cart-link" href="#cart" aria-current={page === 'cart' ? 'page' : undefined} aria-label={'Cart, ' + count + ' items'}>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M3 3h2l2.5 12h11L21 7H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
        <span>Cart</span><span className="badge" aria-live="polite">{count}</span>
      </a>
    </nav>
  </header>;
}
export default function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  return <main className="catalog">
    <div className="page-heading"><span className="eyebrow">Find your next green companion</span><h1>Room for one more.</h1><p>Explore 18 houseplants, curated for the way you live.</p></div>
    <nav className="category-links" aria-label="Plant categories">{categories.map(category => <a key={category.id} href={'#category-' + category.id} onClick={event => { event.preventDefault(); document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' }); }}>{category.name}</a>)}</nav>
    {categories.map(category => <section className="category" id={category.id} key={category.id}>
      <div className="category-heading"><div><span className="eyebrow">{category.caption}</span><h2>{category.name}</h2></div><span>06 plants</span></div>
      <div className="product-grid">{category.plants.map(plant => {
        const added = items.some(item => item.id === plant.id);
        return <article className="plant-card" key={plant.id}>
          <div className="plant-image"><img src={plant.image} alt={plant.name} loading="lazy" /></div>
          <div className="plant-details"><h3>{plant.name}</h3><span className="price">{money(plant.price)}</span><p>{plant.description}</p>
          <button disabled={added} onClick={() => dispatch(addItem(plant))} aria-label={(added ? 'Added ' : 'Add to Cart: ') + plant.name}>{added ? 'Added to Cart ✓' : 'Add to Cart'}</button></div>
        </article>;
      })}</div>
    </section>)}
  </main>;
}
