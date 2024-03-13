

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Pagination = () => {
  const [stores, setStores] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/stores?_page=${page}&_limit=20`);
      setStores(prevStores => [...prevStores, ...response.data]);
      setIsLoading(false); // Data loaded, hide loader
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Error occurred, hide loader
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement || document.body;
    if (scrollTop + clientHeight >= scrollHeight - 200 && !isLoading) {
      // Show loader
      setIsLoading(true);
      // Load next page of data
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto py-8 px-40">
      <h1 className="text-3xl font-semibold mb-6">All Stores</h1>
      <div className="grid grid-cols-2 gap-4">
        {stores.map((store, index) => (
          <div key={index} className="bg-white p-4 shadow rounded-md">
            <img src={store.logo} width={100} alt="" />
            {store.name}
            </div>
        ))}
        {isLoading && (
          <div className="bg-gray-200 p-4 shadow rounded-md text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
