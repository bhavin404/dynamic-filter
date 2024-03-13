import React from 'react'

const StatusFilter = (props) => {
  return (
    <div className='block'>
    <label htmlFor="">Status:</label>
    <div className=' border border-black rounded-lg'>
        <select className='p-2' id="status" onChange={props.handlerChange } value={props.value}>
  <option value="">Select Status</option>

  <option value="publish">Publish</option>
  <option value="draft">Draft</option>
  <option value="trash">Trash</option>
</select>
    </div>
    </div>
  )
}

export default StatusFilter