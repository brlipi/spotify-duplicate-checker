import { useNavigate } from "react-router-dom";
import classes from './backButton.module.css';

function BackButton() {
    const navigate = useNavigate();

    const goBack = () => {
        const path = '/playlists';
        navigate(path);
    }
    return (
        <button className={classes.backButton} onClick={goBack}>Go Back</button>
    )
}

export default BackButton