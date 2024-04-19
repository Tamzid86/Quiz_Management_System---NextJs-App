import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AllQuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const router = useRouter();
  const handleCreateQuiz = () => {
    router.push('/create-quiz');
  };
  useEffect(() => {
    const fetchQuizzes = () => {
      const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
      setQuizzes(storedQuizzes);
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="container">
      <h1 className="title">All Quizzes</h1>
      <ul className="quiz-list">
        {quizzes.map(quiz => (
          <li className="quiz-item" key={quiz.id}>
            <Link className="quiz-link" href={`/quiz/${quiz.id}`}>
              {quiz.title}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateQuiz} style={{marginTop:"30px", backgroundColor: '#3D1213', color: 'white', padding: '10px 60px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Create a Quiz</button>


      
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          color: #5A0607;
          margin-bottom: 20px;
        }

        .quiz-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .quiz-item {
          margin-bottom: 10px;
        }

        .quiz-link {
          text-decoration: none;
          color: #007bff;
          font-size: 18px;
          transition: color 0.3s ease;
        }

        .quiz-link:hover {
          color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default AllQuizzesPage;
