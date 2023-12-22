import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchAllProduct,setPageProduct } from "../../features/ProductSlice"
import { StarIcon } from '@heroicons/react/24/outline'




export default function Product() {
  const dispatch = useDispatch();
  useEffect(() => {
    //console.log('hello');
    dispatch(setPageProduct({pageNo:1,limit:9}));
   
  }, [dispatch])
 
  const products = useSelector(state => state.product.allProduct);
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {products.map((product) => (
            <Link to={`/product-detail/${product.id}`}  key={product.id}>
              <div key={product.id} className="group relative border-solid border-2 p-2">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </div>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 flex items-center">
                      {product.rating}<StarIcon className="h-4 w-4 inline ml-1"></StarIcon>
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
