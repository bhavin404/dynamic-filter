import React, { useState } from 'react'

const SearchFilter = (props) => {

  
  return (
    <div className='block'>
        <label htmlFor="">Searchbox:</label> <br />
        <input name="searchFilter" id="searchFilter" className="border p-2 border-black rounded-lg" type="text" onChange={props.handlerChange} value={props.value}  placeholder='Search by store name'></input>
    </div>
  )
}

export default SearchFilter