/* eslint-disable react/prop-types */
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import { useEffect } from 'react'
import view from "../map/View";
import useThemeSelector from "../../zustand/useThemeSelector";

const Spinner = ({ loadingRef }) => {

    const { isDark } = useThemeSelector();

    useEffect(() => {

        if (loadingRef.current) {
            reactiveUtils.when(
                () => view.updating,
                async () => {
                    view.ui.add(loadingRef.current, "top-right");

                    const timeId = setTimeout(() => {
                        view.ui.remove(loadingRef.current);
                    }, 500);
                    return () => clearTimeout(timeId);
                });
        }

        const abortController = new AbortController();
        const initLoading = async () => {
            await reactiveUtils.whenOnce(
                () => !view.updating, abortController.signal)
                .then(() => {
                    const timeId = setTimeout(() => {
                        view.ui.remove(loadingRef.current);
                    }, 500);
                    return () => clearTimeout(timeId);
                });
        }

        const cancelInitLoading = () => {
            abortController.abort();
        }
        initLoading();

        return () => { cancelInitLoading(); }

    }, [loadingRef]);

    return <span ref={loadingRef} className={`loading loading-spinner ${isDark ? 'text-accent' : 'text-neutral'} shadow-none mr-1`}></span>
}

export default Spinner