import React, { useState } from 'react'
import FilterProducts from './FilterProducts'
import { Link } from 'react-router-dom'

const SearchBar = ({ setSearched, setFinalFilter, finalFilter }) => {
  const [toFilter, setToFilter] = useState(false)
  const [search, setSearch] = useState('')

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearched(search)
    }
  }

  const handleClick = () => {
    setToFilter(prev => !prev)
  }

  return (
    <div className='flex flex-wrap items-center justify-between  py-3 px-5 w-full min-h-[10%] max-h-max mt-10 relative'>
      <div className='w-full mb-4 mr-4 flex items-center justify-around'>
      <button 
        onClick={handleClick}
        className='bg-stone-200 rounded-full text-2xl font-bold px-4 py-2 z-10'>
        Filter
      </button>
      <Link to='/cart'>
      <button className='bg-slate-900 text-white  text-2xl font-bold px-2 py-2 rounded-full'>
        View Cart
      </button>
      </Link>
          </div>

      {/* Filter Options Div  */}
      {toFilter && (
        <FilterProducts setFinalFilter={setFinalFilter} setToFilter={setToFilter}/>
      )}
<div className='w-full flex items-center justify-center'>
      <input
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          const value = e.target.value
          setSearch(value)
          setSearched(value) // always use the latest input value
        }}
        placeholder='search here the products you need'
        value={search}
        className='rounded-full py-2 px-4 text-2xl w-[100%] text-emerald-900 bg-stone-200 border-[1px] border-slate-900 h-[100%]'
        type="text"
        />
        </div>
    </div>
  )
}

export default SearchBar


// import React, { useEffect, useState } from 'react'
// import FilterProducts from './FilterProducts'

// const SearchBar = ({setSearched,setFinalFilter,finalFilter}) => {
//     const [toFilter, setToFilter] = useState(false)
//     const [search, setSearch] = useState(``)
//     const [filters, setFinalFilters] = useState(finalFilter)
    
//     useEffect(() => {
//       setFinalFilter(filters)
//     }, [filters])
//        const handleKeyDown = (event) => {
//         if (event.key === "Enter") {
//             // Perform your desired action when Enter is pressed
//             setSearched(search)
//         }
//     };
//     const handleClick=()=>{
//         setToFilter(prev=>!prev)
//     }
//   return (
//     <div className='flex flex-wrap items-center justify-between py-3 px-5 w-full h-[10%]  mt-10 relative'>
//       <button 
//       onClick={handleClick}
//       className='bg-stone-200 rounded-full text-2xl font-bold px-4 py-2 z-10'>
//        Filter
//       </button>
//       {/* Filter Options Div  */}
// {
// (toFilter)?
// <FilterProducts setFinalFilter={setFinalFilters} setToFilter={setToFilter}/>:``
// }
//       <input
//       onKeyDown={(event)=>{handleKeyDown(event)}}
//       onChange={(e)=>{setSearch(e.target.value); setSearched(search)}}
//       placeholder='search here the products you need'
//       value={search}
//         className='rounded-full py-2 px-4 text-2xl w-[300px] text-emerald-900 bg-stone-200 border-[1px] border-slate-900 sm:w-[80%] h-[100%]'
//         type="text" />
//         </div>
//   )
// }

// export default SearchBar
