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
        // let result=`<ul>${data.items.map((function(x)=>{
        //   return `
        //     <li>
        //       <h2></h2>
        //     </li>
        //   `
        // }))}
        // </ul>`
    })
  }
}
