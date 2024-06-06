import createActiveTab from '../../zustand/createActiveTab';
import DivisionContainer from '../stats/DivisionContainer'

const DivisionContent = () => {
    const { activeTab } = createActiveTab();
    return activeTab !== '' && activeTab === 2 && <DivisionContainer />
}

export default DivisionContent