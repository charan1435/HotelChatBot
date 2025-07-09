import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Mainpage from "./pages/Mainpage";
import Contactus from "./pages/Contactus";
import Aboutus from "./pages/Aboutus";

const Routes = () => (
  <Switch>
    <Routes>
				
				<Route exact path="/home" element={<Mainpage/>}/>
				<Route exact path="/aboutus" element={<Aboutus/>}/>
				<Route exact path="/contactus" element={<Contactus/>}/>
          
        </Routes>
  </Switch>
);

export default Routes;
