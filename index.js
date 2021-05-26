let images = [
  {
    "id": 1,
    "mame": "Cat and hand",
    "image": "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8"
  },
  {
    "id": 2,
    "name": "Cat and port",
    "image": "https://images.unsplash.com/photo-1493406300581-484b937cdc41"
  },
  {
    "id": 3,
    "name": "Cat on the field",
    "image": "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0"
  },
  {
    "id": 4,
    "name": "Cat and mirror",
    "image": "https://images.unsplash.com/photo-1594142404563-64cccaf5a10f"
  },
  {
    "id": 5,
    "name": "Sleeping Cat",
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55"
  }
];

// load images
const sliderContainer = document.querySelector(".slider-container");
let currentImgId;
let nextImgId;
let previousImgId;
const markerContainer = document.querySelector(".marker-container");

images.forEach(img => {
  const imgBox = document.createElement("div");
  imgBox.classList.add("image-box");
  if (img.id === 1) {
    imgBox.classList.add("current");
    imgBox.style.display = "block";
  } else if (img.id === images.length) {
    imgBox.classList.add("left");
  } else {
    imgBox.classList.add("right");
  };
  imgBox.id = img.id;
  imgBox.style.backgroundImage = `url("${ img.image}")`;
  sliderContainer.appendChild(imgBox);
  currentImgId = 1;
  nextImgId = 2;
  previousImgId = images.length;

  // Load dot
  let marker = document.createElement("div");
  marker.classList.add("marker");
  marker.id = `marker${img.id}`;
  markerContainer.appendChild(marker);
  changeMarker();
});

const leftBtn = document.querySelector(".btn-left");
const rightBtn = document.querySelector(".btn-right");
const allImgs = document.querySelectorAll(".image-box");
let imageShifted = false;

// Shift images every 5 seconds
setInterval(() => {
  if(imageShifted) {
    setTimeout(() => {
      imageShifted = false;
      shiftToLeft();
    }, 8500);
  } else {
    shiftToLeft();
  }
}, 7000);

// Click the right
leftBtn.addEventListener("click", () => {
  shiftToRight();
  imageShifted = true;
});


// Click the left btn
rightBtn.addEventListener("click", () => {
  shiftToLeft();
  imageShifted = true;
});

// Function to shif photo to left
function shiftToLeft() {
  // Shift shown image to left
  let newPreviousImg = document.getElementById(currentImgId);
  newPreviousImg.classList.remove("current");
  newPreviousImg.classList.add("left");

  // Bring previous image to right
  let oldPreviousImg = document.getElementById(previousImgId);
  oldPreviousImg.classList.add("right");
  oldPreviousImg.classList.remove("left");

  // Show the next image
  let newCurrentImg = document.getElementById(nextImgId);
  newCurrentImg.classList.remove("right");
  newCurrentImg.classList.add("current");

  // Set the new next image
  let newNextImgId;
  if (nextImgId == images.length) {
    newNextImgId = 1;
  } else {
    newNextImgId = parseInt(nextImgId) + 1;
  };

  let allRightImgs = document.querySelectorAll(".right");
  let allLeftImgs = document.querySelectorAll(".left");
  if(allRightImgs.length === 0) {
    allLeftImgs.forEach(img => {
      img.classList.remove("left");
      img.classList.add("right");
    });
  };

  // Update ids
  previousImgId = newPreviousImg.id;
  currentImgId = newCurrentImg.id;
  nextImgId = newNextImgId;

  console.log(`Previous is ${previousImgId}. Current is ${currentImgId}, and next is ${nextImgId}`);

  // Update markers
  changeMarker();
};

// Function to shift photo to right
function shiftToRight() {
  // Shift shown image to right
  let newPreviousImg = document.getElementById(currentImgId);
  newPreviousImg.classList.remove("current");
  newPreviousImg.classList.add("right");

  // Bring the last image in right side to left. assign previous img
  let oldLastRightImg;
  let oldLastRightImgId;
  if (previousImgId == 1) {
    console.log(images.length);
    oldLastRightImgId = images.length;
  } else {
    oldLastRightImgId = previousImgId - 1;
  };
  oldLastRightImg = document.getElementById(oldLastRightImgId);
  oldLastRightImg.classList.remove("right");
  oldLastRightImg.classList.add("left");

  // Show the previous image
  let newCurrentImg = document.getElementById(previousImgId);

  newCurrentImg.classList.remove("left");
  newCurrentImg.classList.add("current");

  // Set the new previous image
  let newNextImgId = currentImgId;

  // Update ids
  previousImgId = oldLastRightImg.id;
  currentImgId = newCurrentImg.id;
  nextImgId = newNextImgId;
  changeMarker();
};

// Change current photo on marker click
const allMarkers = document.querySelectorAll(".marker");
allMarkers.forEach(marker => {
  let markerId = marker.id;
  marker.addEventListener("click", () => {
    allImgs.forEach(img => {
      // Set images in right position
      if(markerId == `marker${img.id}`) {
        img.classList.add("current");
        img.classList.remove("left");
        img.classList.remove("right");
        currentImgId = img.id;
        if(img.id == 5) {
          nextImgId = 1;
        } else {
          nextImgId = parseInt(img.id) + 1;
        };
        if(img.id == 1) {
          previousImgId = 5;
        } else {
          previousImgId = parseInt(img.id) - 1;
        };
        // if the image is before the clicked one, set it to left
      } else if (markerId ==`marker${img.id + 1}` || (markerId == "marker1" && img.id == 5)) {
        img.classList.add("left");
        img.classList.remove("current");
        img.classList.remove("right");
      } else {
        img.classList.add("right");
        img.classList.remove("current");
        img.classList.remove("left");
      };
    });
    changeMarker();
  });
});

// Function to change marker color
function changeMarker() {
  let markers = document.querySelectorAll(".marker");
  markers.forEach(marker => {
    if (marker.id === `marker${currentImgId}`) {
      marker.classList.add("current-marker");
    } else {
      marker.classList.remove("current-marker");
    };
  })
};