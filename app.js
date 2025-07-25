import { db } from './firebase-config.js';
import { collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-lite.js';

let questions = {};
let current = null;
let currentCategory = "hromosvody";

async function loadQuestions() {
  questions = {};
  const categories = ["hromosvody", "vseobecne", "ndn", "obecne"];
  for (const cat of categories) {
    questions[cat] = [];
    const snapshot = await getDocs(collection(db, cat));
    snapshot.forEach(doc => {
      questions[cat].push(doc.data());
    });
  }
}

window.startQuiz = async function () {
  currentCategory = document.getElementById("category").value;
  if (!questions[currentCategory] || questions[currentCategory].length === 0) {
    alert("V této kategorii nejsou žádné otázky.");
    return;
  }
  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("form").classList.add("hidden");
  nextQuestion();
}

window.nextQuestion = function () {
  const qList = questions[currentCategory];
  current = qList[Math.floor(Math.random() * qList.length)];
  document.getElementById("question").innerText = current.q;
  let ansHtml = "";
  ["A","B","C","D"].forEach(letter => {
    if (current["a"+letter]) {
      ansHtml += `<button onclick="checkAnswer('${letter}')">${letter}: ${current["a"+letter]}</button><br>`;
    }
  });
  document.getElementById("answers").innerHTML = ansHtml;
}

window.checkAnswer = function (ans) {
  if (ans === current.correct) {
    alert("Správně!");
  } else {
    alert("Špatně. Správná odpověď: " + current.correct);
  }
  nextQuestion();
}

window.showForm = function () {
  document.getElementById("form").classList.remove("hidden");
  document.getElementById("quiz").classList.add("hidden");
}

window.hideForm = function () {
  document.getElementById("form").classList.add("hidden");
}

window.saveQuestion = async function () {
  const q = document.getElementById("newQuestion").value;
  const aA = document.getElementById("ansA").value;
  const aB = document.getElementById("ansB").value;
  const aC = document.getElementById("ansC").value;
  const aD = document.getElementById("ansD").value;
  const correct = document.getElementById("correct").value;

  const entry = { q, aA, aB, aC, aD, correct };
  await addDoc(collection(db, currentCategory), entry);
  alert("Otázka uložena.");
  await loadQuestions();
  hideForm();
}

loadQuestions();
