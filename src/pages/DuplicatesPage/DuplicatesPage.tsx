import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { isTokenValid, getNewAccessToken } from '../../utils/tokenFetching';
import { fetchFromPlaylist } from '../../utils/dataFetching';
import classes from './duplicatesPage.module.css'

function DuplicatesPage() {
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    const [tracks, setTracks] = useState([]);
    const [duplicates, setDuplicates] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const checkToken = async () => {
        const access_token = localStorage.getItem('access_token');
        const refresh_token = localStorage.getItem('refresh_token');

        if (access_token != null && refresh_token != null) {
            const isValid = await isTokenValid(access_token);
            if (!isValid) {
                const token = await getNewAccessToken(refresh_token);
                localStorage.setItem('access_token', token.access_token);
                localStorage.setItem('refresh_token', token.refresh_token);
                const expires_in = (Math.floor(Date.now() / 1000)) + token.expires_in;
                localStorage.setItem('expires_in', expires_in);
                setToken(token.access_token);
            }
        }
    }

    const getTracks = async () => {
        const access_token = token;
        const tracks = await fetchFromPlaylist(access_token!, id!);
        setTracks(tracks);
    }

    const getDuplicates = (tracks) => {
        const duplicates = new Set();
        const idMap = new Map();

        for (let i = 0; i < tracks.length; i++) {
            const track = idMap.get(tracks[i].track.id)
            if (track !== undefined) {
                tracks[track].position = track;
                tracks[i].position = i;
                duplicates.add(tracks[track]);
                duplicates.add(tracks[i]);
            } else {
                idMap.set(tracks[i].track.id, i);
            }
        }
        return [...duplicates].sort((a, b) => (a.track.name > b.track.name) ? 1 : ((b.track.name > a.track.name) ? -1 : 0));
    }

    const goBack = () => {
        const path = '/playlists';
        navigate(path);
    }

    useEffect(() => {
        checkToken();
        getTracks();
    }, [token])

    useEffect(() => {
        if (tracks.length) {
            const duplicates = getDuplicates(tracks);
            setDuplicates(duplicates);
        }
    }, [tracks])

    return (
        <>
            <h1>Duplicates found:</h1>
            <table className='tracks'>
                <thead>
                    <tr>
                        <th>Position in playlist</th>
                        <th>Artist(s)</th>
                        <th>Song Name</th>
                        <th>Album Name</th>
                        <th>Song ID</th>
                    </tr>
                </thead>
                <tbody>
                    {duplicates.map(duplicate =>
                        <tr key={duplicate.added_at}>
                            <td>
                                {duplicate.position}
                            </td>
                            <td>
                                {duplicate.track.artists.map((artist, index) => {
                                    return (index ? ', ' : '') + artist.name;
                                })}
                            </td>
                            <td>
                                {duplicate.track.name}
                            </td>
                            <td>
                                {duplicate.track.album.name}
                            </td>
                            <td>
                                {duplicate.track.id}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="backButton" onClick={goBack}>Go Back</button>
        </>
    )
}

export default DuplicatesPage