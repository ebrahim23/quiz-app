import React, { Component } from "react";
import quickService from "../quizService";
import TheQuestion from "./TheQuestion";
import Results from "./Results";

export default class Questions extends Component {
  state = {
    allQuestions: [],
    score: 0,
    responses: 0,
    correct: 0,
    false: 0,
  };
  getQuestions = () => {
    quickService().then((question) => {
      this.setState({
        allQuestions: question,
      });
    });
  };
  componentDidMount() {
    this.getQuestions();
  }

  computedAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1,
        correct: this.state.correct + 1,
      });
    } else {
      this.setState({
        false: this.state.false + 1,
      });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5,
    });
  };

  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0,
      correct: 0,
      false: 0,
    });
  };

  render() {
    return (
      <section className="question-container">
        <div className="q-header">
          <div className="correct">
            correct <br /> <span>{this.state.correct}</span>
          </div>
          <div className="false">
            false <br /> <span>{this.state.false}</span>
          </div>
        </div>
        <div className="q-body">
          <div className="q-box">
            {this.state.allQuestions.length > 0 &&
              this.state.responses < 5 &&
              this.state.allQuestions.map(
                ({ question, answers, correct, questionId }) => (
                  <TheQuestion
                    question={question}
                    answers={answers}
                    key={questionId}
                    selected={(answer) => this.computedAnswer(answer, correct)}
                  />
                )
              )}
            {this.state.responses === 5 ? (
              <Results score={this.state.score} playAgain={this.playAgain} />
            ) : null}
          </div>
        </div>
      </section>
    );
  }
}
