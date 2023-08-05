import { redirectToAuthCodeFlow } from "../../utils/authorization";

function GetAuth() {
    redirectToAuthCodeFlow();
    return <></>;
}

export default GetAuth
