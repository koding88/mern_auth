import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
    const fileRef = React.useRef(null);
    const [image, setImage] = React.useState(undefined);
    const [imagePercent, setImagePercent] = React.useState(0);
    const [imageError, setImageError] = React.useState(false);
    const [formData, setFormData] = React.useState({});

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const handleFileUpload = async (image) => {
            const store = getStorage(app);
            const fileName = new Date().getTime() + "-" + image.name;
            const storageRef = ref(store, fileName);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImagePercent(Math.round(progress));
                },
                (error) => setImageError(true),
                () =>
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (donwload_url) => {
                            setFormData({
                                ...formData,
                                profilePicture: donwload_url,
                            });
                        }
                    )
            );
        };

        if (image) {
            handleFileUpload(image);
        }
    }, [image]);

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-4">
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/.*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                {/* 
          firebase store rule
          service firebase.storage {
            match /b/{bucket}/o {
              match /{allPaths=**} {
                allow read;
                allow write: if 
                request.resource.size < 2 * 1024 * 1024 && 
                request.resource.contentType.matches('image/.*')
                ;
              }
            }
          }
          */}
                <img
                    src={formData.profilePicture || currentUser.profilePicture}
                    alt="profile"
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                    onClick={() => fileRef.current.click()}
                />
                <p className="text-sm self-center">
                    {imageError ? (
                        <span className="text-red-700">
                            Error uploading image (file size must be less than 2
                            MB)
                        </span>
                    ) : imagePercent > 0 && imagePercent < 100 ? (
                        <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
                    ) : imagePercent === 100 ? (
                        <span className="text-green-700">
                            Image uploaded successfully
                        </span>
                    ) : (
                        ""
                    )}
                </p>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="bg-slate-100 p-3 rounded-lg"
                    defaultValue={currentUser.username}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-slate-100 p-3 rounded-lg"
                    defaultValue={currentUser.email}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-slate-100 p-3 rounded-lg"
                />
                <button
                    type="submit"
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    Update
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">
                    Delete Account
                </span>
                <span className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}
