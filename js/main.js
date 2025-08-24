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
    spinner(0);


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // International Tour carousel
    $(".InternationalTour-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: false,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });


    // packages carousel
    $(".packages-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
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
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

})(jQuery);



//all-trip page start..

//for slider start..
let inputvalue = document.getElementById("inputslide");
let slidedisplay = document.getElementById("sliderValue");

inputvalue.addEventListener('input', function () {
    slidedisplay.innerText = `${this.value} day${this.value == 1 ? '' : 's'}`;
})
//for slider end..

// for fetch the category start....
function bindcategorydata() {
    const categories = [...new Set(tourPackages.map(pkg => { return pkg.category; }))];


    let labelcategory = document.getElementById("labelcategory");
    let arrcount = tourPackages.map(pkg => { return pkg.category; });

    categories.forEach(pkl => {
        let count = arrcount.filter(el => el === pkl).length;
        const creatediv = document.createElement('div');
        creatediv.classList.add('labelst');
        creatediv.innerHTML = `<label class="mt-3"><input type="checkbox" onchange="changeCategory()" checked> <label class="ms-1"> ${pkl}</label></label><label class="labelcount mt-3">${count}</label>`;

        labelcategory.appendChild(creatediv);
    })

     
    document.querySelectorAll('#labelcategory input[type="checkbox"]').forEach(cb=>{
        cb.addEventListener('change', changeCategory);
    })

   

    fetchPackages();
    setTimeout( () =>{
     changeCategory();
   },5000);
}
bindcategorydata();
// for fetch the category end...

function changeCategory() {
    const checkedCategories = Array.from(document.querySelectorAll('#labelcategory input[type="checkbox"]:checked')).map(cb => { return cb.closest('label').textContent.trim() });

    console.log(checkedCategories);

    const packageItems = document.querySelectorAll('#packageTab .packages-item');

    packageItems.forEach(card => {
        const cardcategory = card.getAttribute('data-category');

        if (checkedCategories.length === 0 || checkedCategories.includes(cardcategory)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    })
}

// fetch the packages start...
function fetchPackages() {
    let packageTab = document.getElementById("packageTab");
    tourPackages.forEach(pkg => {
        let pkgdiv = document.createElement('div');
        pkgdiv.classList.add("packages-item", "package_sec", "mb-4");
        pkgdiv.setAttribute("data-category", pkg.category);

        pkgdiv.innerHTML = `<div class="packages-img">
                    <img src="${pkg.image}" class="img-fluid w-100 rounded-top" alt="${pkg.alt}">
                    <div class="packages-info d-flex border border-start-0 border-end-0 position-absolute"
                        style="width: 100%; bottom: 0; left: 0; z-index: 5;">
                        <small class="flex-fill text-center border-end py-2"><i class="fa fa-calendar-alt me-2"></i> ${pkg.duration}</small>
                        <small class="flex-fill text-center py-2"><i class="fa fa-users me-2"></i>Group</small>
                    </div>
                    <div class="packages-price py-2 px-4">
                        <span class="fw-bold">${pkg.price}</span>
                        <span class="text-light text-decoration-line-through me-2">${pkg.old_price}</span>
                    </div>
                </div>
                <div class="packages-content bg-white">
                    <div class="p-4 pb-0">
                        <h5 class="mb-0">${pkg.title}</h5>
                        <br>
                        <p class="mb-4"><i class="fa fa-calendar-alt me-2"></i>Multiple Departures Every Month</p>
                    </div>
                    <div class="row bg-primary rounded-bottom mx-0">
                        <div class="col-6 text-start px-0">
                            <a href="#" class="btn-hover btn text-white py-2 px-4">Read More</a>
                        </div>
                        <div class="col-6 text-end px-0">
                            <a href="#" class="btn-hover btn text-white py-2 px-4">Book Now</a>
                        </div>
                    </div>
                </div>`;
        packageTab.appendChild(pkgdiv);
    })
}
// fetch the packages end...

//all-trip page end..