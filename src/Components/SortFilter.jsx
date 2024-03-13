import React from 'react'

const SortFilter = (props) => {
  return (
<>
<label htmlFor="">Sort:</label>
<div className=' border border-black rounded-lg'>
    <select className='p-2' id="status" onChange={props.handlerChange } value={props.value}>
<option value="">Select Status</option>

<option value="Name">Name</option>
<option value="Featured">Featured</option>
<option value="Popularity">Popularity</option>
<option value="Cashback">Cashback</option>

</select>
</div>  
</>
  )
}

export default SortFilter