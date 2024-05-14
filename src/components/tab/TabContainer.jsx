import React, { useEffect } from 'react'
import createActiveTab from '../../zustand/createActiveTab';
import expandChart from '../widget/ExpandChart';
import expandFrequencyChart from '../widget/ExpandFrequencyChart';

// eslint-disable-next-line react/prop-types
const TabContainer = ({ items }) => {

    const { activeTab, setActiveTab } = createActiveTab();

    useEffect(() => {

        activeTab === 1 ? expandChart.visible = true : expandChart.visible = false;
        activeTab === 3 ? expandFrequencyChart.visible = true : expandFrequencyChart.visible = false;

        const localActiveTab = localStorage.getItem('activeTab');
        if (localActiveTab !== null) {
            setActiveTab(parseInt(localActiveTab));
        }

    }, [setActiveTab, activeTab]);

    return (
        <div role="tablist" className="tabs tabs-lifted tabs-lg mt-2">

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