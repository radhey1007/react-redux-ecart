import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCST = [
  {
    id:'p1',
    price:6,
    title:'My First Book',
    description:'The test book i have wrote ever'
  },
  {
    id:'p2',
    price:12,
    title:'My Second Book',
    description:'The test second book i have wrote ever'
  },
  {
    id:'p3',
    price:4,
    title:'My Third Book',
    description:'The test third book i have wrote ever'
  },
  {
    id:'p4',
    price:10,
    title:'My Fourth Book',
    description:'The test Fourth book i have wrote ever'
  },
  {
    id:'p5',
    price:20,
    title:'My Fifth Book',
    description:'The test Fifth book i have wrote ever'
  }
]


const Products = (props) => {



  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCST.map((product) => (
          <ProductItem
            title={product.title}
            description={product.description}
            id={product.id}
            key={product.id}
            price={product.price}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
