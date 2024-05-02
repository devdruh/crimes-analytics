import { useEffect } from "react"

const Footer = () => {

    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);

    return (
        <footer className="h-14 w-full flex flex-row justify-center items-center">
            {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3338467565655011" crossOrigin="anonymous"></script> */}
            {/* <!-- Ad unit - responsive template --> */}
            <div className="flex min-w-96">
                {/* Footer */}
                <ins className="adsbygoogle block"
                // style="display:block"
                    style={{ display: 'block', minWidth: '100%' }}
                    data-ad-client="ca-pub-3338467565655011"
                    data-ad-slot="9491494907"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                {/* <script>
                (adsbygoogle = window.adsbygoogle || []).push({ });
            </script> */}
            </div>
        </footer>
    )
}

export default Footer