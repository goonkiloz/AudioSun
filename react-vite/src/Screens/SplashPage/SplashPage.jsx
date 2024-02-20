import { NavLink } from "react-router-dom";

const SplashPage = () => {
    return (
        <>
            <h1>Welcome!</h1>
            <NavLink to={"/songs"}>
                <p>View All Songs</p>
            </NavLink>
        </>
    )
};

export default SplashPage;
