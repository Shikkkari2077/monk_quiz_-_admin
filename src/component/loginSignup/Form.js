import { React, useState,useEffect } from "react";
import FormSignUp from "./FormSignUp";
import FormSuccess from "./FormSuccess";
import "./Form.css";

const Form = () => {
  useEffect(() => {
    document.title='Sign Up'
  }, [])
  const [isSubmitted, setIsSubmitted] = useState(true);

  function submitForm() {
    setIsSubmitted(!isSubmitted);
  }


  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img src="img/img-2.svg" alt="spaceship" className="form-img" />
        </div>
        {isSubmitted ? <FormSignUp submitForm={submitForm} /> : <FormSuccess />}
      </div>
    </>
  );
};

export default Form;
