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
// let inputvalue = document.getElementById("inputslide");
// let slidedisplay = document.getElementById("sliderValue");

// inputvalue.addEventListener('input', function () {
//     slidedisplay.innerText = `${this.value} day${this.value == 1 ? '' : 's'}`;
// })
//for slider end..

let selectedCategories = [];
let maxDuration = 15;
let maxBudget = 50000;

// for fetch the category start....
function bindcategorydata() {
    const categories = [...new Set(newTourPackages.map(pkg => { return pkg.category; }))];     //newTourPackages


    let labelcategory = document.getElementById("labelcategory");
    let arrcount = newTourPackages.map(pkg => { return pkg.category; });                       //newTourPackages

    categories.forEach(pkl => {
        let count = arrcount.filter(el => el === pkl).length;
        const creatediv = document.createElement('div');
        creatediv.classList.add('labelst');
        creatediv.innerHTML = `<label class="mt-3"><input type="checkbox" onchange="changeCategory()"> <label class="ms-1"> ${pkl}</label></label><label class="labelcount mt-3">${count}</label>`;

        labelcategory.appendChild(creatediv);
    })


    document.querySelectorAll('#labelcategory input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', handlecheck);
    });


    function handlecheck() {
        changeCategory();
        applyFilter();
    }

    fetchPackages();


}
// bindcategorydata();
// for fetch the category end..

function groupFunForAllTrip() {
    document.getElementById('inputslide').addEventListener('input', function () {
        maxDuration = this.value;
        console.log(maxDuration);
        document.getElementById("sliderValue").innerText = `${maxDuration} day${maxDuration === 1 ? '' : 's'}`;
        applyFilter();
    })

    document.getElementById('budgetslide').addEventListener('input', function () {
        maxBudget = parseInt(this.value);
        let getmaxBudget = parseInt(maxBudget / 1000);
        console.log(maxBudget);
        document.getElementById('budgetValue').innerText = `${getmaxBudget} K`;
        applyFilter();
    })

    // for clear all button
    document.querySelector('.clearall').addEventListener('click', function () {
        selectedCategories = [];
        maxDuration = 15;
        maxBudget = 50000;

        document.getElementById('sliderValue').innerText = "15 days";
        document.getElementById('inputslide').value = 15;

        document.getElementById('budgetValue').innerText = "50000 k";
        document.getElementById('budgetslide').value = 50000;

        Array.from(document.querySelectorAll('#labelcategory input[type="checkbox"]')).map(cb => cb.checked = false);
        applyFilter();
    })

    // for moving the side bar dropdown smooth start...

    document.querySelectorAll("details").forEach((detail) => {
        const summary = detail.querySelector("summary");
        const content = detail.querySelector(".dropdown-content");

        // 1. Set initial max-height if details is open
        if (detail.hasAttribute("open")) {
            content.style.maxHeight = content.scrollHeight + "px";
        }

        summary.addEventListener("click", function (e) {
            e.preventDefault();

            // If open, collapse it smoothly
            if (detail.hasAttribute("open")) {
                const sectionHeight = content.scrollHeight;
                content.style.maxHeight = sectionHeight + "px";

                requestAnimationFrame(() => {
                    content.style.maxHeight = "0";
                });

                // Rotate arrow immediately
                detail.classList.remove("open-transition");

                setTimeout(() => {
                    detail.removeAttribute("open");
                    content.style.maxHeight = null;
                }, 400); // Match your transition duration
            } else {
                // If closed, open it smoothly
                detail.setAttribute("open", "");
                detail.classList.add("open-transition");

                const sectionHeight = content.scrollHeight;
                content.style.maxHeight = "0";

                requestAnimationFrame(() => {
                    content.style.maxHeight = sectionHeight + "px";
                });

                setTimeout(() => {
                    content.style.maxHeight = "none";
                }, 400);
            }
        });
    });
    // for moving the side bar dropdown smooth end...
}

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
    newTourPackages.forEach(pkg => {
        let pkgdiv = document.createElement('div');
        pkgdiv.classList.add("packages-item", "package_sec", "mb-4");
        pkgdiv.setAttribute("data-category", pkg.category);
        pkgdiv.setAttribute("data-days", pkg.days);
        pkgdiv.setAttribute("data-budget", pkg.budget);

        pkgdiv.innerHTML = `<div class="packages-img">
                    <img src="${pkg.image}" class="img-fluid rounded-top" alt="${pkg.alt}">
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
                            <a class="btn-hover btn text-white py-2 px-4" href="package-details.html?tour=${pkg.tour}" >Read More</a>
                        </div>
                        <div class="col-6 text-end px-0">
                            <a href="#" class="btn-hover btn text-white py-2 px-4">Book Now</a>
                        </div>
                    </div>
                </div>`;
        packageTab.appendChild(pkgdiv);
    })
}
// fetch the packages end...   onclick="OpenPackageDetails('${pkg}')"

// for give the filter for budget and duration start...

function applyFilter() {
    selectedCategories = Array.from(document.querySelectorAll('#labelcategory input[type="checkbox"]:checked')).map(cb => { return cb.closest('label').textContent.trim() });

    const packageItems = document.querySelectorAll('#packageTab .packages-item');

    packageItems.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const pkgDuration = parseInt(card.getAttribute('data-days'));
        const pkgPrice = parseInt(card.getAttribute('data-budget'));

        const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
        const matchDuration = pkgDuration <= maxDuration;
        const matchBudget = pkgPrice <= maxBudget;

        if (matchCategory && matchDuration && matchBudget) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// for give the filter for budget and duration start end

// for index.html page start....
function destinations() {
    let destinationmain = document.getElementById("destinationmain");

    arrDestinations.forEach(card => {
        let carddiv = document.createElement('div');
        carddiv.classList.add("col-md-6", "col-lg-4");

        carddiv.innerHTML = `<a href="package-details.html?destination=${card.destination_id}" target="_blank"
                                    style="text-decoration:none">
                                    <div class="national-item">
                                        <img src="${card.image}" class="img-fluid w-100 rounded" "${card.alt}">
                                        <div class="national-content">
                                            <div class="national-info">
                                                <h5 class="text-white text-uppercase mb-2">${card.destination_name}</h5>
                                                <span class="btn-hover text-white">View All Packages <i
                                                        class="fa fa-arrow-right ms-2"></i></span>
                                            </div>
                                        </div>
                                        <div class="national-plus-icon">
                                            <span class="my-auto"><i class="fas fa-link fa-2x text-white"></i></span>
                                        </div>
                                    </div>
                                </a>`;

        destinationmain.appendChild(carddiv);
    })
}

// function OpenPackageDetails(lkg) {
//     const url = `package-details.html?tour=${lkg.tour}`;
//     window.open(url, '_blank');
// }

//  destinations();

// for index.html page end...

//all-trip page end..