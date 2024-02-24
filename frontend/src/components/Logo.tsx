import { Link } from 'react-router-dom'

function Logo() {
    return (
        <Link to="/">
            <div className="logo">
                <span className="text-[#a855f7] text-[25px]  font-semibold">VideoFeed</span>
            </div>
        </Link>)
}

export default Logo