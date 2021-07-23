class Question {
  constructor(id) {
    this._question = "";
    this._correctAnswer = "";
    this._id = id;
  }

  set question(param) {
    this._question = param;
  }

  set correctAnswer(param) {
    this._correctAnswer = param;
  }

  makeQuestionOputput() {
    return `<div>${this._question}</div>`;
  }

  makeAnswerOutput() {
    return `
            <div>
                <span>Your answer:</span>
                <input type="text" id="answer${this._id}">
            </div>
        `;
  }

  makeCorrectAnswerOutput() {
    return `<div>${this._correctAnswer}</div>`;
  }
}

class RadioQuestion extends Question {
  constructor(id) {
    super(id);
    this.choices = [];
  }

  _makeOneRadioOutput(value, radioId) {
      const name = "radio-" + radioId
      return `
        <input type="radio" id="${name}" name="multi-${this._id}" value="${value}">
        <label for="${name}">${value}</label><br>
      `
  }

  addChoice(choice) {
      this.choices.push(choice)
  }

  makeAnswerOutput() {
    let output = "";
    this.choices.forEach((radio, index) => {
      output += this._makeOneRadioOutput(radio, index)
    });
    return output;
  }

}

class Test {
  constructor() {
    this.questionsArray = [];
  }
  addQuestion(question) {
    this.questionsArray.push(question);
  }

  makeTestOutput() {
    let output = "";
    this.questionsArray.forEach(function (q) {
      output += q.makeQuestionOputput();
      output += q.makeAnswerOutput();
    });
    return output;
  }
}

const q1 = new Question(1);
q1.question = "What is a meaning of life?";
q1.correctAnswer = "42";

const q2 = new Question(2);
q2.question = "What is in my pocket?";
q2.correctAnswer = "a ring";

const q3 = new RadioQuestion(3);
q3.question = "What is a capital of Germany?";
q3.choices = ["Berlin", "Vienna", "Hamburg"]
q3.correctAnswer = "Berlin";

const test = new Test();
test.addQuestion(q1);
test.addQuestion(q2);
test.addQuestion(q3);

const testElem = document.getElementById("test");
testElem.innerHTML = test.makeTestOutput();
