import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const Alert = ({ variant = 'info', children }) => {
  const variantClasses = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    destructive: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`p-4 rounded-lg ${variantClasses[variant]} flex items-center`} role="alert">
      <AlertCircle className="h-5 w-5 mr-3" />
      <div className="flex-1">{children}</div>
    </div>
  );
};

const AlertDescription = ({ children }) => {
  return <p className="text-sm">{children}</p>;
};

export { Alert, AlertDescription };
