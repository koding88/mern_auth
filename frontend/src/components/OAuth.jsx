import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const response = await fetch(
                `${import.meta.env.VITE_API}/auth/google`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: result.user.displayName,
                        email: result.user.email,
                        photo: result.user.photoURL,
                    }),
                }
            );

            const data = await response.json();
            console.log(data);
            if (data.error) {
                // Handle error here
                console.error(data.message);
            } else {
                dispatch(signInSuccess(data));
                navigate("/");
            }
        } catch (error) {
            console.error("could not login with google", error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleGoogleSignIn}
            className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Continue with google
        </button>
    );
}
