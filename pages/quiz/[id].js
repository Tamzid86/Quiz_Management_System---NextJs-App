import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Timer from '../../components/Timer';

const QuizPage = () => {
  const router = useRouter();
  const { id: quizId } = router.query;

  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds

  useEffect(() => {
    const fetchQuiz = () => {
      const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
      const selectedQuiz = storedQuizzes.find(q => q.id === quizId);
      setQuiz(selectedQuiz);
    };

    if (quizId) {
      fetchQuiz();
      const timer = setTimeout(() => {
        // Trigger the submission after 2 minutes
        handleSubmit();
      }, timeRemaining * 1000);
  
      // Clear the timer when the component unmounts or when the quiz is submitted
      return () => clearTimeout(timer);
    }
  }, [quizId]);
  
  const handleRadioChange = (event, questionIndex) => {
    const selectedChoice = event.target.value;
    const updatedUserAnswers = { ...userAnswers };
    updatedUserAnswers[questionIndex] = selectedChoice;
    setUserAnswers(updatedUserAnswers);
  };

  const handleSubmit = () => {
    let totalScore = 0;
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setSubmitted(true);
  };

  

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      {quiz ? (
        <div>
          <h1 style={{ marginBottom: '20px', color: '#5A0607' }}>{quiz.title}</h1>
          <form>
            <ul>
              {quiz.questions.map((obj, index) => (
                <li key={index} style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', color: '#555' }}>{obj.question}</p>
                  <ul>
                    {obj.choices.map((choice, choiceIndex) => (
                      <li key={choiceIndex} style={{ marginBottom: '5px' }}>
                        <input
                          type="radio"
                          id={`choice-${index}-${choiceIndex}`}
                          name={`question-${index}`}
                          value={choice}
                          checked={userAnswers[index] === choice}
                          onChange={(event) => handleRadioChange(event, index)}
                        />
                        <label htmlFor={`choice-${index}-${choiceIndex}`} style={{ marginLeft: '5px', color: '#666' }}>{choice}</label>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            {!submitted && (
              <button type="button" onClick={handleSubmit} style={{ backgroundColor: '#3D1213', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
            )}
          </form>
          {submitted && (
            <div style={{ marginTop: '20px' }}>
              <h2>Your Score: {score}/{quiz.questions.length}</h2>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QuizPage;
