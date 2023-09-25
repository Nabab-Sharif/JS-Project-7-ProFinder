
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

  if (username.length > 0) {

    //Show Loaders
    document.querySelector('.loader').style.display = 'block';
    document.querySelector('.user-details').style.display = 'none'
    document.querySelector('.notFound').style.display = 'none';
    const profile = await getUser(username);
    document.querySelector('.loader').style.display = 'none';


    //Handling Errors & Wrap Up!
    if (profile.message === 'Not Found') {
      document.querySelector('.notFound').style.display = 'block';
    } else {
      const repos = await getRepos(profile)
      document.querySelector('.user-details').style.display = 'flex'
      showProfile(profile)
      showRepos(repos)
    }

    //Form Reset
    document.querySelector('#findByUsername').value = '';

  }


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






//..........................Show Repositories Start Here..................................


async function getRepos(profile) {
  const res = await fetch(`${profile.repos_url}?client_id=${Client_ID}&client_secret=${Client_secrets}&per_page=10`)

  const repo = await res.json();
  return repo;
}



function showRepos(repos) {

  let newHtml = '';

  for (let repo of repos) {
    newHtml += `
    <div class="repo">
          <div class="repo_name">
            <a href="${repo.html_url}">${repo.name}</a>
          </div>
          <p>
            <span class="circle"></span> ${repo.language}
            <ion-icon name="star-outline"></ion-icon> ${repo.watchers}
            <ion-icon name="git-branch-outline"></ion-icon> ${repo.forks_count}
          </p>
    </div>
    
  `
  }

  document.querySelector('.repos').innerHTML = newHtml;

}

//..........................Show Repositories End Here..................................






//..........................Show Loaders, Handling Errors & Wrap Up! Start Here............................




//..........................Show Loaders, Handling Errors & Wrap Up! End Here..............................
