import { FACEBOOK_URL } from "../../utils/constants"
// eslint-disable-next-line react/prop-types
const FacebookTimeline = ({ username, title }) => {
    const url = FACEBOOK_URL + '/' + username + '/';

    return (
        <div className="fb-page" data-href={url} data-tabs="timeline" data-width="" data-height="" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote cite={url} className="fb-xfbml-parse-ignore"><a target="_blank" href={url}>{title}</a></blockquote></div>
    )
}

export default FacebookTimeline