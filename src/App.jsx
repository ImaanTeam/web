import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./componenets/Layout";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Context from "./utils/Context";
import Users from "./pages/Users/voice-chatbot";
import Trivia from "./pages/Trivial";
import Quiz from "./pages/Quiz/Quiz";
// import CheckAnswers from "./pages/CheckAnswers/CheckAnswers";

function App() {
  
    // const questions = JSON.parse(localStorage.getItem("data"))?.questions;
    // const demo =
    //   "https://test-questions-generator-ai.onrender.com/check_answers?question=" +
    //   JSON.stringify(questions);
    //   const encoded = encodeURI(demo);
    
  return (
    <>
      <Context>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<Users />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/trivia" element={<Trivia />} />
            <Route path="/quiz" element={<Quiz />} />
            {/* <Route path="/check" element={<CheckAnswers />} /> */}
          </Routes>
        </Layout>
      </Context>
    </>
  );
}

export default App;
