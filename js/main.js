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
    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > 45) {
    //         $('.navbar').addClass('sticky-top shadow-sm');
    //     } else {
    //         $('.navbar').removeClass('sticky-top shadow-sm');
    //     }
    // });


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


// for index.html page start....
//fetch the destination start... 
function destinations() {
    let destinationmain = document.getElementById("destinationmain");

    arrDestinations.forEach(card => {
        let carddiv = document.createElement('div');
        carddiv.classList.add("col-md-6", "col-lg-4");

        carddiv.innerHTML = ` <div class="national-item">
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
                                    </div>`;

        carddiv.querySelector(".national-item").addEventListener('click', () => {
            let url = `all-trip.html?destination=${card.destination_id}`;
            window.open(url, "_blank");
        })

        destinationmain.appendChild(carddiv);
    })
}
//fetch the destination end...

// for index.html page end...
