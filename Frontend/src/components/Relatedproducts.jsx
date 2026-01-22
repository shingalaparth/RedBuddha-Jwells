import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx'
import ProductItem from './ProductItem.jsx'

const Relatedproducts = ({ category, subcategory, id }) => {

  const { products } = useContext(ShopContext)
  const [related, setrelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let temp = products.slice();

      // Exclude current product if id is provided
      if (id) {
        temp = temp.filter(item => item._id !== id);
      }

      // 1. High Priority: Same Category AND Same SubCategory
      const sameSubCategory = temp.filter((item) =>
        item.category === category && item.subCategory === subcategory
      );

      // 2. Medium Priority: Same Category but different SubCategory
      const sameCategory = temp.filter((item) =>
        item.category === category && item.subCategory !== subcategory
      );

      // 3. Low Priority: Random remaining products (different Category)
      const otherProducts = temp.filter((item) =>
        item.category !== category
      );

      // Shuffle other products for randomness
      const shuffledOthers = otherProducts.sort(() => 0.5 - Math.random());

      // Combine all pools in order
      const finalSelection = [...sameSubCategory, ...sameCategory, ...shuffledOthers];

      // Take top 5
      setrelated(finalSelection.slice(0, 5));
    }
  }, [products, category, subcategory, id])

  return (
    <div className='my-24'>
      <div className='text-center mb-12'>
        <Title title1={'YOU'} title2={'MIGHT ALSO LIKE'} />
        <p className='text-gray-500 mt-2 text-sm'>Completing your look with these perfect matches</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10'>
        {
          related.map((item, index) => {
            return <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.images[0]}
            // Passing placeholder/0 as we don't have ratings in this context yet
            // ProductItem handles undefined gracefully
            />
          })
        }
      </div>
    </div>
  )
}

export default Relatedproducts
