import { useEffect } from 'react'
import useSliderWidget from '../zustand/useSliderWidget';
import slider from '../components/widget/Slider';
import useLeftSideFilter from '../zustand/useLeftSideFilter';
import getDaysArray from '../utils/getDaysArray';
import getMonthsArray from '../utils/getMonthsArray';
import { useShallow } from 'zustand/react/shallow';

const useSliderInit = () => {

    const { setSliderValue } = useSliderWidget();
    const { selectedYear, selectedMonth, selectedDay } = useLeftSideFilter(useShallow((state) => ({
        selectedYear: state.selectedYear,
        selectedMonth: state.selectedMonth,
        selectedDay: state.selectedDay,
    })));

    useEffect(() => {

        const today = new Date();
        const months = getMonthsArray();

        const handleThumbDrag = (event) => {

            if (event.state === 'stop') {
                const value = event.value;

                slider.viewModel.setValue(0, value);

                if (selectedYear !== '') {
                    const findMonthValue = months.find(month => month.value === value);
                    setSliderValue(findMonthValue?.label);
                }

                if (selectedMonth !== '') {
                    const findMonthValue = months.find(month => month.label === selectedMonth);
                    const days = getDaysArray(parseInt(selectedYear), parseInt(findMonthValue?.value + 1));
                    if (value > days.length) {
                        slider.values = [Math.floor(value / 2)];
                        setSliderValue('Day-' + Math.floor(value / 2));
                    } else {
                        slider.values = [value];
                        setSliderValue('Day-' + value);
                    }
                }

                if (selectedDay !== '') {
                    const today = new Date();
                    today.setHours(value, 0, 0, 0);
                    const valueString = today.toLocaleString('en-US', { hour: 'numeric', hour12: true });
                    setSliderValue(valueString);
                }
            }

        }

        const sliderInit = () => {

            if (selectedYear !== '' && selectedMonth === '' && selectedDay === '') {
                const value = today.getMonth() + 1;

                slider.min = 1;
                slider.max = 12;
                slider.values = [value];
                slider.steps = 1;

                const findMonthValue = months.find(month => month.value === value);

                setSliderValue(findMonthValue.label);

            } else if (selectedYear !== '' && selectedMonth !== '' && selectedDay === '') {
                const value = today.getDate();
                const findMonthValue = months.find(month => month.label === selectedMonth);
                const days = getDaysArray(parseInt(selectedYear), parseInt(findMonthValue?.value));

                slider.min = 1;
                slider.max = days.length;
                slider.steps = 1;

                if (value > days.length) {

                    slider.values = [Math.floor(value / 2)];
                    setSliderValue('Day-' + Math.floor(value / 2));

                } else {

                    slider.values = [value];
                    setSliderValue('Day-' + value);
                }

            } else if (selectedYear !== '' && selectedMonth !== '' && selectedDay !== '') {
                const value = today.getHours();
                const valueString = today.toLocaleString('en-US', { hour: 'numeric', hour12: true });

                slider.min = 1;
                slider.max = 24;
                slider.values = [value];
                setSliderValue(valueString);
            }

            slider.on("thumb-drag", handleThumbDrag);

            return () => { handleThumbDrag }

        }

        sliderInit();

    }, [setSliderValue, selectedYear, selectedMonth, selectedDay]);

}

export default useSliderInit