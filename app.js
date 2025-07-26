const profileDiv = document.getElementById('profile');
const getProfileBtn = document.getElementById('getProfile');
const loader = document.getElementById('loader');

function getRandomBio() {
    const bios = [
        "Explorer | Dreamer | Coffee addict",
        "Sharing my journey ☀️",
        "Living life one photo at a time",
        "Capturing everyday moments",
        "In pursuit of happiness 🌈",
        "Aspiring creator, laughter guaranteed",
        "Travel. Create. Inspire.",
        "Storyteller through pixel and prose"
    ];
    return bios[Math.floor(Math.random() * bios.length)];
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getGalleryImages(count) {
    // Use random unsplash pics
    return Array.from({length: count}, () =>
        `https://source.unsplash.com/random/150x150?sig=${Math.floor(Math.random()*10000)}`
    );
}
async function loadProfile() {
    profileDiv.innerHTML = "";
    loader.style.display = "block";
    const resp = await fetch('https://randomuser.me/api/');
    const data = await resp.json();
    loader.style.display = "none";
    const user = data.results[0];
    const username = user.login.username;
    const bio = getRandomBio();
    const followers = getRandomInt(1000, 100000);
    const following = getRandomInt(50, 1500);
    const posts = getRandomInt(5, 42);
    const gallery = getGalleryImages(6);
    profileDiv.innerHTML = `
      <div class="insta-profile">
        <img class="insta-avatar" src="${user.picture.large}" alt="avatar">
        <div class="insta-username">@${username}</div>
        <div class="insta-bio">${bio}</div>
        <div class="meta">
            <div class="meta-item"><div class="meta-number">${posts}</div><div class="meta-title">Posts</div></div>
            <div class="meta-item"><div class="meta-number">${followers.toLocaleString()}</div><div class="meta-title">Followers</div></div>
            <div class="meta-item"><div class="meta-number">${following}</div><div class="meta-title">Following</div></div>
        </div>
        <div class="gallery">
            ${gallery.map(img => `<img src="${img}" alt="post">`).join("")}
        </div>
        <div style="margin-top:11px; font-size:0.98rem; color:#444;">
          ${user.name.first} ${user.name.last} • ${user.location.city}, ${user.location.country}
        </div>
      </div>
    `;
}
getProfileBtn.addEventListener('click', loadProfile);
