
document.body.innerHTML=`
<div class="form-user">
<input class="useradd" placeholder="enter name">
<input class="userpic" placeholder="enter pic uRl">
<button onclick="Adduser()">ADD</button>
</div>
<section class="user-container"></section>`;

async function getAllusers() {
    const data= await fetch("https://616ba6e516c3fa0017171788.mockapi.io/users",{method: "GET"})
    const users=await data.json();

const usercontainer=document.querySelector(".user-container");
usercontainer.innerHTML=""
users.forEach((user)=>{
    usercontainer.innerHTML +=  `
    <div class="user-list">
    <img class="user-avatar" src=${user.avatar}>
    <div>
    <p class="user-name">${user.name}</p>
    <button onclick="Edituser(${user.id})">EDIT</button>
    <button onclick="Deleteuser(${user.id})">DELETE</button>
    <div class="user-form edit-${user.id}">
    <input value="${user.name}" class="edit-${user.id}-user-name" placeholder="Enter username"/>
    <input value="${user.avatar}" class="edit-${user.id}-user-pic" placeholder="enter url"/>
    <button onclick="saveEdit(${user.id})">save</button>
    </div>
    </div>
   </div>
    ` ;

});

console.log(users)
}
getAllusers();

async function Deleteuser(userid){
    // console.log("dele....", userid)
    const data= await fetch("https://616ba6e516c3fa0017171788.mockapi.io/users/" + userid,{method: "DELETE"})
    getAllusers();
}
async function Adduser(){
    console.log("add....")
    const username=document.querySelector(".useradd").value;
    const img=document.querySelector(".userpic").value;

    const data= await fetch("https://616ba6e516c3fa0017171788.mockapi.io/users",
    { 
    method: "POST",
    Headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ name:username,avatar:img}),

}
);
getAllusers();
}
async function Edituser(userid){
    console.log("Edit....")
    const edituser=document.querySelector(`.edit-${userid}`)
    edituser.style.display=
    edituser.style.display==="block" ? "none" : "block";
}
    async function saveEdit(userid){
    console.log("save...")
    const username=document.querySelector(`.edit-${userid}-user-name`).value;
    const img1=document.querySelector(`.edit-${userid}-user-pic`).value;

    const data= await fetch("https://616ba6e516c3fa0017171788.mockapi.io/users/" + userid,
    
    { 
    method: "PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ name:username,avatar:img1}),
    }
    );

getAllusers();

}


    



