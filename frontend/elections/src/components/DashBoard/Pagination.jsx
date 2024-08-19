// components/Pagination.jsx
import React from 'react';
import { FaChevronLeft as IconChevronLeft, FaChevronRight as IconChevronRight } from 'react-icons/fa';

const Pagination = ({ page, total, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="pagination mt-6 flex items-center justify-between">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        className="bg-zait text-white p-2 rounded-lg flex items-center transition duration-300"
        disabled={page === 1}
      >
        <IconChevronRight />
      </button>
      <span className="text-gray-700">
        صفحة {page} من {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        className="bg-zait text-white p-2 rounded-lg flex items-center transition duration-300"
        disabled={page >= totalPages}
      >
        <IconChevronLeft />
      </button>
    </div>
  );
};

export default Pagination;
