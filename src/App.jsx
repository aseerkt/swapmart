import { useEffect, useState } from 'react';
import './App.css';
import Product from './components/Product';
import data from './data';
import vitelogo from './favicon.svg';
import { unique } from './helpers';

const allBrands = unique(
  data.reduce((prev, curr) => prev.concat(curr.brand), [])
);
const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
let arrayFlatChecker = (arr, target) => target.every((v) => arr.includes(v));

function App() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [ideals, setIdeals] = useState('');
  const [priceSort, setPriceSort] = useState('');

  useEffect(() => {
    let filterdProducts = data;
    if (!brands.length && !sizes.length && !ideals && !priceSort)
      setProducts(data);
    if (priceSort)
      filterdProducts.sort(
        (a, b) => (a.price - b.price) * (priceSort === 'h2l' ? 1 : -1)
      );
    if (brands.length)
      filterdProducts = filterdProducts.filter((pdt) =>
        brands.includes(pdt.brand)
      );
    if (sizes.length)
      filterdProducts = filterdProducts.filter((pdt) =>
        arrayFlatChecker(pdt.sizes, sizes)
      );
    if (ideals)
      filterdProducts = filterdProducts.filter((pdt) =>
        pdt.idealFor.includes(ideals)
      );
    setProducts(filterdProducts ?? []);
  }, [brands, sizes, ideals, priceSort]);

  const clearFilter = () => {
    setBrands([]);
    setSizes([]);
    setIdeals('');
    setPriceSort('');
  };

  const onPriceSortChange = (e) => {
    setPriceSort(e.target.value);
  };

  const onBrandChange = (e) => {
    if (!e.target.checked)
      setBrands((prev) => prev.filter((brand) => brand !== e.target.value));
    else setBrands((prev) => prev.concat(e.target.value));
  };

  const onSizeChange = (e) => {
    if (!e.target.checked)
      setSizes((prev) => prev.filter((size) => size !== e.target.value));
    else setSizes((prev) => prev.concat(e.target.value));
  };

  const onIdealChange = (e) => {
    setIdeals(e.target.value);
  };

  return (
    <main className='app'>
      <header className='app_title'>
        s<img src={vitelogo} />
        apmart
      </header>
      <section className='filter'>
        <button onClick={clearFilter}>Clear Filter</button>
        <div>
          <header>Price</header>
          <ul>
            {['h2l', 'l2h'].map((sort) => (
              <li key={sort}>
                <input
                  id={sort}
                  name='priceSort'
                  onChange={onPriceSortChange}
                  type='radio'
                  checked={priceSort === sort}
                  value={sort}
                />
                <label htmlFor={sort}>
                  {sort === 'h2l' ? 'High to Low' : 'Low to High'}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <header>Brands</header>
          <ul>
            {allBrands.map((val) => (
              <li key={val}>
                <input
                  id={val}
                  name='brand'
                  onChange={onBrandChange}
                  type='checkbox'
                  value={val}
                  checked={brands.includes(val)}
                />
                <label htmlFor={val}>{val}</label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <header>Sizes</header>
          <ul>
            {allSizes.map((val) => (
              <li key={val}>
                <input
                  id={val}
                  onChange={onSizeChange}
                  type='checkbox'
                  checked={sizes.includes(val)}
                  value={val}
                />
                <label htmlFor={val}>{val}</label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <header>Ideal For</header>
          <ul>
            <li>
              <input
                id='Men'
                name='ideal'
                onChange={onIdealChange}
                type='radio'
                checked={ideals === 'Men'}
                value='Men'
              />
              <label htmlFor='Men'>Men</label>
            </li>
            <li>
              <input
                id='Women'
                name='ideal'
                onChange={onIdealChange}
                type='radio'
                checked={ideals === 'Women'}
                value='Women'
              />
              <label htmlFor='Women'>Women</label>
            </li>
            <li>
              <input
                id='MenWomen'
                name='ideal'
                onChange={onIdealChange}
                type='radio'
                checked={ideals === 'MenWomen'}
                value='MenWomen'
              />
              <label htmlFor='MenWomen'>Men &amp; Women</label>
            </li>
          </ul>
        </div>
      </section>
      <section className='product_list'>
        {!products.length && (
          <div className='no_product_message'>
            <h5>No products matches the filter</h5>
          </div>
        )}
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}

export default App;
