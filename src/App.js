import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/SideBar';
import Content from './components/Content';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

export default () => {

  const [isOpen, setOpen] = useState(true);
  const toggle = () => setOpen(!isOpen);

  return (
    <Router>
      <div className="App wrapper">
        <SideBar toggle={toggle} isOpen={isOpen} />
        <Content toggle={toggle} isOpen={isOpen} />
      </div>
    </Router>
  );

}
