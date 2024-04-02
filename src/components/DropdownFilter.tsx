import React, { useState } from 'react';
import styles from '../styles/DropdownFilter.module.css'
interface Option {
  label: string;
  value: string; 
}

interface DropdownProps {
  options: Option[];
  defaultValue?: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0].value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <select role="listbox" value={selectedValue} onChange={handleChange} className={styles.minimal}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;