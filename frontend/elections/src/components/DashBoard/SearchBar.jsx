// components/SearchBar.jsx
import React from 'react';
import { FaSearch as IconSearch } from 'react-icons/fa';

const SearchBar = ({ search, onSearchChange }) => {
  return (
    <div className="flex items-center border rounded-lg bg-white shadow-md w-full md:w-auto">
      <input
        type="text"
        placeholder="ابحث بالاسم"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border-none p-3 rounded-l-lg focus:outline-none w-full"
        aria-label="البحث بالاسم"
      />
      <IconSearch className="ml-2 text-gray-400 text-xl" />
    </div>
  );
};

export default SearchBar;
