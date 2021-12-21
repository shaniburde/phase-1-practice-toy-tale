let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  handleForm()
  loadToys()
});

function handleForm() {
// access the form element on the DOMContentLoaded
const newToyForm = document.querySelector(".add-toy-form")
// add 'submit' event liistener to that form
newToyForm.addEventListener("submit", (e) => {
e.preventDefault();
// grab the values from the two inputs
const toyName = e.target.toyName.value
const toyImage = e.target.toyImage.value
const newToy = {
  name: toyName,
  image: toyImage,
  likes: 0
}
      renderToy(newToy);
      e.target.reset();

  })

}

function loadToys() {
  fetch("http://localhost:3000/toys")
    .then(r => r.json())
    .then(toyArray => toyArray.forEach((toy) => renderToy(toy)))
}

function renderToy(toy) {
  //do some stuff with ONE toy

  const toyCard = document.createElement("div");
  toyCard.className = "card"

  const toyName = document.createElement("h2")
  toyName.innerText = toy.name

  const toyImg = document.createElement("img")
  toyImg.src = toy.image
  // toyImg.className = "toy-avatar"
  toyImg.classList.add("toy-avatar")

  const likes = document.createElement("p")
  likes.innerText = toy.likes

  const likeBtn = document.createElement("button")
  likeBtn.innerText = "Like ❤️"

  likeBtn.addEventListener("click", () => {
    //grab the p tag's text content 
    const newLikes = +likes.innerText + 1
    // turn it into a number
    //tell the p tag's text to look like the new value
    likes.innerText = newLikes
  })

  toyCard.append(toyImg, toyName, likes, likeBtn)

  document.getElementById("toy-collection").appendChild(toyCard)

  // <div class="card">
  //   <h2>Woody</h2>
  //   <img src="[toy_image_url]" class="toy-avatar" />
  //   <p>4 Likes</p>
  //   <button class="like-btn" id="[toy_id]">Like ❤️</button>
  // </div>
}
    


