(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        // console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);



const handlelogOut = () => {
    const remove = document.getElementById("logged-in");
    remove.innerHTML = `<a href="login.html" class="me-2 btn btn-outline-info py-2 px-4">Login</a>
    <a href="register.html" class="btn btn-outline-primary py-2 px-4">Register</a>`;
    const token = localStorage.getItem("token");
  
    fetch("https://cookhub-django.onrender.com/user/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("logout data ->",data);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        window.location.href = "login.html";
      });
  };
  

const handleRegButton=()=>{
    const user = localStorage.getItem("user");
    console.log("regbutton->",user);
    if(user){
        console.log("button removing");
        const remove = document.getElementById("logged-in");
        remove.innerHTML = "";
        const add = document.getElementById("logged-out");
        add.innerHTML=`<a class="btn btn-outline-danger py-2 px-4">Logout</a>`;
        const pro = document.getElementById("profile-nav");
        pro.innerHTML =`<a href="profile.html" class="nav-item nav-link">Profile</a>`;
        const proRec = document.getElementById("recipe-nav");
        proRec.innerHTML =`<a href="rec.html" class="nav-item nav-link">Add Recipe</a>`;
    }
    else{
        const remove = document.getElementById("logged-out");
        remove.innerHTML = "";
        const pro = document.getElementById("profile-nav");
        pro.innerHTML ="";
        const proRec = document.getElementById("recipe-nav");
        proRec.innerHTML ="";
    }

}

handleRegButton();