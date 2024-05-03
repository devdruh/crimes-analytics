import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const AdSenseComponent = ({ adClient, adSlot, adFormat }) => {

    useEffect(() => {

        (window.adsbygoogle = window.adsbygoogle || []).push({});

    }, []);

    return (
        <ins className="adsbygoogle"
            style={{ display: 'block', minWidth: '100%' }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive="true"></ins>

    )
}

export default AdSenseComponent