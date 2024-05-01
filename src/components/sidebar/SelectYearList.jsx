/* eslint-disable react/prop-types */
// import { useState } from 'react'

const SelectYearList = ({ options, onChange, selected }) => {
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
                <span className="label-text">Year</span>
            </div>
            <select className="select select-bordered select-sm" value={selected} onChange={handleChange}>
                <option disabled>--select--</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

export default SelectYearList