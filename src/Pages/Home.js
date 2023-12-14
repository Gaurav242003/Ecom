import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Filter from '../components/Filter/Filter'

const Home = () => {
  return (
    <div>
        <Navbar>
            <Filter/>
        </Navbar>
    </div>
  )
}

export default Home