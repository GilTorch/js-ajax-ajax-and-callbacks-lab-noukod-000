$(document).ready(function (){
});

function displayError(error){
   $("#errors").html("error")
}

function searchRepositories(){
  const searchTerms=$("#searchTerms").val();
  if(searchTerms){
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`,function(data){
        // console.log(JSON.stringify(data))
        let result=`<ul>${data.items.map((function(item){
          return `
            <li>
              <div>
                <img width="100" height="100" src="${item.owner.avatar_url}"/>
              </div>
              <h2><a href="${item.url}">${item.owner.login}</a>/${item.name}</h2>
              <p>${item.description}</p>
              <a href="#" data-username="${item.owner.login}" data-repository="${item.name}" onclick="getCommits(this)">Show Commits</a>
            </li>
          `
        }))}.fail(displayError)
        </ul>`;
        $("#results").html(result);
    })
  }
}

function getCommits(element){
  const repo=element.dataset.repository;
  const owner=element.dataset.username;

  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`,showCommits).fail(displayError);

}

function showCommits(data){
  //list the SHA, the author, the author's login, and the author's avatar as an image.
  const newData=Array.prototype.slice.call(data);
  console.log(newData)l
  let result=`<ul>${Array.prototype.slice.call(data).map((function(commit){
    return `
      <li>
        <h3>SHA:${commit.sha}</h3>
        <div>
          <img width="100" height="100" src="${commit.author.avatar_url}"/>
        </div>
        <h3>AUTHOR:${commit.author.login}</h3>
      </li>
    `
  }))}.fail(displayError)
  </ul>`;
  $("#details").html(result);

}
