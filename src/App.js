import React from 'react';

import {BrowserRouter as Router, Route}  from 'react-router-dom';
                                                          
import Join from './component/Join/Join'
import Chat from './component/chat/Chat'

const App = () => (
  <Router>
    <Route exact path="/" component={Join}/>
    <Route path="/chat" component={Chat}/>
  </Router>
)

export default App;