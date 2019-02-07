import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Video from '../Video'
import Detail from '../Detail'
import logic from '../../logic'
import Feedback from '../Feedback'

class Results extends Component  {
    
    state = { videoSelected: null, results: null, query: null, searchFeedback:null }

    handleVideoClick = id => {
        this.props.history.push(`/videos/${this.state.query}/detail/${id}`)
    }

    componentDidMount () {
        const {props:{query}, handleSearch} = this

        handleSearch(query) 
    }

    handleSearch = query =>{
        try {
            logic.searchVideos(query)
                .then(results => {
                    this.setState({ results, searchFeedback: null })                
                })
                .catch( ({message}) => {
                    console.log(message)
                    this.setState({ results: null, searchFeedback: message })
                }) 
        } catch ({message}) {
            this.setState({ results: null, searchFeedback: message })
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (props.query !== state.query)
            return {
                query: props.query
            }
        return null
    }

    componentDidUpdate(prevProps) {

        const { props: { query } } = this

        if (query !== prevProps.query)
            this.handleSearch(query)
    }

    render() {
        const {
            state : {results},   
                    handleVideoClick
            } = this
        const {searchFeedback} = this.state
            
        return (
            <section className="results section columns is-multiline">
                {(results || []).map(video => 
                    <Video 
                       key={video.imdbID} 
                       video={video} 
                       query={this.state.query}
                       onVideoSelected={handleVideoClick}
                    /> 
                )}
                { searchFeedback && <Feedback message={searchFeedback} level="warn" /> }
                <Route path='/videos/:query/detail/:id' component={Detail}/>

            </section>
        )
    }
}

export default withRouter(Results)