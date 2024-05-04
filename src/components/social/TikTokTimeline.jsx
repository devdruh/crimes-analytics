import { TIKTOK_URL } from '../../utils/constants'

// eslint-disable-next-line react/prop-types
const TikTokTimeline = ({ username }) => {

    const cite = TIKTOK_URL + '/@' + username;
    const linkTitle = '@' + username;
    const linkUrl = cite + '?refer=creator_embed';

    return (
        <div className='flex justify-evenly items-center'>
            <blockquote className="tiktok-embed w-1/2 sm:w-full" cite={cite} data-unique-id={username} data-embed-type="creator" style={{ width: '50%', height: '100%' }}>
                <section>
                    <a target="_blank" href={linkUrl}>{linkTitle}</a>
                </section>
            </blockquote>
        </div>
    )
}

export default TikTokTimeline