import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams, useLocation } from "react-router-dom";
import "./EditOpr.css";

const EditOpr = () => {
  // const location = useLocation();

  const history = useHistory();

  const { id } = useParams();

  const [Convert, setConvert] = useState({});

  const [post, setPost] = useState({
    questionText: "",
    option1: "",
    ans1: "select",
    option2: "",
    ans2: "select",
    option3: "",
    ans3: "select",
    option4: "",
    ans4: "select",
  });

  const [raw, setRaw] = useState({
    Question: "Hello",
    answerOptions: [
      {
        answerText: "",
        isCorrect: null,
      },
      {
        answerText: "",
        isCorrect: null,
      },
      {
        answerText: "",
        isCorrect: null,
      },
      {
        answerText: "",
        isCorrect: null,
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPost({
      ...post,
      [name]: value,
    });
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3009/question/${id}`);
    setRaw(result.data);
  };

  useEffect(() => {
    loadUser();
    setConvert(() => {
      let falsy = NaN;
      let Final = {
        Question: "",
        answerOptions: [
          {
            answerText: "",
            isCorrect: null,
          },
          {
            answerText: "",
            isCorrect: null,
          },
          {
            answerText: "",
            isCorrect: null,
          },
          {
            answerText: "",
            isCorrect: null,
          },
        ],
      };
      if (post.questionText) {
        Final.Question = post.questionText;
      }
      /////////Option-1/////////////////
      if (post.option1) {
        Final.answerOptions[0].answerText = post.option1;
      }
      if (post.ans1 == "true") {
        Final.answerOptions[0].isCorrect = Boolean(post.ans1);
      } else {
        Final.answerOptions[0].isCorrect = Boolean(falsy);
      }

      //////////Option-2////////////////
      if (post.option2) {
        Final.answerOptions[1].answerText = post.option2;
      }
      if (post.ans2 == "true") {
        Final.answerOptions[1].isCorrect = Boolean(post.ans2);
      } else {
        Final.answerOptions[1].isCorrect = Boolean(falsy);
      }

      ////////////Option-3///////////////
      if (post.option3) {
        Final.answerOptions[2].answerText = post.option3;
      }
      if (post.ans3 == "true") {
        Final.answerOptions[2].isCorrect = Boolean(post.ans3);
      } else {
        Final.answerOptions[2].isCorrect = Boolean(falsy);
      }
      //////////Option-4//////////////////
      if (post.option4) {
        Final.answerOptions[3].answerText = post.option4;
      }
      if (post.ans4 == "true") {
        Final.answerOptions[3].isCorrect = Boolean(post.ans4);
      } else {
        Final.answerOptions[3].isCorrect = Boolean(falsy);
      }

      return Final;
    });
    // return changeData()
  }, [post]);

  const changeData = () => {
    setPost({
      questionText: raw.Question,
      option1: raw.answerOptions[0].answerText,
      ans1: raw.answerOptions[0].isCorrect,
      option2: raw.answerOptions[1].answerText,
      ans2: raw.answerOptions[1].isCorrect,
      option3: raw.answerOptions[2].answerText,
      ans3: raw.answerOptions[2].isCorrect,
      option4: raw.answerOptions[3].answerText,
      ans4: raw.answerOptions[3].isCorrect,
    });
  };

  console.log("Rae Data", raw);
  //   console.log(Convert);

  const dataSubmit = async (e) => {
    e.preventDefault();
    // console.log(post);
    console.log(Convert);
    await axios.put(`http://localhost:3009/question/${id}`, Convert);

    setPost({
      questionText: "",
      option1: "",
      ans1: "select",
      option2: "",
      ans2: "select",
      option3: "",
      ans3: "select",
      option4: "",
      ans4: "select",
    });
    history.push("/admin/questions");
  };

  const clear = (e) => {
    e.preventDefault();
    setPost({
      questionText: "",
      option1: "",
      ans1: "select",
      option2: "",
      ans2: "select",
      option3: "",
      ans3: "select",
      option4: "",
      ans4: "select",
    });
  };

  return (
    <div className="edit-mode">
      <div className='edit-head'>
        <h1>Edit Question #{id}.</h1>
        <button onClick={changeData}>Fetch Data</button>
      </div>
      <form className="post-form" action="" onSubmit={dataSubmit}>
        <div className="question">
          <label htmlFor=""># Question :</label>
          <input
            type="text"
            name="questionText"
            className="form-input"
            placeholder="Enter the question here"
            value={post.questionText}
            onChange={handleChange}
          />
        </div>

        <div className="field-1">
          <div className="option1">
            <label htmlFor="">1.</label>
            <input
              id="input-1"
              type="text"
              name="option1"
              className="form-input"
              placeholder="Option one here"
              value={post.option1}
              onChange={handleChange}
            />
          </div>
          <div className="ans1">
            <label htmlFor="">1.</label>
            {/* <input
              id="input-1"
              type="text"
              name="ans1"
              className="form-input"
              placeholder="answer one here"
              value={post.ans1}
              onChange={handleChange}
            /> */}
            <select
              name="ans1"
              value={post.ans1}
              id="input-1"
              className="form-input"
              onChange={handleChange}
            >
              <option value="select">Select The Value</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>

        <div className="field-2">
          <div className="option2">
            <label htmlFor="">2.</label>
            <input
              id="input-2"
              type="text"
              name="option2"
              className="form-input"
              placeholder="Option two here"
              value={post.option2}
              onChange={handleChange}
            />
          </div>
          <div className="ans2">
            <label htmlFor="">2.</label>
            {/* <input
              id="input-2"
              type="text"
              name="ans2"
              className="form-input"
              placeholder="answer two here"
              value={post.ans2}
              onChange={handleChange}
            /> */}
            <select
              name="ans2"
              value={post.ans2}
              id="input-2"
              className="form-input"
              onChange={handleChange}
            >
              <option value="select">Select The Value</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>

        <div className="field-3">
          <div className="option3">
            <label htmlFor="">3.</label>
            <input
              id="input-3"
              type="text"
              name="option3"
              className="form-input"
              placeholder="Option three here"
              value={post.option3}
              onChange={handleChange}
            />
          </div>
          <div className="ans3">
            <label htmlFor="">3.</label>
            {/* <input
              id="input-3"
              type="text"
              name="ans3"
              className="form-input"
              placeholder="answer three here"
              value={post.ans3}
              onChange={handleChange}
            /> */}
            <select
              name="ans3"
              value={post.ans3}
              id="input-3"
              className="form-input"
              onChange={handleChange}
            >
              <option value="select">Select The Value</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>

        <div className="field-4">
          <div className="option4">
            <label htmlFor="">4.</label>
            <input
              id="input-4"
              type="text"
              name="option4"
              className="form-input"
              placeholder="Option four here"
              value={post.option4}
              onChange={handleChange}
            />
          </div>
          <div className="ans4">
            <label htmlFor="">4.</label>
            {/* <input
              id="input-4"
              type="text"
              name="ans4"
              className="form-input"
              placeholder="answer four here"
              value={post.ans4}
              onChange={handleChange}
            /> */}
            <select
              name="ans4"
              value={post.ans4}
              id="input-4"
              className="form-input"
              onChange={handleChange}
            >
              <option value="select">Select The Value</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
        <div className="btns">
          <button className="clear-data" onClick={clear}>
            Clear
          </button>
          <button type="submit" className="modify-data">
            Modify
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOpr;
