import { useEffect } from 'react';
import createSelectedFrequency from '../../zustand/createSelectedFrequency';

const FrequencyFilter = () => {

    const radioItems = [
        {
            id: 1,
            title: 'Daily',
            checked: false,
        },
        {
            id: 2,
            title: 'Weekly',
            checked: false,
        },
        {
            id: 3,
            title: 'Monthly',
            checked: false,
        }
    ];

    const { selectedFrequency, setSelectedFrequency } = createSelectedFrequency();

    useEffect(() => {
        const localSelectedFrequency = localStorage.getItem('selectedFrequency');
        if (localSelectedFrequency !== null) {
            setSelectedFrequency(parseInt(localSelectedFrequency));
        } else {
            localStorage.setItem('selectedFrequency', 1);
            setSelectedFrequency(1);
        }
    }, [setSelectedFrequency]);

    return (
        <>
            {
                radioItems.map((item) => (
                    <div className="form-control" key={item.id}>
                        <label className="label cursor-pointer">
                            <span className="label-text">{item.title}</span>
                            <input type="radio" name="radio-10" className="radio checked:bg-primary" checked={selectedFrequency === item.id} onChange={() => { setSelectedFrequency(item.id); localStorage.setItem('selectedFrequency', item.id) }} />
                        </label>
                    </div>
                ))
            }
        </>
    )
}

export default FrequencyFilter