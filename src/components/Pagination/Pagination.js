import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPageProduct, setPageDirection } from '../../features/Product/ProductSlice';
import { Link } from 'react-router-dom';



export default function Pagination() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(setPageProduct(page));
  }, [page]);


  const total = useSelector(state => state.product.count);
  //console.log(total);
  const no_of_pages = Math.ceil(total / 9);


  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          onClick={e => (page > 1 ? setPage(page - 1) : setPage(page))}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          onClick={e => (page < no_of_pages ? setPage(page + 1) : setPage(page))}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{((page - 1) * 9) + 1}</span> to <span className="font-medium">{page * 9 > total ? total : page * 9}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Link
              onClick={e => (page > 1 ? setPage(page - 1) : setPage(page))}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {

              Array.from({ length: no_of_pages }).map((el, index) =>
              (<div key={index}
                onClick={e => setPage(index + 1)}
                className={`relative inline-flex items-center cursor-pointer ${index + 1 === page ? ' bg-indigo-600 text-white ' : ''} px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0`}
              >
                {index + 1}
              </div>)
              )
            }



            <Link
              onClick={e => (page < no_of_pages ? setPage(page + 1) : setPage(page))}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
