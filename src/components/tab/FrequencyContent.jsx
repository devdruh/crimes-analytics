import createActiveTab from '../../zustand/createActiveTab';
import FrequencyContainer from '../stats/FrequencyContainer';
const FrequencyContent = () => {
    const { activeTab } = createActiveTab();
    return activeTab !== '' && activeTab === 3 && <FrequencyContainer />
}

export default FrequencyContent