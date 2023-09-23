const NAME = document.getElementById("name")
const PRICE = document.getElementById("price")
const QTY = document.getElementById("qty")
const DESCRIPTION = document.getElementById("desc")
const CATEGORY = document.getElementById("cat")


const ADD_BTN = document.getElementById("add-btn")
const DELETE_BTN = document.getElementById("delete")
const updateBtn = document.getElementById("update-btn")

const body = document.getElementById("body")

const keyword = document.getElementById("keyword")


updateBtn.style.display="none"

//courses array
let courses

if(localStorage.getItem('courses')){
    courses = JSON.parse(localStorage.getItem('courses'))
}else{
    courses = []
}

console.log(courses)
display()

ADD_BTN.onclick = function(e){

    e.preventDefault();

    let course =  {
        name:NAME.value,
        PRICE: PRICE.value,
        QTY: QTY.value,
        DESCRIPTION: DESCRIPTION.value,
        CATEGORY: CATEGORY.value
    }

    let errors = 0

    if(course.name.length < 5){
        errors++
        NAME.classList.add("is-invalid")
    }else{
        NAME.classList.remove("is-invalid")
        NAME.classList.add("is-valid")
    }



    if(isNaN(course.PRICE) || !course.PRICE){
        errors++
        PRICE.classList.add("is-invalid")
    }else{
        PRICE.classList.remove("is-invalid")
        PRICE.classList.add("is-valid")
    }

    if(isNaN(course.QTY) || !course.QTY){
        errors++
        QTY.classList.add("is-invalid")
    }else{
        QTY.classList.remove("is-invalid")
        QTY.classList.add("is-valid")
    }

    if(!course.DESCRIPTION){
        errors++
        DESCRIPTION.classList.add("is-invalid")
    }else{
        DESCRIPTION.classList.remove("is-invalid")
        DESCRIPTION.classList.add("is-valid")
    }
    

    if(!course.CATEGORY){
        errors++
        CATEGORY.classList.add("is-invalid")
    }else{
        CATEGORY.classList.remove("is-invalid")
        CATEGORY.classList.add("is-valid")
    }

    console.log(errors)

    if(!errors){
        
        NAME.classList.remove("is-valid")
        PRICE.classList.remove("is-valid")
        QTY.classList.remove("is-valid")
        DESCRIPTION.classList.remove("is-valid")
        CATEGORY.classList.remove("is-valid")
            courses.push(course)
        
            display()
            clear()
        
            Swal.fire(
                'Good job!',
                'You add course success!',
                'success'
            )
        
            localStorage.setItem('courses' , JSON.stringify(courses))

    }



}

DELETE_BTN.onclick = function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            courses = []
            localStorage.setItem('courses',JSON.stringify(courses))
            display()
          Swal.fire(
            'Deleted!',
            'Your courses has been deleted.',
            'success'
          )

        }
      })
}

keyword.onkeyup = function(){
    let keyW = keyword.value


    let data = ``
    
    for(let i=0; i<courses.length; i++){
        if(courses[i].name.toLocaleLowerCase().includes(keyW.toLocaleLowerCase()) || courses[i].CATEGORY.toLocaleLowerCase().includes(keyW.toLocaleLowerCase()) || courses[i].DESCRIPTION.toLocaleLowerCase().includes(keyW.toLocaleLowerCase())){
            data +=`
            <tr>
            <td>${i+1}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].CATEGORY}</td>
            <td>${courses[i].DESCRIPTION}</td>
            <td>${courses[i].PRICE}</td>
            <td>${courses[i].QTY}</td>
            <td>
                <a href="#" class="btn btn-primary" onclick="edit(${i})"><i class="fa-solid fa-pen"></i></a>
                <a href="#" class="btn btn-danger" onclick="deleteCourse(${i})"><i class="fa-solid fa-trash"></i></a>
            </td>
        </tr>
            `
        }
    }

    body.innerHTML = data
}

// display data 
function display(){

    let data = ``
    
    for(let i=0; i<courses.length; i++){
        data +=`
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].CATEGORY}</td>
        <td>${courses[i].DESCRIPTION}</td>
        <td>${courses[i].PRICE}</td>
        <td>${courses[i].QTY}</td>
        <td>
            <a href="#" class="btn btn-primary" onclick="edit(${i})"><i class="fa-solid fa-pen"></i></a>
            <a href="#" class="btn btn-danger" onclick="deleteCourse(${i})"><i class="fa-solid fa-trash"></i></a>
        </td>
    </tr>
        `
    }

    body.innerHTML = data
}

//clear data 
function clear(){
    NAME.value = ""
    PRICE.value = ""
    QTY.value = ""
    DESCRIPTION.value = ""
    CATEGORY.value = ""
}

//delete

function deleteCourse(i){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(i,1)
            display()
            localStorage.setItem('courses',JSON.stringify(courses))
          Swal.fire(
            'Deleted!',
            'Your course has been deleted.',
            'success'
          )

        }
      })

}

// edit 
function edit(i){

    NAME.value = courses[i].name
    PRICE.value = courses[i].PRICE
    QTY.value = courses[i].QTY
    DESCRIPTION.value = courses[i].DESCRIPTION
    CATEGORY.value = courses[i].CATEGORY

    updateBtn.onclick = function(){
        update(i)
    }

    ADD_BTN.style.display="none"
    updateBtn.style.display="inline-block"
}

//update 

function update(i){
    // console.log(i)
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, edit it!'
      }).then((result) => {
        if (result.isConfirmed) {
            let course =  {
                name:NAME.value,
                PRICE: PRICE.value,
                QTY: QTY.value,
                DESCRIPTION: DESCRIPTION.value,
                CATEGORY: CATEGORY.value
            }
        
            courses[i]=course
        
            display()
            clear()
            ADD_BTN.style.display="inline-block"
            updateBtn.style.display="none"

            localStorage.setItem('courses',JSON.stringify(courses))
          Swal.fire(
            'Updated!',
            'Your course has been updated.',
            'success'
          )
        }else{
            clear()
            ADD_BTN.style.display="inline-block"
            updateBtn.style.display="none"
        }
    })


   
    


}



