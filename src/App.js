import { React } from "react";
import {
  Link,
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import "./App.css";
// import DataSupply from "./component/admin/DataSupply";
import Navbar from "./component/navbar/Navbar";
import Form from "./component/loginSignup/Form";
import Footer from "./component/footer/Footer";
import Home from "./component/home/Home";
import ContactUs from "./component/contactus/ContactUs";
// import Quiz from './component/quiz/Quiz';
import LogIn from "./component/loginSignup/LogIn";
import AuthQuiz from "./component/quiz/AuthQuiz";
import AdminPage from "./component/admin/AdminPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/quiz" component={AuthQuiz} />
          <Route path="/admin" component={AdminPage} />
          <Route exact path="/contact-us" component={ContactUs} />
          <Route exact path="/sign-up" component={Form} />
          <Route exact path="/login" component={LogIn} />
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
