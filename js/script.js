// let menu = document.querySelector('#menu-bar');
// let navbar = document.querySelector('.navbar');

// window.onscroll = () =>{
//     menu.classList.remove('fa-times');
//     navbar.classList.remove('active');
// }

// menu.addEventListener('click', () =>{
//     menu.classList.toggle('fa-times');
//     navbar.classList.toggle('active');
// });

// let bookForm = document.getElementById("BookInquiryForm"); 
// bookForm.addEventListener("submit", handleSubmit);
// function handleSubmit(e) {
//     e.preventDefault();
//     let placeName = document.getElementById("txtPlaceName").value;
//     let guesCount = document.getElementById("txtGuestCount").value;
//     let dtArrival = document.getElementById("dtArrival").value;
//     let dtLeaving = document.getElementById("dtLeaving").value;
//     let txtName = document.getElementById("txtName").value;
//     let msg = 'Hi ParvatYatra Team,Please find my trip plan - Name : '+txtName+', '+
//     'Place : '+placeName+', Number of guests : '+guesCount+', Arrivals : '+dtArrival+', Leaving : '+dtLeaving+'';
//     let sendWAMessage = 'https://wa.me/918295744218?text='+encodeURI(msg);
//     window.open(sendWAMessage);
//   }
//   function knowMore(packageName) {
//     let msg = 'Hello, I need more information about '+packageName+' trip.!!';
//     let sendWAMessage = 'https://wa.me/918295744218?text='+encodeURI(msg);
//     window.open(sendWAMessage);
//   }

  function ItineraryAndBookNow(packageName,isItineary) {
    let endMsg = '';
    if(isItineary)
    {
      endMsg = 'Could you please send me the full itinerary?';
    }
    else
    {
      endMsg = 'Please guide me through the booking process.';
    }
    let msg = `Hi, I'm interested in the `+packageName+` tour. ` + endMsg;
    let sendWAMessage = 'https://wa.me/918295744218?text='+encodeURI(msg);
    window.open(sendWAMessage);
  }

  function FetchPackages(selectedCategory = null)
  {
    const container = document.getElementById('packageContainer');
    container.innerHTML = "";
    let newTourPackages = [];
    if(selectedCategory != null && selectedCategory != "All"){
      newTourPackages = tourPackages.filter(pkg => pkg.category.replace(/\s+/g, "_") === selectedCategory);
    }
    else
    {
      newTourPackages = tourPackages;
    }
    newTourPackages.forEach(pkg => {
      const box = document.createElement('div');
      box.classList.add('box');

         // for click on single package exclude knowmore botton
         box.onclick = function (e) {
          // Prevent click from 'know more' from bubbling
          if (!e.target.classList.contains('btn')) {
            OpenPackageDetails(pkg);
          }
        };

        // for click on single package exclude knowmore botton close

      box.innerHTML = `
        <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
        <div class="content">
          <div class="package-meta">
                  <span><i class="fas fa-clock"></i> ${pkg.duration}</span>
                  <span><i class="fas fa-users"></i> Group</span>
          </div>
          <h3><i class="fas fa-map-marker-alt"></i> ${pkg.title}</h3>
          <div class="price">${pkg.price} <span>${pkg.old_price}</span></div>
          <p>Multiple Departures Every Month</p>
          <a href="#" onclick="knowMore('${pkg.title}'); return false;" class="btn">know more</a>
        </div>
      `;
      container.appendChild(box);
    });
  }

  function FetchRelatedPackages(selectedCategory)
  {
    const newTourPackages = tourPackages.filter(pkg => pkg.category.replace(/\s+/g, "_") === selectedCategory);
    const container = document.getElementById('relatedPackageContainer');
    newTourPackages.forEach(pkg => {
      const box = document.createElement('div');
      box.classList.add('box');
      // for click on single package exclude knowmore botton
      box.onclick = function (e) {
        // Prevent click from 'know more' from bubbling
        if (!e.target.classList.contains('btn')) {
          OpenPackageDetails(pkg);
        }
      };
      box.innerHTML = `
        <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
        <div class="content">
          <div class="package-meta">
                  <span><i class="fas fa-clock"></i> ${pkg.duration}</span>
                  <span><i class="fas fa-users"></i> Group</span>
          </div>
          <h3><i class="fas fa-map-marker-alt"></i> ${pkg.title}</h3>
          <div class="price">${pkg.price} <span>${pkg.old_price}</span></div>
          <p>Multiple Departures Every Month</p>
          <a href="#" onclick="knowMore('${pkg.title}'); return false;" class="btn">know more</a>
        </div>
      `;
      container.appendChild(box);
    });
  }

  function filterPackages(category) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));

    event.target.classList.add('active');

    // Filter your packages here based on category
    FetchPackages(category);
}

function OpenPackageDetails(pkg)
{
    const url = `package-details.html?tour=${pkg.tour}`;
    window.open(url, '_blank');
}

function BindCategories()
{
  //const categories = ["All", "USA", "Canada", "Europe", "China", "Singapore"];
  const categories = ["All", ...new Set(tourPackages.map(pkg => pkg.category))];

  const tabButtonsContainer = document.getElementById("tabButtonsContainer");

  categories.forEach((category, index) => {
    const btn = document.createElement("button");
    btn.classList.add("tab-btn");
    if (index === 0) btn.classList.add("active"); // Set 'All' as active by default
    btn.setAttribute("onclick", `filterPackages('${category.replace(/\s+/g, "_")}')`);
    btn.textContent = category;
    tabButtonsContainer.appendChild(btn);
  });
}