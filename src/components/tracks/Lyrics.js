import React, { Component } from 'react'
import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {}
    }

    componentDidMount(){
        this.getLyrics();
    }

    getLyrics = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                let lyricsData =  res.data.message.body.lyrics.lyrics_body;
                this.setState({lyrics: lyricsData})

                return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)

            })
            .then(res => {
                let trackData = res.data.message.body.track;
                this.setState({track: trackData})
            })
            .catch(err => console.log(err))
    }


    render() {
        const { track, lyrics } = this.state;
        if(
            track === undefined || 
            lyrics === undefined || 
            Object.keys(track).length === 0 || 
            Object.keys(lyrics).length === 0
        ) {
            return <Spinner />;
        } else {
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4">
                        Go Back
                    </Link>
                    <div className="card">
                        <div className="card-header">
                            {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
                        </div>
                    </div>
                </React.Fragment>
            )
        }   
    }
}

export default Lyrics;
