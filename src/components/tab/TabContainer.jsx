import React, { useEffect } from 'react'
import createActiveTab from '../../zustand/createActiveTab';
import expandChart from '../widget/ExpandChart';
import expandFrequencyChart from '../widget/ExpandFrequencyChart';
import { viewClosePopup } from '../../utils/views';
import { queryByTab } from '../../utils/layers';
import createLeftSideFilter from '../../zustand/createLeftSideFilter';
import expandNeighbourhoodChart from '../widget/ExpandNeighbourhoodChart';

// eslint-disable-next-line react/prop-types
const TabContainer = ({ items }) => {

    const { activeTab, setActiveTab } = createActiveTab();
    const { selectedYear, selectedMonth, selectedDay, selectedCategories } = createLeftSideFilter();

    useEffect(() => {

        const localActiveTab = localStorage.getItem('activeTab');
        if (localActiveTab !== null) {
            setActiveTab(parseInt(localActiveTab));
        } else {
            setActiveTab(1);
        }

        activeTab === 1 ? expandChart.visible = true : expandChart.visible = false;
        activeTab === 3 ? expandFrequencyChart.visible = true : expandFrequencyChart.visible = false;
        activeTab === 4 ? expandNeighbourhoodChart.visible = true : expandNeighbourhoodChart.visible = false;

        // update layer query on change of tab
        if (activeTab === 1 && selectedYear !== '') {
            const params = {
                year: selectedYear,
                month: selectedMonth,
                day: selectedDay,
                categories: selectedCategories,
                tab: 1,
            };
            queryByTab(params);
        }

        if (activeTab === 3 && selectedYear !== '') {
            let params = {
                year: selectedYear,
                tab: 3,
            };
            queryByTab(params);
        }

        if (activeTab === 4 && selectedYear !== '') {
            let params = {
                year: selectedYear,
                tab: 4,
            };
            queryByTab(params);
        }

        // close popup on change tab
        viewClosePopup();

    }, [setActiveTab, activeTab, selectedYear, selectedMonth, selectedDay, selectedCategories]);

    return (
        selectedYear !== '' && activeTab !== '' &&
        <div role="tablist" className="tabs tabs-lifted md:tabs-lg mt-2">
            {
                // eslint-disable-next-line react/prop-types
                items.map((tab) => (
                    <React.Fragment key={tab.id}>
                        <a role="tab" className={`tab ${tab.id === activeTab ? 'tab-active' : ''}`} onClick={() => { setActiveTab(tab.id); localStorage.setItem('activeTab', tab.id) }}>{tab.title}</a>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 dark:border-neutral rounded-box rounded-b-none">
                            {tab.content}
                        </div>
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default TabContainer