import { useState } from "react";
import axios from "axios";
import sass from "./trivia.module.scss";
import BlackOverlay from "../../componenets/Overlay/Overlay";
import Spinner from "../../componenets/Spinnner/Spinner";
import { useNavigate } from "react-router-dom";

function Trivia() {
  const navigate = useNavigate();
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState({
    text: "",
    question_type: "multiple choice",
    question_count: 2,
    question_difficulty: "easy",
  });

  const [degrees, setDegrees] = useState([
    { name: "Easy", value: "easy" },
    { name: "Medium", value: "medium" },
    { name: "Hard", value: "hard" },
  ]);

  const [types, setTypes] = useState([
    { name: "MCQ", value: "multiple choice" },
    { name: "True False", value: "true false" },
    { name: "Short answers", value: "short answer" },
  ]);

  const submit = () => {
    if (!request.text.trim()) {
      setRequest({ ...request, hasError: true });
      return;
    }
    setLoading(true);
    axios
      .get(
        `https://test-questions-generator-ai.onrender.com/generate_questions/?text=${request.text}&question_type=${request.question_type}&question_count=${request.question_count}&question_difficulty=${request.question_difficulty}`
      )
      .then((response) => {
        navigate("/quiz");
        localStorage.removeItem("useranswer");
        localStorage.setItem("data", JSON.stringify(response?.data));
        setRequest({ ...request, hasError: false });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  if (loading)
    return (
      <div className="loading-container">
        <BlackOverlay />
        <Spinner />
      </div>
    );

  return (
    <div className={`${sass.trivia} w-full flex flex-col items-center`}>
      <p className="text-[24px] pb-12 font-bold text-[#0D3785] text-center">
        Generate different quizzes like MCQs, True or False, Short Answers, etc
        using AI
      </p>
      <div className="max-w-xl">
        <textarea
          placeholder="Type question"
          value={request?.text}
          onChange={(e) => setRequest({ ...request, text: e.target.value })}
          className={`textarea textarea-bordered textarea-lg w-full max-w-4xl text-[16px] ${
            request.hasError ? "border border-red-500" : ""
          }`}
        ></textarea>
        {request.hasError && (
          <span className="text-red-500 text-[14px] mt-2">
            Please enter a value, it should not be empty.
          </span>
        )}
        <select
          onChange={(e) =>
            setRequest({ ...request, question_type: e.target.value })
          }
          value={request?.question_type}
          className="select select-bordered select-lg w-full max-w-4xl mt-8 text-[14px]"
        >
          {types?.map((e) => {
            return (
              <option value={e.value} key={e.value}>
                {e?.name}
              </option>
            );
          })}
        </select>
        <div className="flex items-center gap-5 mt-8 w-full">
          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text text-[14px]">Question Count</span>
            </div>
            <select
              onChange={(e) =>
                setRequest({
                  ...request,
                  question_count: Number(e.target.value),
                })
              }
              value={request?.question_count}
              className="select select-bordered mt-2 select-lg w-full max-w-xs text-[14px]"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-[14px]">Difficulty Level</span>
            </div>
            <select
              onChange={(e) =>
                setRequest({
                  ...request,
                  question_difficulty: e.target.value,
                })
              }
              value={request?.question_difficulty}
              className="select select-bordered select-lg w-full mt-2 max-w-xs text-[14px]"
            >
              {degrees?.map((e, idx) => {
                return (
                  <option value={e?.value} key={idx + 1}>
                    {e?.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <button
          onClick={submit}
          className="btn btn-active btn-primary mt-6 w-full text-[14px]"
          // disabled={request < 1 ? "true" : "false"}
        >
          Start
        </button>
      </div>
      {/* <h2>Correct answers: {correct}</h2> */}
    </div>
  );
}

export default Trivia;

// const [questions, setQuestions] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);
// const [correct, setCorrect] = useState(0);
// const [selectedAnswers, setSelectedAnswers] = useState({});
// const [answerStates, setAnswerStates] = useState({});

// useEffect(() => {
//   const fetchQuestions = async () => {
//     try {
//       const response = await axios.get(
//         "https://the-trivia-api.com/api/questions",
//         {
//           params: {
//             apiKey: "YOUR_API_KEY", // Replace with your actual API key
//             limit: 5, // Set the number of questions you want
//           },
//         }
//       );
//       const shuffledQuestions = response.data.map((question) => {
//         const shuffledAnswers = [
//           question.correctAnswer,
//           ...question.incorrectAnswers,
//         ].sort(() => Math.random() - 0.5);
//         return { ...question, answers: shuffledAnswers };
//       });
//       setQuestions(shuffledQuestions);
//       setLoading(false);
//     } catch (error) {
//       setError("Failed to fetch questions: " + error.message);
//       setLoading(false);
//     }
//   };

//   fetchQuestions();
// }, []);

// if (loading)
//   return (
//     <div className="loading-container">
//       <BlackOverlay />
//       <Spinner />
//     </div>
//   );
// if (error) return <div>Error: {error}</div>;

// const checkAnswer = (questionId, answer, correctAnswer) => {
//   if (selectedAnswers[questionId]) {
//     return;
//   }

//   setSelectedAnswers((prevState) => ({
//     ...prevState,
//     [questionId]: true,
//   }));

//   const isCorrect = answer === correctAnswer;
//   setAnswerStates((prevState) => ({
//     ...prevState,
//     [`${questionId}-${answer}`]: isCorrect ? "correct" : "incorrect",
//   }));

//   if (isCorrect) {
//     setCorrect((prev) => prev + 1);
//   }
// };

{
  /* <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <h1>{question.question}</h1>
            {question.answers.map((item) => {
              const isSelected = selectedAnswers[question.id];
              const answerState = answerStates[`${question.id}-${item}`];
              return (
                <div
                  key={item}
                  onClick={() =>
                    checkAnswer(question.id, item, question.correctAnswer)
                  }
                  className="form-control"
                >
                  <label className="label cursor-pointer justify-normal gap-4">
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-red-500"
                      checked
                    />
                    <span
                      className="label-text"
                      style={{
                        backgroundColor: isSelected
                          ? answerState === "correct"
                            ? "green"
                            : answerState === "incorrect"
                            ? "yellow"
                            : null
                          : null,
                      }}
                    >
                      {" "}
                      {item}
                    </span>
                  </label>
                  <button
                      style={{
                        backgroundColor: isSelected
                          ? answerState === "correct"
                            ? "green"
                            : answerState === "incorrect"
                            ? "yellow"
                            : null
                          : null,
                      }}
                    >
                      {item}
                    </button>
                </div>
              );
            })}
          </li>
        ))}
      </ul> */
}
