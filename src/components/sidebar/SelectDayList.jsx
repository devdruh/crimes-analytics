/* eslint-disable react/prop-types */
// import { useEffect, useState } from 'react'

const SelectDayList = ({ options, onChange, selected }) => {
    // const [selectedValue, setSelectedValue] = useState(selected);

    const handleChange = (event) => {
        const value = event.target.value;
        // setSelectedValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Day</span>
            </div>
            <select className="select select-bordered select-sm" value={selected} onChange={handleChange}>
                <option value=''>--select--</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value} name={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

export default SelectDayList