import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx'
import ProductItem from './ProductItem.jsx'

const Relatedproducts = ({ category, subcategory }) => {

  const { products } = useContext(ShopContext)
  const [related, setrelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let copyproduct = products.slice()
      copyproduct = copyproduct.filter((item) => category === item.category)
      copyproduct = copyproduct.filter((item) => subcategory === item.subcategory)
      setrelated(copyproduct.slice(0, 5))
    }
  }, [products])

  return (
    <div className='my-24'>
      <div className='text-center mb-12'>
        <Title title1={'YOU'} title2={'MIGHT ALSO LIKE'} />
        <p className='text-gray-500 mt-2 text-sm'>Completing your look with these perfect matches</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10'>
        {
          related.map((item, index) => {
            return <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.images[0]} />
          })
        }
      </div>
    </div>
  )
}

export default Relatedproducts
