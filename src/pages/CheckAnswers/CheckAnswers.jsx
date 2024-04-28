function CheckAnswers({ data, videoURL, loading }) {
  const { questions } = data;
  const useranswer = JSON.parse(localStorage.getItem("useranswer"));
  console.log(data);
  return (
    <div>
      <div className="bg-[#EFF7F0] mt-14 mb-28 w-[800px] flex flex-col p-[30px]">
        {questions?.map((itm, idx) => {
          return (
            <div key={idx} className="mt-8">
              <span className="text-center text-[24px] my-[20px]">
                {`Q${idx + 1}: ${itm.question}`}
              </span>
              {itm.options &&
                Object.keys(itm.options).map((option, optionIdx) => (
                  <div
                    key={optionIdx}
                    className={`${
                      option === itm.answer
                        ? "bg-green-500 "
                        : useranswer.find(
                            (ans) =>
                              ans.question_id === itm.question_id &&
                              ans.answer === option
                          )
                        ? "bg-red-500"
                        : "bg-white"
                    } rounded my-[10px] p-[10px] text-[16px] `}
                  >
                    <div className="form-control w-full flex">
                      <label className="label cursor-pointer justify-normal flex items-center gap-4">
                        <input
                          value={itm.options[option]}
                          type="radio"
                          name={`radio-${idx}`} // Use unique name for each question
                          className="radio checked:bg-blue-500 w-[25px] h-[25px] cursor-not-allowed"
                          checked={option === itm.answer}
                          disabled
                        />
                        <span className="label-text text-[16px]">
                          {itm.options[option]}
                        </span>
                      </label>
                      {!itm.options && (
                        <span className="text-red-500">
                          No options available for this question.
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-12 mb-20 justify-center">
        <p className="text-center text-[16px] text-primary">
          In order to get your feedback about the test please click here:{" "}
        </p>
        {loading ? (
          <span className="text-center text-[14px] text-secondary">
            Your video is generating. Please wait...{" "}
          </span>
        ) : (
          <a
            className="link link-secondary text-[16px]"
            href={videoURL?.data?.url}
            target="_blank"
          >
            Download Video
          </a>
        )}
      </div>
    </div>
  );
}

export default CheckAnswers;
