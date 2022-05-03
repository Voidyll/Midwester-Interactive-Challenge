document.addEventListener('DOMContentLoaded', ()=>{  //get the data for the home page screens information boxes
  fetch('http://localhost:3000/api/home')
  .then((response) => {
           if(response.status === 200){
               console.log("SUCCESS")
               return response.json();
           }else if(response.status === 408){
               console.log("SOMETHING WENT WRONG")
           }
       })
       .then((data) => {
           console.log("DATA STORED")
           renderhtml(data)
       })

  function renderhtml(data) {

  const talkieHeader = document.getElementById('talkie-header');
  const talkieBody = document.getElementById('talkie-body');
  const rabbitHeader = document.getElementById('rabbit-header');
  const rabbitBody = document.getElementById('rabbit-body');
  const shieldHeader = document.getElementById('shield-header');
  const shieldBody = document.getElementById('shield-body');

  console.log(data)

  talkieHeader.innerHTML = `<h2> ${data["data"][0]["title"]}</h2>`
  talkieBody.innerHTML = `<p> ${data["data"][0]["body"]}</p>`
  rabbitHeader.innerHTML = `<h2> ${data["data"][1]["title"]}</h2>`
  rabbitBody.innerHTML = `<p> ${data["data"][1]["body"]}</p>`
  shieldHeader.innerHTML = `<h2> ${data["data"][2]["title"]}</h2>`
  shieldBody.innerHTML = `<p> ${data["data"][2]["body"]}</p>`
}
})


var done = false;

function duplicate() {
  if (done === false) {
    var node, list, arrValue;

     list = [];
     for (node = document.getElementById('array1').firstChild; //add the first list to the array
         node;
         node = node.nextSibling) {
         if (node.nodeType == 1 && node.tagName == 'LI') {
             list.push(node.innerHTML);
         }
     }

     for (node = document.getElementById('array2').firstChild; //add the second list to the array
         node;
         node = node.nextSibling) {
         if (node.nodeType == 1 && node.tagName == 'LI') {
             list.push(node.innerHTML);
         }
     }

     array = [];
     for (var i = 0; i < list.length; ++i) { //finds the duplicate names in the array
       var check = list[i];

       if (array.includes(check)) {
         console.log("dupe")
       } else {
          array.push(list[i])
       }
     }

     for (var i = 0; i < array.length; ++i) {       // appends the array into the DOM
       const item = document.createElement("li");
       item.innerText = array[i];
       document.getElementById("duplicates").appendChild(item);
     }

  console.log(list)
  console.log(array);
  done = true;

  document.getElementById('duplicates').style.display = "initial";
} else {
  alert("You have already performed this task")
}
}
