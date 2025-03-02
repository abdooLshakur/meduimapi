import Link from 'next/link'
import { fetchAllproduct } from '../getproduct' // Correct the function name
import styles from './productstyle.module.css';

const Productpage = async () => {
  try {
    const cards = await fetchAllproduct(); // Correct function name here as well
    console.log(cards.products);

    return (
      <div className={styles.product_holder}>
        <h1 style={{ textAlign: "center", fontSize: "40px", fontWeight: "500", margin: "60px" }}>
          Blog Page
        </h1>
        <div className={styles.product_grid}>
          {
            cards.products.length > 0 ? (
              cards.products.map((card) => (
                <div key={card.id} className={styles.product_card}>
                  <div className={styles.card_content}>
                    <div><img src={card.images[3]} className={styles.product_grid_image} alt="" /></div>
                    <span>{card.title}</span>
                    <p>${card.price}</p>
                    <p>{card.category}</p>
                    <Link href={`/product/${card.id}`}><button className={styles.button}>See Details</button></Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )
          }
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return <p>Error loading products</p>;
  }
}

export default Productpage;
