import QuizForm from "../components/QuizForm";
import React from "react";


class ParentComponent extends React.Component{

    handleFormSubmit = async (formData) => {
        try {
          const response = await fetch('/api/create-quiz', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formData }),
          });
    
          if (response.ok) {
            const { quizId } = await response.json();
            window.location.href = `/quiz/${quizId}`;
          } else {
            console.error('Failed to create quiz:', response.statusText);
          }
        } catch (error) {
          console.error('An error occurred while creating the quiz:', error);
        }
      };
    

    render(){
        return (
            <div>
                <h1>Quiz Page</h1>
                <QuizForm/> 
            </div>
        )
    }
}

export default ParentComponent;
