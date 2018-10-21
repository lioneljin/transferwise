import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import './App.css';
import Timer from 'react-timer-wrapper';
import { Line } from 'rc-progress';
import animal from './svg/fox.png';
import mobile from './svg/mobile.png';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      image: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        Correct: 0,
        Incorrect: 0,
        Wrong: 0
      },
      result: '',
      transactionTime: 5000,
      transactionProgress: 0,
      completed: false,
      timerActivate: false 
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      image: quizQuestions[0].image,
      answerOptions: shuffledAnswerOptions[0],
      transactionProgress: 0
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: state.answersCount[answer] + 1
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      image: quizQuestions[counter].image,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: this.state.answersCount['Correct'] });
    } else {
      this.setState({ result: 0 });
    }
  }

  onTimerStart({duration, progress, time}) {
    console.log('====onTimerStart', duration, progress, time, this);
    //this.setState( {transactionProgress: 0} );
  }
 
  onTimerStop({duration, progress, time}) {
    console.log('====onTimerStop', duration, progress, time);
  }
 
  onTimerTimeUpdate({duration, progress, time}) {
  }
 
  onTimerFinish({duration, progress, time}) {
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        image={this.state.image}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    // fox 18 m/s; Budapest - London 1725800 meters; transaction - 5 seconds; 100 meters - Football field; 1725 fields
    const city1 = "Budapest";
    const city2 = "London";
    const fact = (
      <div>It took <strong>{this.state.transactionTime} seconds</strong> fro your money to transfer from {city1} to {city2}. The same time <strong>a fox</strong> can run only <strong>1 football field</strong>, your money run <strong>1725</strong> fields</div>);
    const result = (<div>You gave <strong>{this.state.answersCount['Correct']}</strong> correct answers, you earn <strong>{this.state.answersCount['Correct']*3} TWCoins</strong></div>)
    return <Result quizResult={result} image={animal} fact={fact} />;
  }

  render() {
    return (
      <div className="App">
        {!this.state.timerActivate ? 
          <div>
            <div className="App-header">
              <h2>TransferWize quiz</h2>
              <p>If you pass if faster than we commit your transaction you'll get TWPoints!</p>
              <p>
                <img src={mobile} onClick={() => {this.setState({timerActivate: true})}} />
              </p>
            </div>
          </div>
          : 
          <div>
            <div className="App-header">
              <h2>TransferWize quiz</h2>
              <p>If you pass if faster than we commit your transaction you'll get TWPoints!</p>
              <Timer
                active={this.state.timerActivate}
                duration={this.state.transactionTime}
                onFinish={({duration, progress, time}) => {this.setState({completed: true}); return this.onTimerFinish(duration, progress, time);} }
                onStart={({duration, progress, time}) => { 
                  this.setState( {transactionProgress: progress} ); 
                  return this.onTimerStart(duration, progress, time); } }
                onStop={this.onTimerStop}
                onTimeUpdate={({duration, progress, time}) => { 
                  this.setState( {transactionProgress: progress} ); 
                  return this.onTimerTimeUpdate(duration, progress, time); } }
              />
            </div>
            <br />
            <Line percent={this.state.transactionProgress  * 100} strokeWidth="2" strokeColor="#00b9ff" trailColor="#5d7079" />
            {this.state.result || this.state.completed ? this.renderResult() : this.renderQuiz()}
          </div>
        }
      </div>
    );
  }
}

export default App;
