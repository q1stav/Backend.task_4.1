document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    console.log(id);
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, editedNote) {
  await fetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      title: editedNote,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => console.log(res));
}

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const editedNote = prompt("Edit Note");
    edit(id, editedNote).then(() => {
      event.target.closest("li").innerHTML=`
      ${editedNote}
  <div>
      <button class="btn btn-primary" data-type="edit" data-id="1715027716412">Edit</button>
      <button class="btn btn-danger" data-type="remove" data-id="1715027716412">×</button>
  </div>
  `
  ;
    });
  }
});
