import createActiveTab from '../../zustand/createActiveTab'
import StatsContainer from '../stats/StatsContainer'

const OverviewContent = () => {
    const { activeTab } = createActiveTab();
    return activeTab !== '' && activeTab === 1 && <StatsContainer />
}

export default OverviewContent