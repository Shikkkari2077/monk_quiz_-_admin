import { React, useState, useEffect } from "react";
import "./DataSupply.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useLocation,
} from "react-router-dom";
import Students from "./Students";
import AddQuestion from "./AddQuestion";
import EditQuesPage from "./EditQuesPage";
import EditOpr from "./EditOpr";

const DataSupply = () => {
  const location = useLocation();

  const current = "side-item";
  const newClass = "activeAdmin";

  const [active1, setActive1] = useState(current);
  const [active2, setActive2] = useState(current);
  const [active3, setActive3] = useState(current);

  const tab1 = () => {
    setActive1(newClass);
    setActive2(current);
    setActive3(current);
  };

  const tab2 = () => {
    setActive2(newClass);
    setActive1(current);
    setActive3(current);
  };

  const tab3 = () => {
    setActive3(newClass);
    setActive1(current);
    setActive2(current);
  };

  useEffect(() => {
    if (location.pathname.includes("/admin/students") && location.pathname.includes("/admin")) {
      setActive1(newClass);
    }
    if (location.pathname.includes("/admin/add")) {
      setActive2(newClass);
    }
    if (location.pathname.includes("/admin/questions")) {
      setActive3(newClass);
    }
  }, []);

  return (
    <Router>
      <div className="admin-panel">
        <div className="side-nav">
          <ul className="side-nav-links">
            <li>
              <Link
                onClick={tab1}
                className={active1}
                extact
                to="/admin/students"
              >
                Students
              </Link>
            </li>
            <li>
              <Link onClick={tab2} className={active2} extact to="/admin/add">
                Add Question
              </Link>
            </li>
            <li>
              <Link
                onClick={tab3}
                className={active3}
                extact
                to="/admin/questions"
              >
                Edit Question
              </Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/admin" component={Students} />
          <Route exact path="/admin/students" component={Students} />
          <Route exact path="/admin/add" component={AddQuestion} />
          <Route exact path="/admin/questions" component={EditQuesPage} />
          <Route exact path="/admin/edit-question/:id" component={EditOpr} />
        </Switch>
      </div>
    </Router>
  );
};

export default DataSupply;
