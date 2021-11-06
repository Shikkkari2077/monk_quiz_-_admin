import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditQuesPage.css";
import { Link } from "react-router-dom";

export const EditQuesPage = () => {
  const [Card, setCard] = useState([
    {
      id: "",
      Question: "",
      answerOptions: [
        {
          answerText: "",
          isCorrect: "",
        },
        {
          answerText: "",
          isCorrect: "",
        },
        {
          answerText: "",
          isCorrect: "",
        },
        {
          answerText: "",
          isCorrect: "",
        },
      ],
    },
  ]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get("http://localhost:3009/question");
    setCard(result.data);
  };

  const deleteCard = async (id) => {
    await axios.delete(`http://localhost:3009/question/${id}`);
    loadUser();
  };

  return (
    <div className="ques-map">
      <h1>Questions Data</h1>
      <div className="ques-container">
        {Card.map((card) => (
          <div className="card-ques">
            <h4>
              #{card.id}. {card.Question}
            </h4>
            <div className="card-options">
              <ul className="option-list">
                <li>
                  <span className="opt">
                    1. {card.answerOptions[0].answerText}
                  </span>{" "}
                  <span className="answ">
                    {card.answerOptions[0].isCorrect.toString()}
                  </span>
                </li>
                <li>
                  <span className="opt">
                    2. {card.answerOptions[1].answerText}
                  </span>{" "}
                  <span className="answ">
                    {card.answerOptions[1].isCorrect.toString()}
                  </span>
                </li>
                <li>
                  <span className="opt">
                    3. {card.answerOptions[2].answerText}
                  </span>{" "}
                  <span className="answ">
                    {card.answerOptions[2].isCorrect.toString()}
                  </span>
                </li>
                <li>
                  <span className="opt">
                    4. {card.answerOptions[3].answerText}
                  </span>{" "}
                  <span className="answ">
                    {card.answerOptions[3].isCorrect.toString()}
                  </span>
                </li>
              </ul>
            </div>
            <div className="modify-btns">
              <Link exact to={`/admin/edit-question/${card.id}`}>
                <img className="edit-btn" src="/img/edit.svg" alt="" />
              </Link>
              <div onClick={() => deleteCard(card.id)}>
                <img className="delete-btn" src="/img/delete01.svg" alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditQuesPage;
