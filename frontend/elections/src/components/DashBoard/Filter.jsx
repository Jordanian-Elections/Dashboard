// components/Filter.jsx
import React from 'react';
import { FaFilter as IconFilter } from 'react-icons/fa';

const Filter = ({ role, onRoleChange }) => {
  return (
    <div className="flex items-center border rounded-lg bg-white shadow-md w-full md:w-auto">
      <select
        value={role}
        onChange={(e) => onRoleChange(e.target.value)}
        className="border-none p-3 rounded-l-lg focus:outline-none w-full appearance-none"
        aria-label="تصفية حسب الدور"
      >
        <option value="">كل الأدوار</option>
        <option value="voter">ناخب</option>
        <option value="candidate">مرشح</option>
      </select>
      <IconFilter className="text-gray-400 ml-2 text-xl" />
    </div>
  );
};

export default Filter;
