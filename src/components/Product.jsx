import './Product.css';

function Product({ product }) {
  return (
    <div className='product'>
      <img src={product.image} alt={product.name} />
      <div className='product_details'>
        <p className='product_brand'>{product.brand}</p>
        <h3 title={product.name} className='product_name'>
          {product.name}
        </h3>
        <p className='product_price'>₹{product.price}</p>
        <p className='product_sizes'>
          <span className='size_text'>Size</span>{' '}
          {product.sizes.map((size, i) => (
            <span key={product.id + size + i}>
              {size}
              {'  '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default Product;
