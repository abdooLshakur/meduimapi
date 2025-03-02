
import { fetchproduct } from '@/app/getproduct';
import styles from "../productstyle.module.css"

const Singleprooduct = async({params}) => {
  const card = await fetchproduct(params.id)
  return (
    <div className={styles.product_holder}>
      <div className={styles.single_container}>
    <div className={styles.single_grid}>
     <div>
      <img className={styles.single_image} src={card.images} alt="" />
      </div>

     <div className={styles.single_detail}>
     <div><h1>{card.title}</h1></div>
    <div><span className={styles.single_title}>Price:</span><span> ${card.price}</span><strike className={styles.red}>$100</strike></div>
    <div><span className={styles.single_title}>Category:</span> <span>{card.category}</span></div>
    <div><span className={styles.single_title}>Description:</span> <span>{card.description}</span></div>
    <div className={styles.cart_div}><button className={styles.cart_button}>Add to Cart</button></div>
    </div>
    </div>
    </div>
    </div>
   
  )
}

export default Singleprooduct