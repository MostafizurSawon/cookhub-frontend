const loadCategory = () => {
  fetch("https://cookhub-django.onrender.com/recipe/category/")
    .then((res) => res.json())
    .then((data) => displayCategory(data))
    .catch((err) => console.log(err));
};

const displayCategory = (categories) => {
  //   console.log(services);
  categories.forEach((category) => {
    // console.log(category);
    const parent = document.getElementById("category-container");
    let icon = "fa-solid fa-shrimp";
    if(category.name == "Main Courses")
    {
      icon = "fa fa-utensils";
    }
    else if(category.name == "Appetizers")
    {
      icon = "fa fa-hamburger"
    }
    else if(category.name == "Desserts")
    {
      icon = "fa fa-stroopwafel";
    }
    else if(category.name == "Snacks")
    {
      icon = "fa-solid fa-cookie-bite";
    }
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.innerHTML = `
    <a onclick="loadRecipies('${category.name}')" class="d-flex align-items-center text-start mx-3 ms-0 pb-3" data-bs-toggle="pill" href="#tab-1">
          
    <i class="${icon} fa-2x text-primary"></i>
        <div class="ps-3">
          <h6 class="mt-n1 mb-0">${category.name}</h6>
          
          <small class="text-body">Recipe</small>
        </div>
    </a>
      `;
    parent.appendChild(li);
  });
};



const loadRecipies = (search) => {
  document.getElementById("recipies").innerHTML = "";
  document.getElementById("spinner2").style.display = "block";
  let length = document.getElementById("length");
  length.innerHTML = "";
  // console.log(search);
  fetch(
    `https://cookhub-django.onrender.com/recipe/list/?search=${
      search ? search : ""
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if (data.results.length > 0) {
        document.getElementById("spinner2").style.display = "none";
        document.getElementById("nodata2").style.display = "none";
        displyRecipies(data?.results);
        // console.log(data.results.length);
      } else {
        // console.log(data);
        
        document.getElementById("recipies").innerHTML = "";
        document.getElementById("spinner2").style.display = "none";
        document.getElementById("nodata2").style.display = "block";
      }
      
    });
};


const displyRecipies = (recipies) => {
  // console.log(recipies.length);
  recipies?.forEach((recipie) => {
    
    const categoryNames = recipie.category.join(', ');
    const parent = document.getElementById("recipies");

    let length = document.getElementById("length");
    length.innerHTML = `<h1 class="text-primary text-start">Recipe found: ${recipies.length}</h1>`;

    if(length)
    {
      const div = document.createElement("div");

      div.classList.add("col-md-6");
      
      div.innerHTML = `
      
      <div class="card text-center">
      <img src=${recipie.image} class="card-img-top w-100" alt="...">
        <div class="card-header">
        <h5 class="card-title">Name: ${recipie.title}</h5>
        
        </div>
        <div class="card-body">
          <p class="card-title">Category: ${categoryNames}</p>
          <pre class="card-text">Ingredients: ${recipie.ingredients.slice(0, 30)}...</pre>
          <p class="card-text">Instructions: ${recipie.instructions.slice(0, 50)}...</p>
          <a target="_blank" href="details.html?recipeId=${
            recipie.id
          }" class="btn btn-primary">Details</a>
        </div>
        <div class="card-footer text-muted">
        <i class="fa-solid fa-clock-rotate-left me-2"></i>Created On: ${recipie?.created_on}
        </div>
      </div>
    
          `;

      parent.appendChild(div);
    }
    else{
      const div = document.createElement("div");

      div.classList.add("col-md-6");
      
      div.innerHTML = `
        <section class="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
            <div class="container">
            <div class="row">
                <div class="col-12">
                <div class="text-center">
                    <h2 class="d-flex justify-content-center align-items-center gap-2 mb-4">
                    <span class="display-1 fw-bold">4</span>
                    <i class="bi bi-exclamation-circle-fill text-danger display-4"></i>
                    <span class="display-1 fw-bold bsb-flip-h">4</span>
                    </h2>
                    <h3 class="h2 mb-2">No result found!</h3>
                    <p class="mb-5">Your desired recipe was not found.</p>
                    <!-- <a class="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0" href="#!" role="button">Back to Home</a> -->
                </div>
                </div>
            </div>
            </div>
        </section>
    
          `;

      parent.appendChild(div);
      
    }

    
  });
};

const handleSearch = () => {
  const value = document.getElementById("search").value;
  loadRecipies(value);
};

// const loadReview = () => {
//   fetch("https://cookhub-django.onrender.com/recipe/reviews/")
//     .then((res) => res.json())
//     .then((data) => displayReview(data));
// };

// const displayReview = (reviews) => {
//   reviews.forEach((review) => {
//     // console.log(review);
//     const parent = document.getElementById("review-container");
//     const div = document.createElement("div");
//     div.classList.add("testimonial-item", "bg-transparent", "border", "rounded", "p-4");
//     div.innerHTML = `
//     <i class="fa fa-quote-left fa-2x text-primary mb-3"></i>
//     <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
//     <div class="d-flex align-items-center">
//         <img class="img-fluid flex-shrink-0 rounded-circle" src="img/testimonial-2.jpg" style="width: 50px; height: 50px;">
//         <div class="ps-3">
//             <h5 class="mb-1">Client Name</h5>
//             <small>Profession2</small>
//         </div>
//     </div>
//         `;
//     parent.appendChild(div);
//   });
// };

// loadReview();
loadRecipies();
loadCategory();
{/* <button > <a target="_blank" href="docDetails.html?doctorId=${
                doctor.id
              }">Details</a> </button> */}