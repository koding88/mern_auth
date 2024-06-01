import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className="bg-slate-200">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to="/">
                    <h1 className="font-bold">Auth App</h1>
                </Link>
                <ul className="flex items-center gap-4">
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    <Link to="/profile">
                        {currentUser ? (
                            <img
                                src={currentUser.profilePicture}
                                alt="profile-picture"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <Link to="/">
                                <li>Sign Up</li>
                            </Link>
                        )}
                    </Link>
                </ul>
            </div>
        </div>
    );
}
