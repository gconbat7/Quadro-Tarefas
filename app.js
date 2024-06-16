const columns = document.querySelectorAll(".column-cards");
const cards = document.querySelectorAll(".card");

let draggedCard;

const dragStart = (event) => {
  draggedCard = event.target;
  event.dataTransfer.effectAllowed = "move";
};

const dragOver = (event) => {
  event.preventDefault();
};

const dragEnter = ({ target }) => {
  if (target.classList.contains("column-cards")) {
    target.classList.add("column-high");
  }
};

const dragLeave = ({ target }) => {
  target.classList.remove("column-high");
};

const drop = ({ target }) => {
  if (target.classList.contains("column-cards")) {
    target.classList.remove("column-high");
    target.append(draggedCard);
  }
};

const createCard = ({ target }) => {
    if (!target.classList.contains("column-cards")) return;
  const card = document.createElement("section");

  card.className = "card";
  card.draggable = "true";
  card.contentEditable = "true";

  card.addEventListener("focusout", () => {
    card.contentEditable = "false";
    if (!card.textContent) card.remove();
  });

  card.addEventListener("dragstart", dragStart);

  target.append(card);

  card.focus();
};

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("dragenter", dragEnter);
  column.addEventListener("dragleave", dragLeave);
  column.addEventListener("drop", drop);
  column.addEventListener("dblclick", createCard);
});

cards.forEach((card) => {
  card.addEventListener("dragstart", dragStart);
});
