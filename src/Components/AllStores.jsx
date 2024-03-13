import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchFilter from "./SearchFilter";
import StatusFilter from "./StatusFilter";
import AlphabetFilter from "./AlphabetFilter";
import SortFilter from "./SortFilter";
import { useLocation } from 'react-router-dom';

let allFilter = [];

const AllStores = ({ className ,catId}) => {
  const [store, setStore] = useState([]);
  const [searchInputText, setSearchInputText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const [selectedAlphabet, setSelectedAlphabet] = useState("");
  const [selectedCashButton, setSelectedCashButton] = useState(false);
  const [selectedPromotedButton, setSelectedPromotedButton] = useState(false);
  const [selectedShareButton, setSelectedShareButton] = useState(false);
  const [like, setLike] = useState(false)
  const [id, setId] = useState("")
  
  const location = useLocation();

  const callapi = (query,keeper) => {
    const API_URL = "http://localhost:3001/stores";
    const MAIN_URL ="http://localhost:3000";

    const [key, value] = query?.split("=");
    const obj = { [key]: value };


    if (query) {

    
      const existingIndex = allFilter.findIndex(
        (filter) => Object.keys(filter)[0] === key
      );

      // If the key already exists in allFilter
      if (existingIndex !== -1) {

        const existingValue = Object.values(allFilter[existingIndex])[0];
        // If the key-value pair is the same, remove it from the allFilter array
        if (existingValue === value) {

          if(!keeper){
          allFilter.splice(existingIndex, 1);
          }
        } else {
          // If only the key is the same, update its value
          if(!keeper){
            console.log("entered")
          allFilter[existingIndex][key] = value;
          }
        }
      } else {
        // Otherwise, add the new object to the allFilter array

        allFilter.push(obj);
      }
    }





    let data = "";
    let queryString = ""; // Initialize an empty string to store the query string

    allFilter.forEach((filter) => {
      // Get the key and value from each object in the allFilter array
      const key = Object.keys(filter)[0];
      const value = filter[key];

      // Append the key-value pair to the queryString
      queryString += `${key}=${value}&`;
    });

    // Remove the trailing '&' from the queryString
    queryString = queryString.slice(0, -1);

    // Construct the final API URL with the query string
    let data111 = `${API_URL}/?${queryString}`;

    if(query){
    let updateQuery = `${MAIN_URL}/?${queryString}`

window.history.pushState({}, '', updateQuery);
    }
    if (query) {
      data = API_URL + "/?" + query;
    } else {
      data = API_URL;
    }
    
    axios
      .get(data111)
      .then((response) => {
        // Set the fetched data to the state
        const itemsWithLikedState = response.data.map(item => ({ ...item, liked: false }));

        setStore(itemsWithLikedState);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  

  const handleClick = (buttonName) => {
    if (buttonName == "cashback") {
      setSelectedCashButton(!selectedCashButton);
      callapi("cashback_enabled=1");
    } else if (buttonName == "promoted") {
      setSelectedPromotedButton(!selectedPromotedButton);
      callapi("is_promoted=1");
    } else if (buttonName == "share") {
      setSelectedShareButton(!selectedShareButton);
      callapi("is_sharable=1");
    }
  };

  useEffect(() => {

    const currentUrl = window.location.href;
const hasQueryParams = currentUrl.includes('?');

if(catId){
  callapi(`cats=${catId}`)
}

if (hasQueryParams && !catId) {
  const queryString = currentUrl.split('?')[1];
  callapi(queryString,"queryKeeper");

} else {
  callapi("");
}

    
  }, [catId]);

  const searchInput = (e) => {
    setSearchInputText(e.target.value);

    callapi(`name_like=${e.target.value}`);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);

    callapi(`status=${e.target.value}`);
  };
  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
    if (e.target.value == "Name") {
      callapi("_sort=name");
    } else if (e.target.value == "Featured") {
      callapi("_sort=featured&order=desc");
    } else if (e.target.value == "Popularity") {
      callapi("_sort=clicks&_order=desc");
    } else if (e.target.value == "Cashback") {
      callapi("_sort=amount_type,cashback_amount&_order=asc,desc");
    }
  };

  const handleAlphabetChange = (alphabet) => {
    if(alphabet == selectedAlphabet){
    setSelectedAlphabet("")
    }else{

    setSelectedAlphabet(alphabet);
  }

    callapi(`name_like=^${alphabet}`);
  };

  const likedProduct = (id)=>{
    setStore(store.map(item =>
      item.id === id ? { ...item, liked: !item.liked } : item
    ));
   
  }

  // const filteredStores = store.filter(store => {
  //   // Filter by search input
  //   const searchMatch = store.name.toLowerCase().includes(searchInputText.toLowerCase());

  //   // Filter by selected status
  //   const statusMatch = selectedStatus === "" || store.status === selectedStatus;

  //   // Filter by selected alphabet
  //   const alphabetMatch = selectedAlphabet === "" || store.name[0].toUpperCase() === selectedAlphabet;

  //   return searchMatch && statusMatch && alphabetMatch;
  // });

  return (
    <div className={`my-[50px] ${className}`}>
      <div className="flex gap-3 justify-between p-2">
        <div className="flex gap-2">
          <StatusFilter
            handlerChange={handleStatusChange}
            value={selectedStatus}
          />

          <SearchFilter handlerChange={searchInput} value={searchInputText} />
        </div>
        <div>
          <SortFilter handlerChange={handleSortChange} value={selectedSort} />
        </div>
      </div>
      <div className="p-2">
        <AlphabetFilter
          handlerChange={handleAlphabetChange}
          selected={selectedAlphabet}
        />
      </div>
      <div className="mt-2 p-2">
        <button
          className={selectedCashButton ? "selected" : ""}
          onClick={() => handleClick("cashback")}
        >
          Cashback
        </button>
        <button
          className={selectedPromotedButton ? "selected" : ""}
          onClick={() => handleClick("promoted")}
        >
          Promoted
        </button>
        <button
          className={selectedShareButton ? "selected" : ""}
          onClick={() => handleClick("share")}
        >
          Share and earn
        </button>
      </div>
      <div className="container mx-auto mt-2">
        <div className="bg-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2">
          {store.map((stores, index) => {
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between">
                <img src={stores.logo} width={70} alt="" />

                  <div onClick={() =>likedProduct(stores.id)}>
                    {stores.liked ? 
                    <img src="/redHeart.png"  width="20" alt="" />
                  :
                  <img src="/normalHeart.png"  width="20" alt="" />

                  }

                  </div>
                
                </div>
                {stores.name} <br />
                <p className="cashback" style={{ color: "red" }}>
                  {" "}
                  {stores.cashback_type} upto {stores.cashback_percent} %{" "}
                </p>{" "}
                <br />
                <button className="bg-black rounded-lg text-white p-2">
                  Shop now
                </button>
                {stores.status}
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        button {
          margin-right: 10px;
          padding: 5px 10px;
          border: none;
          background-color: #ccc;
          cursor: pointer;
        }
        .selected {
          background-color: blue;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default AllStores;
