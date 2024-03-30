const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("recipeId");
    // console.log(param);
    fetch("https://cookhub-django.onrender.com/recipe/list/")
      .then((res) => res.json())
      .then((data) => displayDetails(data.results,param));
  
  };
  
  const displayDetails = (recipies,id) => {
    // console.log(recipies);
    
    recipies?.forEach((recipie) => {
    
      if(recipie.id == id)
      {
        const categoryNames = recipie.category.join(', ');
        const parent = document.getElementById("recipie-details");
    
        const div = document.createElement("div");
    
        div.classList.add("container");
        
        div.innerHTML = `
        
        <div class="card">
        <img src=${recipie.image} class="card-img-top w-100" alt="...">
          <div class="card-header">
          <h4 class="ff-secondary text-primary fw-normal">Name: ${recipie.title}</h4>
          
          </div>
          <div class="card-body">
            <p class="ff-secondary text-primary fw-normal h5">Category: ${categoryNames}</p>
            <pre class="card-text"><span class="ff-secondary text-primary fw-normal">Ingredients: </span> ${recipie.ingredients}...</pre>
            <pre class="card-text"><span class="ff-secondary text-primary fw-normal">Instructions: </span> ${recipie.instructions}...</pre>
          </div>
          <div class="card-footer">
          <p class="ff-secondary text-primary fw-normal text-center">
          <i class="fa-solid text-primary fa-clock-rotate-left me-2"></i>Created On: ${recipie?.created_on}
          </p>
          </div>
        </div>
      
            `;
    
        parent.appendChild(div);
      }
    });
  };

  getparams();