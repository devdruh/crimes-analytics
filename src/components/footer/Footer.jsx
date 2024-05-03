import AdSenseComponent from "../google/AdSenseComponent"

const Footer = () => {

    return (
        <footer className="flex flex-row justify-center items-center">
            <div className="flex h-14 min-w-96">
                <AdSenseComponent adClient={'ca-pub-3338467565655011'} adSlot={'9491494907'} adFormat={'auto'} />
            </div>
        </footer>
    )
}

export default Footer