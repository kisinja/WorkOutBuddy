import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { BiSolidStopwatch } from "react-icons/bi";

const RelativeTime = ({ timestamp }) => {
    const date = new Date(timestamp);
    const timeAgo = formatDistanceToNow(date, { addSuffix: true });

    return <p className='tracking-wider text-xs flex gap-1 items-center italic'>
        <strong>
            <BiSolidStopwatch className='text-xl' />
        </strong>
        {timeAgo}
    </p>;
};

RelativeTime.propTypes = {
    timestamp: PropTypes.string.isRequired,
};

export default RelativeTime;