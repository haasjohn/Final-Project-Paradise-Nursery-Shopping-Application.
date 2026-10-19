import { useEffect, useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList, { Navbar } from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import './App.css';

function getPage() {
  const page = window.location.hash.slice(1);
  return ['plants', 'cart'].includes(page) ? page : 'home';
}
export default function App() {
  const [page, setPage] = useState(getPage);
  useEffect(() => {
    const update = () => { setPage(getPage()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  return <>
    <Navbar page={page} />
    {page === 'home' ? <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">A little nature. A lot of joy.</span>
          <h1>Paradise Nursery</h1>
          <p className="hero-tagline">Bring home a<br /><em>little green.</em></p>
          <p>Thoughtfully chosen houseplants for brighter corners, calmer mornings, and spaces that feel like you.</p>
          <a className="button" href="#plants">Get Started <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-label">Grow your own everyday paradise.</div>
      </section>
      <AboutUs />
    </main> : page === 'plants' ? <ProductList /> : <CartItem />}
    <footer>Paradise Nursery <span>Small plants. Beautiful possibilities.</span></footer>
  </>;
}
