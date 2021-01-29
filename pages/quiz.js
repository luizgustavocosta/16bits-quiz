/* eslint-disable react/prop-types */
import React from 'react';
import Loader from 'react-loader-spinner';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Result screen:
      </Widget.Header>
      <Widget.Content>
        <p>
          You got
          {' '}
          {/* {results.reduce((sum, resultAtual) => {
            if (resultAtual === true) {
              return sum + 1;
            }
            return sum;
          }, 0)}  */}
          {/* // Callback  and 0 the initial value */}
          {results.filter((result) => result).length}
          {' '}
          questions.
          {' '}
          Average score
          {' '}
          {((results.filter((result) => result).length / results.length) * 100).toFixed(2)}
          %
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              {/* key to avoid React warning */}
              #
              {index + 1}
              {' '}
              Result:
              {result === true
                ? 'Correct'
                : 'Wrong'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Loading...
      </Widget.Header>
      <Widget.Spinner>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </Widget.Spinner>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalOfQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState(false);
  const questionId = `question__${questionIndex}`; // To avoid name collision
  const isCorrect = selectedAlternative === question.answer; // For each question
  const hasAlternativeSelected = selectedAlternative !== undefined;// Initial state

  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          {`Question ${questionIndex + 1} of ${totalOfQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmitted(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmitted(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Next
          </Button>
          {isQuestionSubmitted && isCorrect && <p>Correct</p>}
          {isQuestionSubmitted && !isCorrect && <p>Wrong</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  // Define the inital screen state
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  // All will receive a whole list
  const [results, setResults] = React.useState([]);
  const totalOfQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    // results.push(result); // Avoid this approach
    // Immutable push, below
    setResults([
      ...results, // All I have
      result, // And add it
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  // useEffect is a callback function
  React.useEffect(() => {
    // fetch() ...
    // Doing a lot of rest api calls
    setTimeout(() => {
      setScreenState(screenStates.QUIZ); // After 1s change the state to Quiz
    }, 1 * 1000);
  // nasce === didMount
  }, []);
  // [] Will be called once. After been mounted.

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalOfQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalOfQuestions={totalOfQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
