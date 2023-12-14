import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import ProductDetail from '../components/ProductDetail/ProductDetail'

const ProductDetailPage = () => {
    return (
        <div>
            <Navbar>
                <ProductDetail />
            </Navbar>
        </div>
    )
}

export default ProductDetailPage