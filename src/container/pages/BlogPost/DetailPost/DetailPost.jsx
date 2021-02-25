import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './DetailPost.css';

class DetailPost extends Component{
  state = {
    post: {}
  }

  componentDidMount(){
    let id = this.props.match.params.postId;
    axios.get(`http://localhost:3004/posts/${id}`)
    .then((res) => {
      this.setState({
        post: res.data
      })
    })
  }

  render(){
    return(
      <Fragment>
        <div className="detail-content">
          <p className="detail-title">{this.state.post.title}</p>
          <p>{this.state.post.body}</p>
        </div>
      </Fragment>
    )
  }
}

export default DetailPost;