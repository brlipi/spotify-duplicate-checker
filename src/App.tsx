import { useEffect, useState } from 'react';
import { getAccessToken, isTokenValid, getNewAccessToken } from './utils/tokenFetching'
import { fetchPlaylists } from './utils/dataFetching';
import PlaylistsPage from './pages/Playlists/PlaylistsPage'

function App() {
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [playlists, setPlaylists] = useState([]);

  const getToken = async () => {
    const code = localStorage.getItem('code');
    const verifier = localStorage.getItem('verifier');
    const token = await getAccessToken(code!, verifier!);
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('refresh_token', token.refresh_token);
    const expires_in = (Math.floor(Date.now() / 1000)) + token.expires_in;
    localStorage.setItem('expires_in', expires_in);
    setToken(token.access_token);
  }

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

  const getPlaylists = async () => {
    const access_token = localStorage.getItem('access_token');
    if (access_token !== null) {
      const playlists = await fetchPlaylists(access_token);
      setPlaylists(playlists.items);
    }
  }

  useEffect(() => {
    if (token == null) {
      getToken();
    } else {
      checkToken();
      getPlaylists();
    }
  }, [token]);

  return (
    <>
      {playlists ? <PlaylistsPage playlists={playlists} /> : <p>Loading...</p>}
    </>
  )
}

export default App
