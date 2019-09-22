import React, { Component } from 'react'
import axios from 'axios';
import Spinner from '../layout/Spinner';

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
                //console.log(res.data);
                let lyricsData =  res.data.message.body.lyrics.lyric_body;
                this.setState({lyrics: lyricsData})

                return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)

            })
            .then(res => {
                let trackData = res.data.message.body.track
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
            return <Spinner />
        } else {
            return <h1>Data Returned</h1>
        }   
    }
}

export default Lyrics;
