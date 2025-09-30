'use client';
import React from 'react';

const STATUS_OPTIONS = [
  { value: 0, label: "Gözləmədə" },
  { value: 1, label: "Təsdiqləndi" },
  { value: 2, label: "Hazırlanır" },
  { value: 3, label: "Yoldadır" },
  { value: 4, label: "Çatdırıldı" },
  { value: 5, label: "Ləğv edildi" },
];

interface StatusSelectProps {
  value: number;
  onChange: (newStatus: number) => void;
  disabled?: boolean;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ value, onChange, disabled }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
      disabled={disabled}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default StatusSelect;