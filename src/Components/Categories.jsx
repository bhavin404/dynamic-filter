import React, { useEffect, useState } from "react";
import axios from 'axios';

const Categories = ({ className,clickHandler }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios.get('http://localhost:3001/categories')
      .then(response => {
        // Set the fetched data to the state
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div className={`${className} my-[50px]`}>
      Show Categories List here...
      <div className="container bg-gray-200 p-2 mx-auto">
        {categories.map((cats,index)=> 
        <p onClick={()=> clickHandler(cats.id)} key={index} className="p-2 cursor-pointer">{cats.name}</p>
        
        )}
        


        </div>
      </div>
  );
};

export default Categories;
