$(document).ready(function (){
});

function displayError(error){
   $("#errors").html("error")
}

function searchRepositories(){
  const searchTerms=$("#searchTerms").val();
  if(searchTerms){
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`,function(data){
        console.log(JSON.stringify(data))
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

