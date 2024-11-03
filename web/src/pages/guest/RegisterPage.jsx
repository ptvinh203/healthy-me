import { useParams } from "react-router-dom";
import RegisterCusPage from "./RegisterCusPage";
import RegisterResPage from "./RegisterResPage";

function RegisterPage() {
    const { type } = useParams();
    return (<>
        {type === "customer" ? <RegisterCusPage /> : <RegisterResPage />}
    </>);
}

export default RegisterPage;