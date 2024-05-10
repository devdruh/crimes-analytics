import React, { useEffect } from 'react'
import createActiveTab from '../../zustand/createActiveTab';
import expandChart from '../widget/ExpandChart';

// eslint-disable-next-line react/prop-types
const TabContainer = ({ items }) => {

    const { activeTab, setActiveTab } = createActiveTab();

    useEffect(() => {

        if (activeTab === 3) {
            expandChart.visible = false;
        } else {
            expandChart.visible = true;
        }
    }, [activeTab]);

    return (
        <div role="tablist" className="tabs tabs-lifted tabs-lg mt-2">

            {
                // eslint-disable-next-line react/prop-types
                items.map((tab) => (
                    <React.Fragment key={tab.id}>
                        <a role="tab" className={`tab ${tab.id === activeTab ? 'tab-active' : ''}`} onClick={() => setActiveTab(tab.id)}>{tab.title}</a>
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