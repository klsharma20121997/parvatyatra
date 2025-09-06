function tourPlaces() {
    let places = document.getElementById('places');
    places.innerHTML = "";

    arrPlaces.forEach((w) => {
        let creatediv = document.createElement('div');
        creatediv.classList.add("col-md-6", "col-lg-4");

        creatediv.innerHTML = `<div class="national-item">
                                    <img src="${w.tour_image}" class="img-fluid w-100 rounded" alt="Image">
                                    <div class="national-content">
                                        <div class="national-info">
                                            <h5 class="text-white text-uppercase mb-2">${w.tour_places}</h5>
                                        </div>
                                    </div>
                                    <div class="national-plus-icon">
                                        <a href="#" class="my-auto"><i class="fas fa-link fa-2x text-white"></i></a>
                                    </div>
                                </div>`;

        places.appendChild(creatediv);
    })
}
tourPlaces();

function CustomerGallery() {
    let customergallery = document.getElementById('customer_gallery');
    customergallery.innerHTML = "";

    customerGallery.forEach((gallery) => {
        let creatediv = document.createElement('div');
        creatediv.classList.add("international-item");

        creatediv.innerHTML = ` <img src="${gallery.image}" class="img-fluid w-100 rounded" alt="Image">
                                <div class="international-content">
                                    <div class="international-info">
                                        <h5 class="text-white text-uppercase mb-2"></h5>
                                    </div>
                                </div>
                                <div class="tour-offer bg-success">30% Off</div>
                                <div class="international-plus-icon">
                                    <a href="#" class="my-auto"><i class="fas fa-link fa-2x text-white"></i></a>
                                </div>`;

           customergallery.appendChild(creatediv);

    })
}

CustomerGallery();