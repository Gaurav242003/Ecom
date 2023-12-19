import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import ProductDetail from '../components/ProductDetail/ProductDetail'
import {useParams } from 'react-router-dom'

const ProductDetailPage = () => {
  const params=useParams()
  const id=params.id
 //console.log(id);
    return (
        <div>
            <Navbar>
                <ProductDetail  id={id}/>
            </Navbar>
        </div>
    )
}

export default ProductDetailPage