// Fork this repository in the forkRepo function.
// Display the JSON result in the results div by calling showResults.
//  Read more about forking in the GitHub Forks API documentation.
//   You should only be raising issues on your forked copy of the repository —
//   not on the repo owned by learn-co-curriculum.
//
// In showForkedRepo, display the repo information in the browser by appending html with
// a link to the repository url to the DOM.
//
// Navigate to your forked repository (using the link in your html!)
// and enable Issues by clicking on the Settings tab and checking Issues.
// They will probably be turned off by default, and the next step won't work so well if they are disabled!
//
// Create a new issue for your forked repository with the createIssue function.
// Use the title and body values from the provided form.
// After the issue is created, fetch and display a list of all issues associated
//  with your repository on the page. Append them to a div with an id of "issues".
//  Read more about creating issues via API calls in the GitHub Issues API documentation.
//
// Load it up and watch it work!
let repoGlobal="javascript-fetch-lab";
let ownerGlobal="vsparrow"

function getIssues() {
  // GET /repos/:owner/:repo/issues
  // let owner = "learn-co-curriculum"
  console.log("INSIDE getIssues");
  let owner = ownerGlobal
  let repo = "javascript-fetch-lab"
  let url = 'https://api.github.com' + '/repos/' + owner + "/" + repo + '/issues'
  // console.log(url);
  fetch(url).then(res=>res.json()).then(json=>showIssues(json))
  //
  // <div id="issues"></div>
  // html = document.querySelector("#issues")
  // html.innerHTML =
}

function showIssues(json) {
  console.log("in show issues");
  console.log(json);
  let jsonToHTML="";
  // let test = ""
  json.forEach(function(j){
    // console.log(j);
    // console.log(j["html_url"]);
    // test = j
    jsonToHTML += `<li><a href="${j["html_url"]}">${j["number"]} : ${j["title"]}</a></li>`
  })
  html = document.querySelector("#issues")
  html.innerHTML = jsonToHTML
  // return test
}

function createIssue() {
  console.log("createIssue called");
  // id= title, id =body
  let title = document.querySelector("#title")
  let body = document.querySelector("#body")
  // console.log(title.value + ":" +body.value);
  //get values
  let repo = repoGlobal
  let owner = 'vsparrow'
  let url = 'https://api.github.com' + '/repos/' + owner + '/' + repo +'/issues'
  // console.log(url); //https://api.github.com/repos/vsparrow/javascript-fetch-lab/issues
  //create issue
  // POST /repos/:owner/:repo/issues
  let hashToPass = {'title': title.value, 'body': body.value}
  // console.log(hashToPass);
  fetch(url,{
    // method: 'POST',
    method: 'post',
    headers: { Authorization: `token ${getToken()}`},
    // body: JSON.stringify({'title': 'testtitle', 'body': 'testbody'})//this worked
    body: JSON.stringify(hashToPass)
  }).then(res=>res.json()).then(json=>console.log(json)).then(getIssues())
// }).then(res=>res.json()).then(json=>getIssues(json))//.then(getIssues())
  //clear boxes
  title.value=""
  body.value=""
}
// fetch(url,{
//   method: "POST",
//   headers: {'Contnet-type: 'application/json},
//   body: JSON.strinify({'description': 'test'})
// })
// ,then(res=>res.json())
// .then(json=> console.log(json) )



function showResults(json) {
  console.log(json)
  // console.log(json["html_url"]);
  let forkedRepo = json["html_url"]
  let html = `<div><h3>Fork is now at:</h3><a href="${forkedRepo}">${forkedRepo}</a></div>`
  // <div id="results"></div>
  let results = document.querySelector("#results")
  results.innerHTML=html
  repoGlobal= json["name"]
}

function forkRepo() {   //use fetch to fork it!
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  let url = 'https://api.github.com' + '/repos/' + repo + '/forks'
  console.log(url);
  // POST /repos/:owner/:repo/forks
  let token = getToken()
  fetch(url,{
    // method: 'POST',
    method: 'post',
    headers: {Authorization: `token ${token}`}
  }).then(res=>res.json()).then(json=>showResults(json))

}
// const token = 'YOUR_TOKEN_HERE';
//
// fetch('https://api.github.com/user/repos', {
//   headers: {
//     Authorization: `token ${token}`
//   }
// }).then(res => res.json()).then(json => console.log(json));
function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  // return ''
  return '' //YOUR_TOKEN_HERE
}
///////////
function showForks(){
  // GET /repos/:owner/:repo/forks
  let url = 'https://api.github.com'
  // let owner = 'vsparrow'
  let owner = 'jlord'
  let repo = 'patchwork'
  let resource =  `/repos/${owner}/${repo}/forks`
  fetch(url+resource).then(resp=>resp.json()).then(json=>console.log(json))
}
///////////
function showRepositories(){
  // GET /repos/:owner/:repo/forks
  let url = 'https://api.github.com'
  // let repos = '/repos'
  let repos = '/users/vsparrow/repos' //this worked and got my repos
  // let owner = '/vsparrow'
  fetch(url+repos)
  .then(resp=>resp.json())
  .then(json=>console.log(json))
}
// fetch('https://api.github.com/repos/jquery/jquery/commits')
//   .then(resp => resp.json())
//   .then(json => console.log(json));
//////////////////////
