// libraries
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// pages
import BlogPost from '../pages/BlogPost/BlogPost';
import DetailPost from '../pages/BlogPost/DetailPost/DetailPost';

// style
import './Home.css'

class Home extends Component {
  state = {
    showComponent: true,
  }

  render(){
    return(
      <BrowserRouter>
        <Fragment>
          <div className="navigation">
            <div className="navigation-item">
              <Link to="/"><i>A</i> Blog</Link>
            </div>
          </div>
        </Fragment>
        
        <Route path="/" exact component={BlogPost}/>
        <Route path="/detail-post/:postId" component={DetailPost}/>
      </BrowserRouter>
    )
  }
}

export default Home;