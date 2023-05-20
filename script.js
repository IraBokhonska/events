document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "e") {
    e.preventDefault();
    replaceWithTextarea();
  }
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    replaceWithDiv();
  }
});

function replaceWithTextarea() {
  const content = document.querySelector(".content");
  const text = content.innerText;

  const textarea = document.createElement("textarea");
  textarea.value = text;

  content.parentNode.replaceChild(textarea, content);
}

function replaceWithDiv() {
  const textarea = document.querySelector("textarea");
  const text = textarea.value;

  const div = document.createElement("div");
  div.innerText = text;

  textarea.parentNode.replaceChild(div, textarea);
}

// --------------------------TABLE------------------------------------------

const table = document.querySelector(".table");

table.onclick = (e) => {
  if (e.target.tagName != "TH") return;

  let th = e.target;

  sortTable(th.cellIndex, th.dataset.type);
};

function sortTable(colNum, type) {
  const tbody = table.querySelector(".table__body");
  const rowsArray = Array.from(tbody.rows);
  let compare;

  switch (type) {
    case "number":
      compare = (rowPrev, rowCur) => {
        return rowPrev.cells[colNum].innerHTML - rowCur.cells[colNum].innerHTML;
      };
      break;
    case "string":
      compare = (rowPrev, rowCur) => {
        return rowPrev.cells[colNum].innerHTML > rowCur.cells[colNum].innerHTML
          ? 1
          : -1;
      };
      break;
  }

  rowsArray.sort(compare);

  tbody.append(...rowsArray);
}

// ------------------------------block-----------------------------------

function resizeBlock(event) {
  const block = document.querySelector(".block");

  block.style.width = event.clientX;
  block.style.height = event.clientY;
}

document.addEventListener("mouseup", () => {
  document.removeEventListener("mousemove", resizeBlock);
});
