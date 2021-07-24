class Question {
  constructor(id) {
    this._question = "";
    this._correctAnswer = "";
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set question(param) {
    this._question = param;
  }

  set correctAnswer(param) {
    this._correctAnswer = param.toLowerCase();
  }

  makeQuestionOputput() {
    return `<div class="test-question">${this._question}</div>`;
  }

  makeAnswerOutput() {
    return `
            <div class="test-answer-output">
                <span>Your answer:</span>
                <input type="text" id="answer${this._id}">
            </div>
        `;
  }

  getUserInput() {
    return document.getElementById("answer" + this._id).valuetoLowerCase();
  }

  compareAnswer() {
    console.log("USer input: " + this.getUserInput());
    return this._correctAnswer == this.getUserInput();
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
    const name = `multi-${this._id}-radio-${radioId}`;
    return `
        <input type="radio" id="${name}" name="multi-${this._id}" value="${value}">
        <label for="${name}">${value}</label><br>
      `;
  }

  addChoice(choice) {
    this.choices.push(choice);
  }

  getUserInput() {
    return document.querySelector(`input[name="multi-${this._id}"]:checked`)
      .value.toLowerCase();
  }

  makeAnswerOutput() {
    let output = '<div class="test-answer-output">';
    this.choices.forEach((radio, index) => {
      output += this._makeOneRadioOutput(radio, index);
    });
    output += "</div>";
    return output;
  }
}

class CheckBoxQuestion extends RadioQuestion {
  set correctAnswer(param) {
    this._correctAnswer = param.sort().toString();
  }

  _makeOneRadioOutput(value, radioId) {
    const name = `multi-${this._id}-radio-${radioId}`;
    return `
      <input type="checkbox" id="${name}" name="multi-${this._id}" value="${value}">
      <label for="${name}">${value}</label><br>
    `;
  }

  getUserInput() {
    const checkedNodeList = document.querySelectorAll(`input[name="multi-${this._id}"]:checked`)
    const checkedElemsArray = Array.from(checkedNodeList)
    const checkedValues = checkedElemsArray.map( elem => elem.value )
    return checkedValues.sort().toString()
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

  _makeNavButtons(index) {
    let output = "";
    const questionId = this.questionsArray[index].id;

    output += `
      <div class="test-validate">
        <a href="#" onclick="validateAnswer(${questionId})">Check</a>
      </div>
    `;
    if (index > 0) {
      const prevQuestionId = this.questionsArray[index - 1].id;
      output += `
        <a href="#" onclick="renderTest(${prevQuestionId})" >Previous</a>
      `;
    }

    if (index < this.questionsArray.length - 1) {
      const nextQuestionId = this.questionsArray[index + 1].id;
      output += `
        <a href="#" onclick="renderTest(${nextQuestionId})" >Next</a>
      `;
    }

    return output;
  }

  makeOuptuForOneTest(testUI) {
    let output = "";
    let index = this.questionsArray.findIndex(function (question) {
      return testUI === question.id;
    });

    if (index < 0) {
      return "No test with id" + testUI;
    }

    const question = this.questionsArray[index];
    output += question.makeQuestionOputput();
    output += question.makeAnswerOutput();
    output += `<div id="answerReveal"></div>`;
    output += this._makeNavButtons(index);

    return output;
  }

  validateAnswer(id) {
    let foundQ = this.questionsArray.find(function (question) {
      return id === question.id;
    });

    console.log(foundQ.compareAnswer());
    return foundQ.compareAnswer();
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
q3.choices = ["Berlin", "Vienna", "Hamburg"];
q3.correctAnswer = "Berlin";

const q4 = new RadioQuestion(4);
q4.question = "What is a capital of England?";
q4.choices = ["Berlin", "London", "Bath"];
q4.correctAnswer = "London";

const q5 = new CheckBoxQuestion(5);
q5.question = "Which are vegetables?";
q5.choices = ["Orange", "Potato", "Carrot", "Cat", "Bicycle"];
q5.correctAnswer = ["Carrot", "Potato"];

const test = new Test();
test.addQuestion(q1);
test.addQuestion(q2);
test.addQuestion(q3);
test.addQuestion(q4);
test.addQuestion(q5);

function renderTest(id) {
  const testElem = document.getElementById("test");
  testElem.innerHTML = test.makeOuptuForOneTest(id);
  console.log("render test for" + id);
}

function validateAnswer(id) {
  let isCorrect = test.validateAnswer(id);
  let output = "";

  if (isCorrect) {
    output = "Correct!";
  } else {
    output = "Wrong!";
  }
  document.getElementById("answerReveal").innerText = output;
}

renderTest(2);
