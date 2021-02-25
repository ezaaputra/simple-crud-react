import React, { Component, Fragment } from 'react';
import Post from '../../../component/Post/Post';
import './BlogPost.css';
import axios from 'axios';

class BlogPost extends Component{
  state = {
    post: [],
    formBlogPost: {
      id: 1,
      title: '',
      body: '',
      userId: 1,
    },
    isUpdated: false,
  }

  resetForm = () => {
    this.setState({
      formBlogPost: {
        id: 1,
        title: '',
        body: '',
        userId: 1,
      },
    })
  }

  getPostAPI = () => {
    axios.get('http://localhost:3004/posts?_sort=id&_order=desc')
    .then((res) => {
      this.setState({
        post: res.data
      })
    })
  }

  postDataToAPI = () => {
    axios.post('http://localhost:3004/posts', this.state.formBlogPost)
    .then((res) => {
      this.getPostAPI();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  putDataToAPI = () => {
    axios.put(`http://localhost:3004/posts/${this.state.formBlogPost.id}`, this.state.formBlogPost)
    .then((res) => {
      this.getPostAPI();
      this.setState({
        isUpdated: false
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleRemove = (data) => {
    axios.delete(`http://localhost:3004/posts/${data}`)
      .then((res) => {
        this.getPostAPI();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleUpdate = (data) => {
    this.setState({
      formBlogPost: data,
      isUpdated: true,
    })
  }

  handleFormChange = (event) => {
    let formBlogPostNew = {...this.state.formBlogPost};
    if (!this.state.isUpdated) {
      formBlogPostNew['id'] = new Date().getTime();
    }
    formBlogPostNew[event.target.name] = event.target.value;
    this.setState({
      formBlogPost: formBlogPostNew,
    })
  }

  handleSubmit = () => {
    if (!this.state.isUpdated) {
      this.postDataToAPI();
    }else{
      this.putDataToAPI();
    }
    this.resetForm();
  }

  handleDetail = (id) => {
    this.props.history.push(`/detail-post/${id}`)
  }

  componentDidMount(){
    this.getPostAPI();
  }

  render(){
    return(
      <Fragment>
        <p className="section">Blog Post</p>
        <div className="form-add-post">
          <label htmlFor="title">Title</label>
          <input value={this.state.formBlogPost.title} type="text" name="title" id="title" placeholder="Input Title Here" onChange={this.handleFormChange} />
          <label htmlFor="body">Blog Content</label>
          <textarea value={this.state.formBlogPost.body} name="body" id="body" cols="30" rows="10" placeholder="Input Description Here" onChange={this.handleFormChange} ></textarea>
          <button className="btn-submit" onClick={this.handleSubmit}>Simpan</button>
        </div>
        {
          this.state.post.map(post => {
            return <Post key={post.id} data={post} remove={this.handleRemove} update={this.handleUpdate} goDetail={this.handleDetail}/>
          })
        }
      </Fragment>
    )
  }
}

export default BlogPost;