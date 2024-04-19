import { useState } from "react";
import { useRouter } from 'next/router';
const QuizForm = ({onSubmit})=>{
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState(['']);
    const [choices, setChoices] = useState([['']]);
    const [answers, setAnswers] = useState([0]);
    const router = useRouter();
    const handleQuiz = () => {
      router.push('/home');
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        const quizId = Date.now().toString(); 
        const quizData = {
            id: quizId,
            title,
            questions: questions.map((question, index)=>({
                question,
                choices: choices[index],
                answer: choices[index][answers[index]]
            }))
        };
        const existingQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
        localStorage.setItem('quizzes', JSON.stringify([...existingQuizzes, quizData]));
        setTitle('');
        setQuestions(['']);
        setChoices([['']]);
        setAnswers([0]);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <label style={{ marginBottom: '10px', display: 'block' }}>
            Title:
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </label>
          <br />
          {questions.map((question, index)=>(
            <div key={index} style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Question {index + 1}:
                <input type="text" value={question} onChange={(e)=>{
                  const newQuestions = [...questions];
                  newQuestions[index] = e.target.value;
                  setQuestions(newQuestions);
                }} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} />
              </label>
              <br />
              {choices[index].map((choice, choiceIndex)=>(
                <div key={choiceIndex} style={{ marginBottom: '5px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>
                    Choice {String.fromCharCode(65 + choiceIndex)}:
                    <input type="text" value={choice} onChange={(e)=>{
                      const newChoices = [...choices];
                      newChoices[index][choiceIndex] = e.target.value;
                      setChoices(newChoices);
                    }} required style={{ width: 'calc(100% - 50px)', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }} />
                  </label>
                  <button type="button" onClick={()=>{
                    const newChoices = [...choices];
                    newChoices[index].push('');
                    setChoices(newChoices);
                  }} style={{ padding: '8px 15px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Choice</button>
                </div>
              ))}
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Answer:
                <select value={answers[index]} onChange={(e)=>{
                  const newAnswers = [...answers];
                  newAnswers[index] = parseInt(e.target.value);
                  setAnswers(newAnswers);
                }} required style={{ width: 'calc(100% - 50px)', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
                  {choices[index].map((choice, choiceIndex)=>(
                    <option key={choiceIndex} value={choiceIndex}>{String.fromCharCode(65 + choiceIndex)}</option>
                  ))}
                </select>
              </label>
              <br />
            </div>
          ))}
          <button type="button" onClick={()=>{
            setQuestions([...questions, '']);
            setChoices([...choices, ['']]);
            setAnswers([...answers, 0]);
          }} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}>Add Question</button>
          <br />
          <button type="submit" onClick={handleQuiz} style={{ padding: '15px 30px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'block', margin: 'auto' }}>Create Quiz</button>
        </form>
      )
      
}

export default QuizForm;
