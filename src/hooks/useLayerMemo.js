import { useMemo } from 'react'
import useLayerMajorCrimeIndicators from './useLayerMajorCrimeIndicators';
import map from '../components/map/Map';

const useLayerMemo = () => {

    const { layerMajorCrimeIndicators } = useLayerMajorCrimeIndicators();

    useMemo(() => {

        map.layers.removeAll();
        map.addMany([layerMajorCrimeIndicators]);

    }, [layerMajorCrimeIndicators])

    return () => { }
}

export default useLayerMemo