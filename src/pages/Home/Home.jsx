import React from 'react'
import CategoryCard from './CategoryCard'
import categories from '../../data/Category'

const Home = () => {
  return (
    <div className="container my-5">
    <h2 className="mb-4 text-center">Our Categories</h2>
    <div className="row justify-content-center">
      {categories.map((category, index) => (
        <div className="col-md-4 d-flex justify-content-center" key={index}>
          <CategoryCard 
            image={category.imageUrl} 
            title={category.title} 
            route={category.route} 
          />
        </div>
      ))}
    </div>
  </div>
  )
}

export default Home