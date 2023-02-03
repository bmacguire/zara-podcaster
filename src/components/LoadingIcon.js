import loadingImage from "../images/loading.gif";

export default function LoadingIcon() {
    return (
        <img src={loadingImage} alt="Loading" style={{ width: "30px", height: "30px" }} />
    );
}