
//declaration
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let count = document.getElementById('count');
let email = document.getElementById('email');
let birthday = document.getElementById('birthday');
let vnummer = document.getElementById('vnummer');
let roomNumber = document.getElementById('roomnumber');
let create = document.getElementById('submit');
let deleteAllStorage = document.getElementById('deleteAllStorage');
let inputSearchName = document.getElementById('inputSearchName');
let select = document.getElementById('select');
let mood = 'Create';
let ttt;
//create button
let getData;
if (localStorage.Guest != null){
    getData = JSON.parse(localStorage.Guest);
}else{
    getData = [];
}
create.onclick = function(){
    let newData= {
        firstName:firstName.value.toUpperCase(),
        lastName:lastName.value.toUpperCase(),
        count:count.value,
        email:email.value.toUpperCase(),
        birthday:birthday.value,
        vnummer:vnummer.value,
        roomNumber:roomNumber.value,
        select:select.value.toUpperCase(),
    }
    if(firstName.value != '' && lastName.value != '' && vnummer.value != ''){
        if(mood === 'Create'){
            getData.push(newData);
            alert('Your Guest Has Been Created');
            }else{
            getData[ttt] = newData;
            alert('Your Guest Has Been Updated');
            mood = 'Create'
            create.innerHTML = 'Create';
            location.reload()
            }
            clearInput()
        }else{
            alert('Please Enter The Guest Information !!')
        }
    //save localstorage and store the data in the big one
    localStorage.setItem('Guest',JSON.stringify(getData));
    showData()
};
function clearInput(){
    firstName.value = '';
    lastName.value = '';
    count.value = '';
    email.value = '';
    birthday.value = '';
    vnummer.value = '';
    roomNumber.value = '';
    select.value = '';
}
function showData(){
    let table = '';
    for(let i=0; i < getData.length; i++){
        table  += `
        <tr>
        <th>${i+1}</th>
        <th>${getData[i].firstName}</th>
        <th>${getData[i].lastName}</th>
        <th>${getData[i].count}</th>
        <th>${getData[i].email}</th>
        <th>${getData[i].birthday}</th>
        <th>${getData[i].vnummer}</th>
        <th>${getData[i].roomNumber}</th>
        <th>${getData[i].select}</th>
        <th><button onclick="updateData(${i})" id="update">update</button></th>
        <th><button onclick="deleteItem(${i})" id="delete">delete</button></th>
    </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    if(getData.length > 0){
        deleteAllStorage.innerHTML = `
        <button onclick="deleteAllStorage">Delete All</button>`
    }else{
        deleteAllStorage.innerHTML = '';
    } 
};
showData()

//delete one item button
function deleteItem(i){
    getData.splice(i,1)
    localStorage.Guest = JSON.stringify(getData)
    showData()
    alert('Your Guest Has Been Deleted');
}
//delete all items button
deleteAllStorage.onclick = function(){
    localStorage.clear()
    getData.splice(0)
    showData()
    //or you can use only reload page
    //location.reload()
}
//update button function
function updateData(i){

    firstName.value = getData[i].firstName;
    lastName.value = getData[i].lastName;
    count.value = getData[i].count;
    email.value = getData[i].email;
    birthday.value = getData[i].birthday;
    vnummer.value = getData[i].vnummer;
    roomNumber.value = getData[i].roomNumber;
    select.value = getData[i].select;
    create.innerHTML = 'Update';
    mood = 'Update'
    ttt = i;
    span.onclick()
}

//search by name button
function getSearchName(value)
{
    let table = '';
    for(let i=0; i < getData.length; i++){
        if(getData[i].firstName.includes(value.toUpperCase())){
            table  += `
            <tr>
                <th>${i+1}</th>
                <th>${getData[i].firstName}</th>
                <th>${getData[i].lastName}</th>
                <th>${getData[i].count}</th>
                <th>${getData[i].email}</th>
                <th>${getData[i].birthday}</th>
                <th>${getData[i].vnummer}</th>
                <th>${getData[i].roomNumber}</th>
                <th>${getData[i].select}</th>
                <th><button onclick="updateData(${i})" id="update">update</button></th>
                <th><button onclick="deleteItem(${i})" id="delete">delete</button></th>
            </tr>`
        }
        document.getElementById('tbody').innerHTML = table;
    }
}
//search by vnummer button
function getSearchVnummer(value)
{
    let table = '';
    for(let i=0; i < getData.length; i++){
        if(getData[i].vnummer.includes(value)){
            table  += `
            <tr>
                <th>${i+1}</th>
                <th>${getData[i].firstName}</th>
                <th>${getData[i].lastName}</th>
                <th>${getData[i].count}</th>
                <th>${getData[i].email}</th>
                <th>${getData[i].birthday}</th>
                <th>${getData[i].vnummer}</th>
                <th>${getData[i].roomNumber}</th>
                <th>${getData[i].select}</th>
                <th><button onclick="updateData(${i})" id="update">update</button></th>
                <th><button onclick="deleteItem(${i})" id="delete">delete</button></th>
            </tr>`
        }
        document.getElementById('tbody').innerHTML = table;
    }
}

//up button (scroll)
let span = document.querySelector(".up");
window.onscroll = function(){
   // add scrolling action
   this.scrollY >= 750 ? span.classList.add("show") : span.classList.remove("show");
};

//add click on up scroll
span.onclick = function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
};
