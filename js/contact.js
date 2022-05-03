document.addEventListener('DOMContentLoaded', ()=>{  //get the data for the contact page screens information boxes
  fetch('http://localhost:3000/api/contact')
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

  const contactHeader = document.getElementById('contact-header');
  const contactBody = document.getElementById('contact-body');

  console.log(data)

  contactHeader.innerHTML = `<h1><u> ${data["data"][0]["title"]} </u></h1>`
  contactBody.innerHTML = `<p> ${data["data"][0]["body"]}</p>`
}
})


const thisForm = document.getElementById('contact-form');         //post contact form to api
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(thisForm).entries()
    const response = await fetch('http://localhost:3000/api/contact/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    });

    const result = await response.json();
    console.log(result)
    const text = JSON.stringify(result);

    document.getElementById('submission-text').innerHTML = JSON.parse(text);
    document.getElementById('submission-message').style.visibility = "visible";
    document.getElementById('submission-parent').style.visibility = "visible";
    document.getElementById('title').value = "";
    document.getElementById('message').value = "";
    document.getElementById('email-input').value = "";
});

document.getElementById("submission-close").addEventListener("click", function(e) { //close the pop up
  document.getElementById('submission-message').style.visibility = "hidden";
  document.getElementById('submission-parent').style.visibility = "hidden";
});
