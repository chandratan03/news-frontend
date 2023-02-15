import { updateAccount } from "../../apis/auth";
import AuthContext from "../../contexts/AuthContext";

const { useContext } = require("react");

const UseProfile = () => {
    const { user, token, isAuth, setUser, setToken, setIsAuth } =
        useContext(AuthContext);

    const onSubmit = (event) => {
        event.preventDefault();
        let firstName = event.target.first_name.value;
        let lastName = event.target.last_name.value;
        let password = event.target.password.value;
        let confirmPassword = event.target.password_confirmation.value;
        let image = event.target.image.files
            ? event.target.image.files[0]
            : undefined;
        updateAccount(firstName, lastName, password, confirmPassword, image);
    };


    return {
        user, 
        onSubmit
    }
};

export default UseProfile;
