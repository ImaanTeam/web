import { useState } from "react";
import BlackOverlay from "../../componenets/Overlay/Overlay";
import Spinner from "../../componenets/Spinnner/Spinner";
import CheckAnswers from "../CheckAnswers/CheckAnswers";
import axios from "axios";

function Quiz() {
  const data = JSON.parse(localStorage.getItem("data")) || [];
  const [chosen, setChosen] = useState({});
  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState(0);
  const [videoURL, setVideoURL] = useState();
  const sendAnswers = () => {
    setLoading(true);
    const questions = JSON.parse(localStorage.getItem("data"))?.questions;
    const useranswer = JSON.parse(localStorage.getItem("useranswer"));
    const correctanswer = data?.questions.map((itm) => ({
      question_id: itm.question_id,
      answer: itm.answer,
    }));
    const url = `https://test-questions-generator-ai.onrender.com/check_answers?question=${JSON.stringify(
      questions.map((itm) => ({
        question_id: itm.question_id,
        question: itm.question,
        options: itm.options,
        answer: itm.answer,
      }))
    )}&correct=${JSON.stringify(correctanswer)}&user=${JSON.stringify(
      useranswer
    )}`;
    const encodedUrl = encodeURI(url);
    axios
      .get(encodedUrl)
      .then((response) => {
        console.log(response);
        setVideoURL(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submit = () => {
    if (!Object.keys(chosen).length) {
      alert("Please select an answer before submitting.");
      return;
    }
    if (num < data?.questions.length) {
      setNum(num + 1);
      let arr = JSON.parse(localStorage.getItem("useranswer")) || [];
      arr.push(chosen);
      localStorage.setItem("useranswer", JSON.stringify(arr));
    }

    if (num + 1 == data?.questions.length) {
      sendAnswers();
      console.log("sended");
    }
    const radioelements = document.querySelectorAll("input[type=radio]");
    radioelements.forEach((element) => {
      element.checked = false;
    });
  };

  const handleChoose = (value, id) => {
    setChosen({ question_id: id, answer: value });
  };

  // if (loading)
  //   return (
  //     <div className="loading-container">
  //       <BlackOverlay />
  //       <Spinner />
  //     </div>
  //   );

  return data ? (
    num < data?.questions.length ? (
      <div>
        <div className="bg-[#EFF7F0] mt-14 mb-28 w-[800px] flex flex-col items-center p-[30px]">
          <span className="text-center text-[24px] my-[20px]">Quiz</span>
          <progress
            className="progress progress-primary w-full mt-8"
            value="30"
            max="100"
          ></progress>
          <span className="text-center text-[16px] my-[10px]">
            Question {num + 1} of {data?.questions?.length}
          </span>
          <h2 className="text-[24px] font-bold text-center my-[20px] text-gray-600">
            {data?.questions[num]?.question}
          </h2>

          {Object.keys(data?.questions[num]?.options)?.map((itm, idx) => {
            return (
              <div
                key={idx + 1}
                className="bg-gray-300 rounded my-[8px] w-full p-[10px] text-[16px]"
              >
                <div className="form-control w-full flex">
                  <label className="label cursor-pointer justify-normal flex items-center gap-4">
                    <input
                      value={itm}
                      onClick={(e) =>
                        handleChoose(
                          e.target.value,
                          data?.questions[num]?.question_id
                        )
                      }
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500 w-[25px] h-[25px]"
                    />
                    <span className="label-text text-[16px]">
                      {data?.questions[num]?.options[itm]}
                    </span>
                  </label>
                </div>
              </div>
            );
          })}
          <button
            onClick={submit}
            className="btn btn-success text-white w-full text-2xl h-[50px] mt-12"
          >
            Next
          </button>
        </div>
      </div>
    ) : (
      <CheckAnswers data={data} loading={loading} videoURL={videoURL} />
    )
  ) : (
    ""
  );
}

export default Quiz;
