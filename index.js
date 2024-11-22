function del(id)
{
    let res = window.confirm("Do you really want to delete this data")
    if(res)
    {
        fetch(`http://localhost:3000/crud/${id}` , {
            method : "DELETE"
        })
    }
    else{
        window.alert("Syntax Error")
    }
}
async function run()
{
    let res = await fetch("http://localhost:3000/crud")
    let data = await res.json()
   let a = document.querySelector("#demo")
   a.innerHTML = data.map((e)=>{
    return ` <tr>
                <td>${e.id}</td>
                <td>${e.name}</td>
                <td>${e.age}</td>
                <td>${e.address}</td>
                <td><button onclick = "del('${e.id}')">Delete</button></td>
                <td><button onclick = "edit('${e.id}')">Edit</button></td>

            </tr>`
   }).join(" ")
}
 function insert()
{
    let obj = {
        // id : document.querySelector("#id").value,
        name : document.querySelector("#name").value,
        age : document.querySelector("#age").value,
        address : document.querySelector("#address").value
    }
    fetch("http://localhost:3000/crud" , {
        method : "POST",
        body : JSON.stringify(obj)
    })

    return false;
}
async function edit(id)
{
  let data = await fetch(`http://localhost:3000/crud/${id}`)
  let res = await data.json()
  let a = document.querySelector("#form")
  a.innerHTML = `
    <input type="text" value="${res.id}" readonly>
    <input type="text" value="${res.name}" id = "name1">
    <input type="text" value="${res.age}" id = "age1">
    <input type="text" value="${res.address}" id = "address1">
    <button onclick = "finalupdate('${res.id}')">Update</button>
  `
  a.style.display = "grid"
}

function finalupdate(id)
{
let fdata = {
    name : document.querySelector("#name1").value,
    age : document.querySelector("#age1").value,
    address : document.querySelector("#address1").value
}
fetch(`http://localhost:3000/crud/${id}` , {
    method : "PUT",
    body : JSON.stringify(fdata)
})
.then(r=>alert("Updated....!"))
}