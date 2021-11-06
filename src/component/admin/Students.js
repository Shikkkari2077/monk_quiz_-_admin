import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Students.css";

const Students = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get("http://localhost:3009/schema");
    setUser(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3009/schema/${id}`);
    loadUser();
  };

  return (
    <div className="student-data">
      <div className="std-header">
        <h1>Enrollment List</h1>
        <h2>Total Students - {users.length}</h2>
      </div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th className="f5" scope="col">
              #
            </th>
            <th className="f1" scope="col">
              Name
            </th>
            <th className="f2" scope="col">
              Username
            </th>
            <th className="f3" scope="col">
              Email
            </th>
            <th className="f4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <th scope="row">{index + 1}.</th>
              <td className="d">{user.fname}</td>
              <td className="d">{user.username}</td>
              <td className="d">{user.email}</td>
              <td className="bt">
                <Link
                  exact
                  to="/admin/students"
                  onClick={() => deleteUser(user.id)}
                >
                  <img className="btn-danger" src="/img/backspace.svg" alt="" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
