import { Link } from "react-router-dom"
import classes from './playlistsPage.module.css'
import playlistBlankImage from '../../assets/playlist_blank_image.png'

function PlaylistsPage(playlists: PlaylistProps) {
    return (
        <>
            <div className={classes.container}>
                <h1>Your Playlists</h1>
                <ul className={classes.playlists}>
                    {playlists.playlists.map((playlist: PlaylistItem) => {
                        const playlistPic = !playlist.images.length ? playlistBlankImage : playlist.images[0].url;
                        return (
                            <li key={playlist.id}>
                                <Link to={`/playlist/${playlist.id}`}>
                                    <div className={classes.playlistContent}>
                                        <img src={playlistPic} alt={playlist.name} />
                                        <h2>{playlist.name}</h2>
                                        <h3>{playlist.owner.display_name}</h3>
                                        <h4>Tracks: {playlist.tracks.total}</h4>
                                        <h5>Public: {playlist.public.toString()}</h5>
                                        <h5>Collaborative: {playlist.collaborative.toString()}</h5>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default PlaylistsPage