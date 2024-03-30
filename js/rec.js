const loadCategory = () => {
  fetch("https://cookhub-django.onrender.com/recipe/category/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        // console.log("cat->",item.name);
        const parent = document.getElementById("cat");
        const option = document.createElement("option");
        option.value = item.name;
        option.innerText = item.name;
        parent.appendChild(option);
      });
      console.log(data);
    });
};

loadCategory();

// const recipePosting = (event) => {
//   event.preventDefault();
//   const title = document.getElementById('title').value;
//   const instruction = document.getElementById('instruction').value;
//   const ingredients = document.getElementById('ing').value;
//   const image = document.getElementById('formFile').files[0];
//   const cat = document.getElementById("cat");
//   // const selectedCat = cat.options[cat.selectedIndex];
//   const user = localStorage.getItem("user");

//   const selectedCategories = Array.from(cat.selectedOptions).map(option => option.value);

//   const info = {
//     user : user,
//     category : selectedCategories,
//     title: title,
//     ingredients : ingredients,
//     image : image,
//     instructions : instruction,
//     created_on: "12"
//   };

//   console.log("info->",info);
//   fetch("https://cookhub-django.onrender.com/recipe/list/", {
//     method: "POST",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(info),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("fin",data);
//     });



// };

const recipePosting = (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const instruction = document.getElementById('instruction').value;
  const ingredients = document.getElementById('ing').value;
  const image = document.getElementById('formFile').files[0];
  const cat = document.getElementById("cat");
  const user = localStorage.getItem("user");

  const selectedCategories = Array.from(cat.selectedOptions).map(option => option.value);

  const formData = new FormData();
  formData.append('user', user);
  formData.append('category', selectedCategories);
  formData.append('title', title);
  formData.append('ingredients', ingredients);
  formData.append('image', image);
  formData.append('instructions', instruction);
  formData.append('created_on', "12");

  console.log("formData ->", formData);

  fetch("https://cookhub-django.onrender.com/recipe/list/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("fin", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};