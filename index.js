showNotes();

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addNotes);

function addNotes(){
  //select title box and note box
  let titleBox = document.getElementById("title");
  let noteBox = document.getElementById("note"); 

  //if it is empty then show alert massage
  if(titleBox.value=="" || noteBox.value==""){
    let alert = document.getElementById("alert");

    alert.innerHTML+= `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Carefull!! </strong>Please first add Your notes!!!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  }else{ 
    let notesObj = {
      title : titleBox.value,
      note : noteBox.value
    }
  
  //check localstorage notes parameter
    let notes = localStorage.getItem("notes"); //we get json 
    // console.log(notes)
    
    if(notes==null){
      arr = []; //if not make empty array
    }else{
      arr = JSON.parse(notes) //parse json and convert to js array
    }
  
   arr.push(notesObj) //object push karre into array 
  localStorage.setItem("notes",JSON.stringify(arr)); //set this array into localstorage as value
  
  //empty title and note box
  titleBox.value =""; 
  noteBox.value ="";
  
  showNotes();

  }

}

function showNotes(){
  let notes = localStorage.getItem("notes");//string type
  
  if(notes == null){
    arr = [];
  }else{
    arr = JSON.parse(notes); //object 
  }
  
  // console.log(arr.length)
  let html = "";

  arr.forEach(function(ele,index){
    html+=`<div class="col noteCard">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${ele.title}</h5>
        <p class="card-text">${ele.note}</p>
        <a href="#" id="${index}" class="btn btn-primary" onclick="delNotes(this.id)">Delete</a>
      </div>
    </div>
  </div>`;

})
let cards = document.getElementById("notes");
  if(arr.length!=0){
    cards.innerHTML=html;
  }else{
    cards.innerHTML= `<h3 class="text-danger">There is no notes ....!!!</h3>`;
  }

}

function delNotes(index){
  let notes = localStorage.getItem("notes");
  if(notes==null){
    arr=[];
  }else{
    arr = JSON.parse(notes);
  }

  arr.splice(index,1);
  localStorage.setItem("notes",JSON.stringify(arr))

  showNotes();
}

let searchBox = document.getElementById("search");

searchBox.oninput = function(){
 let searchText = searchBox.value.toLowerCase();
let allCards = document.getElementsByClassName("noteCard"); //array returns of same class

Array.from(allCards).forEach(function(ele){
  // console.log(ele)
  
 let allHeads = ele.getElementsByTagName("h5")[0].innerHTML;

 if(allHeads.includes(searchText)){
  ele.style.display = "block";
 }else{
  ele.style.display = "none";
 }
 console.log(allHeads)

})
 
}