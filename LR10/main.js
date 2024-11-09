var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

var btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
for (let i = 1; i <= 5; i++) {
  let newImage = document.createElement('img');
  newImage.setAttribute('src', `images/pic${i}.jpg`);
  thumbBar.appendChild(newImage);

  // Adding onclick event to each thumbnail
  newImage.onclick = function (e) {
    displayedImage.setAttribute('src', e.target.getAttribute('src'));
  };
}

/* Wiring up the Darken/Lighten button */
btn.onclick = function () {
  let currentClass = btn.getAttribute('class');
  if (currentClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darker';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
};
