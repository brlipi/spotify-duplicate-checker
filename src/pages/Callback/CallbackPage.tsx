import { Navigate } from 'react-router-dom'

function Callback() {
    const search = new URLSearchParams(window.location.search);
    const code = search.get('code');
    if (code) {
        localStorage.setItem('code', code);
        return (
            <Navigate to='/playlists' replace={true}/>
        )
    } else {
        localStorage.clear();
        return (
            <Navigate to='/' replace={true}/>
        )
    }
}

export default Callback