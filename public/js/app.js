const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');
msgOne.textContent = "";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();  //form submit hone pe by default page re render hota hai usko prevent krne ke liye
    const location = search.value;
    msgOne.textContent = "Loading...";
    msgTwo.textContent = "";
    fetch(`/weather?address=${location}`).then( (response)=> {
    response.json().then((data)=>{
        if(data.error){
            msgOne.textContent = data.error;
        } else{
            msgOne.textContent = data.location;
            msgTwo.textContent = data.forecast;
        }
    })
})
})