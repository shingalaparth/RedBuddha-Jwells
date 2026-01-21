import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const Searchbar = () => {
  const { searchTerm, setSearchTerm, showsearch, setshowsearch } = useContext(ShopContext);
  const location= useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) console.log("Searching for:", searchTerm);
  };
 
  useEffect(()=>{
    if(location.pathname!=='collection'){
      setshowsearch(false)
    }
  },[location.pathname])

  // Search Icon
  const SearchIcon = () => <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

  // Cross Icon (always visible)
  const CrossIcon = () => <svg className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={() => { setSearchTerm(""); setshowsearch(false); }}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;

  return showsearch ? (
    <div className="flex justify-center py-6 px-4">
      <form onSubmit={handleSearch} className="w-full max-w-lg">
        <div className="relative">

          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon />
          </div>

          {/* Input Field */}
          <input type="text" placeholder="Search for Rings, Necklaces, and more..." className="w-full py-2 pl-10 pr-10 text-base text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition duration-150 shadow-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} aria-label="Search input field" />

          {/* Cross Icon (always visible) */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <CrossIcon />
          </div>

        </div>
      </form>
    </div>
  ) : null;
};

export default Searchbar;
