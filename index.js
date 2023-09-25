
//..........................Get Information from API Start Here.................................
const Client_ID = '142feb673405c7f18ccf';
const Client_secrets = 'cbea4541de317b4e9fcccd2e624812c6640c46a7';


async function getUser(name) {
  const res = await fetch(`https://api.github.com/users/${name}?client_id=${Client_ID}&client_secret=${Client_secrets}`);
  const profile = await res.json();

  return profile;

}



document.querySelector('#search').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.querySelector('#findByUsername').value;
  const profile = await getUser(username);

  showProfile(profile)
})
//..........................Get Information from API End Here..................................






//..........................Search & Show Start Here..................................

function showProfile(profile) {
  document.querySelector('.profile').innerHTML = `
  <img src="${profile.avatar_url}"
  alt="${profile.name}" />
  <p class="name">${profile.name}</p>
  <p class="username login">${profile.login}</p>
  <p class="bio">
   ${profile.bio}</p>

  <div class="followers-stars">
    <p>
      <ion-icon name="people-outline"></ion-icon>
      <span class="followers"> ${profile.followers} </span> followers
    </p>
    <span class="dot">·</span>
    <p><span class="following"> ${profile.following} </span> following</p>
  </div>

  <p class="company">
    <ion-icon name="business-outline"></ion-icon>
    ${profile.company}
  </p>
  <p class="location">
    <ion-icon name="location-outline"></ion-icon>${profile.location}
  </p>
  `
}

//..........................Search & Show End Here..................................