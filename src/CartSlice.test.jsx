import { describe, it, expect } from 'vitest';
import reducer, { addItem, incrementQuantity, decrementQuantity, removeItem, selectCartCount, selectCartTotal } from './CartSlice.jsx';
import { categories } from './plants.js';
describe('shopping cart', () => {
  const plant = { id: 'fern', name: 'Fern', price: 12 };
  it('adds a plant once and updates counts and totals with quantities', () => {
    let state = reducer(undefined, addItem(plant));
    state = reducer(state, addItem(plant));
    expect(state.items).toHaveLength(1);
    state = reducer(state, incrementQuantity('fern'));
    expect(selectCartCount({ cart: state })).toBe(2);
    expect(selectCartTotal({ cart: state })).toBe(24);
    state = reducer(state, decrementQuantity('fern'));
    state = reducer(state, decrementQuantity('fern'));
    expect(state.items[0].quantity).toBe(1);
    state = reducer(state, removeItem('fern'));
    expect(selectCartTotal({ cart: state })).toBe(0);
    expect(selectCartCount({ cart: state })).toBe(0);
  });
  it('totals multiple products and safely ignores unknown product ids', () => {
    let state = reducer(undefined, addItem(plant));
    state = reducer(state, addItem({ id: 'palm', price: 30 }));
    state = reducer(state, incrementQuantity('palm'));
    state = reducer(state, decrementQuantity('missing'));
    state = reducer(state, incrementQuantity('missing'));
    expect(selectCartCount({ cart: state })).toBe(3);
    expect(selectCartTotal({ cart: state })).toBe(72);
    state = reducer(state, removeItem('fern'));
    expect(selectCartTotal({ cart: state })).toBe(60);
  });
  it('provides six unique plants in each of three categories', () => {
    expect(categories).toHaveLength(3);
    categories.forEach(category => expect(category.plants).toHaveLength(6));
    const plants = categories.flatMap(category => category.plants);
    expect(new Set(plants.map(plant => plant.name)).size).toBe(18);
    plants.forEach(plant => {
      expect(plant.price).toBeGreaterThan(0);
      expect(plant.image).toMatch(/\.svg$/);
    });
  });
});
