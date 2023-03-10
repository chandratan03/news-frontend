import React, { useContext, useState } from "react";
import { updateAccount } from "../../apis/auth";
import { HTTP_OK } from "../../constants/common";
import AuthContext from "../../contexts/AuthContext";

const UseProfile = () => {
    const { user, token, isAuth, setUser, setToken, setIsAuth } =
        useContext(AuthContext);
    const userObject = user ? JSON.parse(user) : null;
    const [profileErrorMsg, setProfileErrorMsg] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoadingProfile(true);
        let firstName = event.target.first_name.value;
        let lastName = event.target.last_name.value;
        let password = event.target.password.value;
        let confirmPassword = event.target.password_confirmation.value;
        let image = event.target.image.files
            ? event.target.image.files[0]
            : undefined;
        let response = await updateAccount(
            firstName,
            lastName,
            password,
            confirmPassword,
            image
        );
        if (response.status === HTTP_OK) {
            let userData = JSON.stringify(response.data.data);
            sessionStorage.setItem("user", userData);
            setUser(userData);
            window.location.reload();
        }
        setProfileErrorMsg(response.data.message);
        setIsLoadingProfile(false);
    };

    return {
        userObject,
        onSubmit,
        previewImage,
        setPreviewImage,
        isLoadingProfile,
        profileErrorMsg,
    };
};

export default UseProfile;
