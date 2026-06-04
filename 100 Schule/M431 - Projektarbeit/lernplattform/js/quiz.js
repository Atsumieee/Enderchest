/* ===================================================
   quiz.js – Generic Quiz Renderer
   Usage on any page:
     initQuiz('quiz-container', [ { q, options, correct, explanation }, ... ]);
=================================================== */

function initQuiz(containerId, questions) {
  var container = document.getElementById(containerId);
  if (!container || !questions || !questions.length) return;

  var current  = 0;
  var answered = false;

  function render() {
    var q = questions[current];
    answered = false;

    var optHtml = q.options.map(function (o, i) {
      return '<div class="answer-option" onclick="quizAnswer(' + i + ')">'
           + '<div class="option-dot"></div> ' + o + '</div>';
    }).join('');

    container.innerHTML =
      '<div class="quiz-container">'
      + '<div class="quiz-header">'
      +   '<div class="quiz-title"><i class="ti ti-help-circle"></i> Quiz</div>'
      +   '<div class="quiz-counter">Frage ' + (current + 1) + ' / ' + questions.length + '</div>'
      + '</div>'
      + '<div class="question-text">' + q.q + '</div>'
      + optHtml
      + '<div class="feedback" id="quiz-fb"></div>'
      + '<div class="quiz-actions" id="quiz-act"></div>'
      + '</div>';
  }

  window.quizAnswer = function (chosen) {
    if (answered) return;
    answered = true;

    var q       = questions[current];
    var correct = q.correct;
    var opts    = container.querySelectorAll('.answer-option');

    opts.forEach(function (el) { el.classList.add('disabled'); });
    opts[chosen].classList.add(chosen === correct ? 'correct' : 'wrong');
    if (chosen !== correct) opts[correct].classList.add('correct');

    var fb  = document.getElementById('quiz-fb');
    var act = document.getElementById('quiz-act');

    fb.className = 'feedback ' + (chosen === correct ? 'correct' : 'wrong');
    fb.innerHTML = (chosen === correct
      ? '<i class="ti ti-check"></i> Richtig! '
      : '<i class="ti ti-x"></i> Falsch. ') + q.explanation;

    if (current < questions.length - 1) {
      act.innerHTML = '<button class="btn primary" onclick="quizNext()">'
                    + 'Nächste Frage <i class="ti ti-arrow-right"></i></button>';
    } else {
      /* Mark page as complete */
      if (window.CURRENT_PAGE && typeof markComplete === 'function') {
        markComplete(window.CURRENT_PAGE);
      }
      act.innerHTML = '<button class="btn success"><i class="ti ti-check"></i> Abgeschlossen!</button>';
    }
  };

  window.quizNext = function () {
    current++;
    render();
  };

  render();
}
