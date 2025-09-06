function tourPlaces() {
    let places = document.getElementById('places');
    // places.innerHTML = "";

    arrPlaces.forEach((w) => {
        let creatediv = document.createElement('div');
        creatediv.classList.add("col-md-6","col-lg-4");

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