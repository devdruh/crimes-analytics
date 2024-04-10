import { useEffect } from "react"
import LeftSideFilter from "./LeftSideFilter"
import useGetAttributeUniqueValues from "../../hooks/useGetAttributeUniqueValues";
import getLayerUrl from "../../utils/getLayerUrl";

const LeftSideFilters = () => {

    const { mci } = getLayerUrl();
    const { attributeValues } = useGetAttributeUniqueValues('MCI_CATEGORY', mci);

    useEffect(() => {

    }, [attributeValues]);

    return (<LeftSideFilter categoryOption={attributeValues} />)
}

export default LeftSideFilters