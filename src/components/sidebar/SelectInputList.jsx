/* eslint-disable react/prop-types */
import '../../index.css'
import { useEffect } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useThemeSelector from '../../zustand/useThemeSelector';

const animatedComponents = makeAnimated();

const SelectInputList = ({ options, labelText, onChange }) => {

    const { isDark } = useThemeSelector();

    const handleChange = (event) => {

        if (event.length) {
            if (onChange) {
                onChange(event);
            }
        } else {
            if (onChange) {
                onChange([]);
            }
        }

    };

    useEffect(() => {

    }, [isDark]);

    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">{labelText}</span>
            </div>
            {/* <select className="select select-bordered select-sm" value={selectedValues} onChange={handleSelectChange}>
                <option value=''>--select--</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select> */}
            <div className='divider'></div>
            <Select
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                    control: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: isDark ? 'initial' : 'inherit',
                        borderColor: isDark ? 'var(--fallback-nc,oklch(var(--nc)/0.3))' : 'var(--fallback-b1,oklch(var(--nc)))',
                        ':current': {
                            borderColor: 'red',

                        }
                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: isDark ? 'var(--fallback-b1,oklch(var(--b1)/1))' : 'white',
                        border: isDark ? 'solid 1px var(--fallback-b3,oklch(var(--b3)/0.5))' : ''

                    }),
                    option: (baseStyles) => ({
                        ...baseStyles,
                        ':active': {
                            backgroundColor: isDark ? 'var(--fallback-b1,oklch(var(--b3)/0.8))' : ''
                        }
                    }),
                    multiValue: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: 'var(--fallback-b3,oklch(var(--b3)))'
                    }),
                    multiValueLabel: (baseStyles) => ({
                        ...baseStyles,
                        color: 'var(--fallback-b1,oklch(var(--bc)/1))'
                    }),
                    multiValueRemove: (baseStyles) => ({
                        ...baseStyles,
                        color: 'var(--fallback-b1,oklch(var(--bc)/1))',
                        ':hover': {
                            backgroundColor: (isDark) ? 'var(--fallback-n,oklch(var(--n)))' : 'var(--fallback-b3,oklch(var(--n)/0.3))',
                            color: (isDark) ? 'var(--fallback-s,oklch(var(--a)))' : 'var(--fallback-bc,oklch(var(--bc)))',
                        },
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                        ...theme.colors,
                        primary25: 'var(--fallback-b3,oklch(var(--b3)/1))',
                        primary: isDark ? 'var(--fallback-nc,oklch(var(--nc)/0.4))' : 'var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))',
                    },

                })}
                closeMenuOnSelect={false}
                isMulti
                components={animatedComponents}
                onChange={handleChange}
                options={options}
            />
        </label>
    );
}

export default SelectInputList