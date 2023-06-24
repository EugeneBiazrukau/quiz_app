import React, { useState, useEffect } from 'react';
import shortQuestions from './shortQuestions';

const defaultQuestions = [
  {
    question:
      'Яхта, идущая по течению реки, сближается с предоставленными ниже навигационными знаками, установленными на берегу. Что должен сделать рулевой?',
    options: [
      'направить судно в сторону левого берега',
      'держаться в безопасном расстоянии от знака',
      'держаться правого берега',
    ],
    correctAnswerIndex: 2,
    image: ['/img/image7.png', '/img/image8.png'],
  },
  // Add more questions here...
];

const QuizApp = () => {
  const topics = [
    { name: 'Short set', questions: shortQuestions },
    // Add more topic objects here...
  ];

  console.log(shortQuestions);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [randomizeQuestions, setRandomizeQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    if (selectedTopic) {
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);
    }
  }, [selectedTopic]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleRandomizeChange = (event) => {
    setRandomizeQuestions(event.target.checked);
  };

  const shuffleQuestions = () => {
    const shuffledQuestions = [...selectedTopic.questions].sort(() => Math.random() - 0.5);
    setSelectedTopic((prevTopic) => ({
      ...prevTopic,
      questions: shuffledQuestions,
    }));
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const handleAnswerButtonClick = (index) => {
  if (!showCorrectAnswer) {

    if (index === selectedTopic.questions[currentQuestion].correctAnswerIndex) {
      setScore(score + 1);
    }
    
    setShowCorrectAnswer(true);

    setTimeout(() => {
      setShowCorrectAnswer(false);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < selectedTopic.questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1000);
  }
};

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };
  const handleReturnToThemeSelection = () => {
    setSelectedTopic(null);
    setRandomizeQuestions(false);
  };

  useEffect(() => {
    if (randomizeQuestions && selectedTopic) {
      shuffleQuestions();
    }
  }, [randomizeQuestions, selectedTopic?.name]);

  return (
    <div className="quiz-app">
      {!selectedTopic ? (
        <div className="topic-selection">
          <h2>Select a topic:</h2>
          <div className="randomize-checkbox">
            <label>
              Randomize Questions:
              <input
                type="checkbox"
                checked={randomizeQuestions}
                onChange={handleRandomizeChange}
              />
            </label>
          </div>
          <div className="topic-buttons">
            {topics.map((topic) => (
              <button key={topic.name} onClick={() => handleTopicSelect(topic)}>
                {topic.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="question-section">
          {showScore ? (
            <div className="score-section">
              <h2>Your Score</h2>
              <p>
                You scored {score} out of {selectedTopic.questions.length}!
              </p>
              <button onClick={restartQuiz}>Restart</button>
              <button onClick={handleReturnToThemeSelection}>Select Another Theme</button>
            </div>
          ) : (
            <div>
              <h2>Question {currentQuestion + 1}</h2>
              {selectedTopic.questions[currentQuestion].image && (
                Array.isArray(selectedTopic.questions[currentQuestion].image) ? 
                selectedTopic.questions[currentQuestion].image.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt="Question"
                    className="question-image"
                  />
                )) : (
                  <img
                    src={selectedTopic.questions[currentQuestion].image}
                    alt="Question"
                    className="question-image"
                  />
                )
              )}
              <p>{selectedTopic.questions[currentQuestion].question}</p>
              <div className="options">
                {selectedTopic.questions[currentQuestion].options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswerButtonClick(index)} className={showCorrectAnswer && index === selectedTopic.questions[currentQuestion].correctAnswerIndex ? 'correct-answer' : ''}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizApp;
