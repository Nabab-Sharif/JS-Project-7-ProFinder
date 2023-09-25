
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
  console.log(profile)
})
//..........................Get Information from API End Here..................................



