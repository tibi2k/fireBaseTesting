const cafeList = document.querySelector('#cafe-list')
const form = document.querySelector('#add-cafe-form')

function renderCafe(doc) {
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')
    let crossX = document.createElement('div')
    li.setAttribute('data-id', doc.id)
    name.textContent = doc.data().name
    city.textContent = doc.data().city
    crossX.textContent = "X"
    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(crossX)
    cafeList.appendChild(li)
    
    // delete a doc in db
    crossX.addEventListener('click', (e) => {
    e.stopPropagation()
    let id = e.target.parentElement.getAttribute('data-id')
    console.log(id);
    db.collection('cafes').doc(id).delete()
})
}

// get all data from db
// db.collection('cafes').get()
// .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//         renderCafe(doc)
//     })
// })

// get query data from db, where can be chained, we can order data as well, using orderBy('field'), place after where, sometimes have to create index in console.firebase
// db.collection('cafes').where('city', '==', 'Ho Chi Minh').get()
// .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//         renderCafe(doc)
//     })
// })

// get real-time data
db.collection('cafes').orderBy('city').onSnapshot((snapshot) => {
    
})

// update data into db
form.addEventListener('submit', (e) => {
    e.preventDefault()
    db.collection('cafes').add(
        {name: form.name.value,
        city: form.city.value}
    )
    form.name.value = ""
    form.city.value = ""
})

