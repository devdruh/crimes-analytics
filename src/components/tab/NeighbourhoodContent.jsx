import createActiveTab from '../../zustand/createActiveTab'
import NeighbourhoodContainer from '../stats/NeighbourhoodContainer'

const NeighbourhoodContent = () => {

    const { activeTab } = createActiveTab();
    return activeTab !== '' && activeTab === 4 && <NeighbourhoodContainer />
}

export default NeighbourhoodContent