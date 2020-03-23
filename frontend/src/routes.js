import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from './pages/Nav'
import VideoPage from './pages/VideoPage'
import UploadPage from './pages/UploadPage'



const Routes = () => (
  <Router>
    <Nav/>
    <Switch>
      <Route path="/" exact component={VideoPage}/>
      
      <Route path={"/upload"} exact component={UploadPage} />
      {/* <Route path={"/upload"} exact component={(props) => <SearchArtist {...props} />} /> */}
    </Switch>
  </Router>
)

export default Routes