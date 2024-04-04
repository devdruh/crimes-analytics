/* eslint-disable react/prop-types */
import { useState } from 'react'

const SelectMonthList = ({ options, onChange }) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Month</span>
            </div>
            <select className="select select-bordered select-sm" value={selectedValue} onChange={handleChange}>
                <option value=''>--select--</option>
                {options.map((option) => (
                    <option key={option.value} value={option.label} name={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

export default SelectMonthList