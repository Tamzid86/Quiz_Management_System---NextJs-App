const Question = ({question, onSelectAnswer}) => (
    <div className="question">
        <h3>{question.prompt}</h3>
        <ul>
            {question.choices.map((choice, index) => (
                <li key={index}>
                    <button onClick={() => onSelectAnswer(index)}>
                        {choice}
                    </button>
                </li>
            ))}
        </ul>

    </div>
)

export default Question;
