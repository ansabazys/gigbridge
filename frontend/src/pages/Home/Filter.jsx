import React from 'react'
import { TbFilter } from "react-icons/tb";

const Filter = () => {
  return (
    <section>
        <div className='flex justify-center items-center gap-1 hover:bg-purple-200 py-[.3rem] px-[.6875rem] hover:text-purple-900 border rounded-md'>
            <TbFilter size={20}/>
            <button>Filter</button>
        </div>
    </section>
  )
}

export default Filter
