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

//fetch the most booked tour start...     <a href="package-details.html?destination=${card.destination_id}" target="_blank"  style = "text-decoration:none" >

    function mostBookedTour() {
        let topSelling = document.getElementById("topSelling");

        topSelling.innerHTML = "";
        
        arrTopSellingTrips.forEach((topSellTour) => {
           let topfilteredobj = newTourPackages.find((gb) => gb.tour === topSellTour.top_selling_trip_id);
           let creatediv = document.createElement('div');
            creatediv.classList.add("packages-item");

            creatediv.innerHTML = `<div class="packages-img">
                        <img src="${topfilteredobj.image}" class="img-fluid w-100 rounded-top" alt="Image">
                        <div class="packages-info d-flex border border-start-0 border-end-0 position-absolute"
                            style="width: 100%; bottom: 0; left: 0; z-index: 5;">
                            <small class="flex-fill text-center border-end py-2"><i
                                    class="fa fa-map-marker-alt me-2"></i>Venice - Italy</small>
                            <small class="flex-fill text-center border-end py-2"><i
                                    class="fa fa-calendar-alt me-2"></i>${topfilteredobj.days} days</small>
                            <small class="flex-fill text-center py-2"><i class="fa fa-user me-2"></i>2 Person</small>
                        </div>
                        <div class="packages-price py-2 px-4">${topfilteredobj.price}</div>
                    </div>
                    <div class="packages-content bg-light">
                        <div class="p-4 pb-0">
                            <h5 class="mb-0">${topfilteredobj.title}</h5>
                            <small class="text-uppercase">Hotel Deals</small>
                            <div class="mb-3">
                                <small class="fa fa-star text-primary"></small>
                                <small class="fa fa-star text-primary"></small>
                                <small class="fa fa-star text-primary"></small>
                                <small class="fa fa-star text-primary"></small>
                                <small class="fa fa-star text-primary"></small>
                            </div>
                            <p class="mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt nemo quia
                                quae illum aperiam fugiat voluptatem repellat</p>
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

            topSelling.appendChild(creatediv);
        });
    }


//fetch the most booked tour end...

// function OpenPackageDetails(lkg) {
//     const url = `package-details.html?tour=${lkg.tour}`;
//     window.open(url, '_blank');
// }

//  destinations();

// for index.html page end...
