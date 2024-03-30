const loadUserDetails = () => {
  const user = localStorage.getItem("user");
  let count = 0;
  // fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
  
  fetch("https://cookhub-django.onrender.com/user/list/")
    .then((res) => res.json())
    .then((data) => {
      console.log("hello->>>",user,data);
      

      data?.forEach((profile) => {
        if(profile.user == user)
        {
            const pi1 = document.getElementById("pro-image1");
            pi1.innerHTML = "";
            pi1.innerHTML = `<img src="${profile.image}" class="img-fluid pro-pic" alt="Profile Pic"></img>`
            document.getElementById("pro-name").innerHTML =`Welcome, ${user}`;
            document.getElementById("pro-name2").innerHTML =`${profile?.user}`;
            document.getElementById("mobile").innerHTML =`
            <a href="${profile?.mobile_no}">${profile?.mobile_no}</a>
            `;
            document.getElementById("user_fb").innerHTML =`<a href="${profile?.facebook}" class="d-inline-block bg-dark link-light lh-1 p-2 rounded">
            <i class="bi bi-facebook"></i>
            </a>`;
        }
        else{
          document.getElementById("pro-name").innerHTML =`Welcome, ${user}`;
          document.getElementById("pro-name2").innerHTML =`${user}`;
        }
        // if(profile.user == user)
        // {
        //   const parent = document.getElementById("profile-page");
        //   const div = document.createElement("user-all");
        //   div.classList.add("user-all");
        //   div.innerHTML = `
        //       <div class="user-img">
        //       <img class="w-25" src="${profile.image}" alt="" />
        //     </div>
        //     <div class="user-info">
        //       <h1>${profile.id}</h1>
        //       <h1>${profile.user}</h1>
        //       <h3>${profile.first_name + profile.last_name}</h3>
        //       <h3>${profile.user.email}</h3>
        //       <h3>${profile.mobile_no}</h3>
        //     </div>
        //   `;
        //   parent.appendChild(div);
        // }
      });

      
    });

    fetch("https://cookhub-django.onrender.com/recipe/list/")
    .then((res) => res.json())
    .then((data) => {
      console.log("recipe->>>",user,data.results);
      
      // console.log("count->>>",user,data.count);
      data.results?.forEach((recipie) => {
        const categoryNames = recipie.category.join(', ');
        const parent = document.getElementById("pro-recipies");
        

        // let length = document.getElementById("pro-length");
        // length.innerHTML = `<h1 class="text-primary text-start">Recipe found: ${recipies.length}</h1>`;
    
        if(recipie.user == user) {
          count++;
          const div = document.createElement("div");
    
          div.classList.add("col-md-6");
          
          div.innerHTML = `
          
          <div class="card text-center">
            <img src=${recipie.image} class="card-img-top w-100" alt="Recipe image">
            <div class="card-header">
            <h6 class="card-title">Name: ${recipie.title}</h6>
            
            </div>
            <div class="card-body">
              <p class="card-title">Category: ${categoryNames}</p>
              <pre class="card-text">Ingredients: ${recipie.ingredients.slice(0, 20)}...</pre>
              <p class="card-text">Instructions: ${recipie.instructions.slice(0, 50)}...</p>
              <a target="_blank" href="details.html?recipeId=${
                recipie.id
              }" class="btn btn-primary">Details</a>
            </div>
            <div class="card-footer text-muted">
              <i class="fa-solid fa-clock-rotate-left me-2"></i>Created On: ${recipie?.created_on}
            </div>                                                      
          </div>`;
    
          parent.appendChild(div);
        }

      });
    });
    if(count == 0)
    {
      // console.log(count);
      const parent = document.getElementById("pro-recipies");
      const div = document.createElement("div");
      
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
                <h3 class="h2 mb-2">You have not submitted any recipes!</h3>
                <p class="mb-5">The page you are looking for was not found.</p>
    
            </div>
            </div>
          </div>
        </div>
      </section>`;

      parent.appendChild(div);
    }
};
loadUserDetails();
