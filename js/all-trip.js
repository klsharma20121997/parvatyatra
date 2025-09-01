let selectedCategories = [];
let tripCategories = [];
let maxDuration = 15;
let maxBudget = 50000;

// for fetch the category start....
function bindcategorydata() {
    const categories = [...new Set(arrDestinations.map(pkg => { return pkg.destination_id; }))];

    let labelcategory = document.getElementById("labelcategory");

    labelcategory.innerHTML = "";

    categories.forEach(pkl => {
        let destobj = arrDestinations.find(d => d.destination_id === pkl);

        let count = newTourPackages.filter(p => p.destination_id === pkl).length;

        const creatediv = document.createElement('div');
        creatediv.classList.add('labelst');
        creatediv.innerHTML = `<label class="mt-3"><input type="checkbox" value="${pkl}" checked> <label class="ms-1"> ${destobj?.destination_name ?? pkl}</label></label><label class="labelcount mt-3">${count}</label>`;

        labelcategory.appendChild(creatediv);
    })


    document.querySelectorAll('#labelcategory input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            applyFilter();
        });
    });

    fetchPackages();
    applyFilter();
    bindTripType();
}
bindcategorydata();
// for fetch the category end..

// bindtriptype start...
function bindTripType() {
    let tripcategory = [...new Set(arrTripTypes.map(ct => ct.category))];

    let triptype = document.getElementById("triptype");
    triptype.innerHTML = "";

    tripcategory.forEach((trips) => {
        let daytrip = arrTripTypes.find((fp) => fp.category === trips);

        let newtrips = newTourPackages.filter((kl) => kl.category === trips).length;

        let tripdiv = document.createElement('div');
        tripdiv.classList.add("labelst");

        tripdiv.innerHTML = `<label class="mt-3"><input type="checkbox" value="${trips}" checked><label class="ms-2"> ${daytrip?.category_name ?? trips}</label> </label><label class="labelcount">${newtrips}</label>`;

        triptype.appendChild(tripdiv);
    })

    document.querySelectorAll('#triptype input[type="checkbox"]').forEach(bc => {
        bc.addEventListener('change', () => {
            console.log("that is trip ");
            applyFilter();
        });
    });

    applyFilter();
}
// bindTripType();


// bindtriptype end...

// fetch the packages start...
function fetchPackages() {
    let packageTab = document.getElementById("packageTab");
    newTourPackages.forEach(pkg => {
        let pkgdiv = document.createElement('div');
        pkgdiv.classList.add("packages-item", "package_sec", "mb-4");
        pkgdiv.setAttribute("data-category", pkg.destination_id);
        pkgdiv.setAttribute("data-days", pkg.days);
        pkgdiv.setAttribute("data-budget", pkg.budget);
        pkgdiv.setAttribute("trip-category", pkg.category);

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
// fetch the packages end...  

// for give the filter for budget and duration start...

function applyFilter() {
    selectedCategories = Array.from(document.querySelectorAll('#labelcategory input[type="checkbox"]:checked')).map(cb => cb.value);

     tripCategories = Array.from(document.querySelectorAll('#triptype input[type="checkbox"]:checked')).map(bb => bb.value);

    const packageItems = document.querySelectorAll('#packageTab .packages-item');

    packageItems.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const pkgDuration = parseInt(card.getAttribute('data-days'));
        const pkgPrice = parseInt(card.getAttribute('data-budget'));
        const pkgcategory = card.getAttribute('trip-category');

        const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
        const matchDuration = pkgDuration <= maxDuration;
        const matchBudget = pkgPrice <= maxBudget;
        const pfdCategory = tripCategories.length === 0 || tripCategories.includes(pkgcategory);

        if (matchCategory && matchDuration && matchBudget && pfdCategory) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// for give the filter for budget and duration end


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
    Array.from(document.querySelectorAll('#triptype input[type="checkbox"]')).map(bb=>bb.checked=false);
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


