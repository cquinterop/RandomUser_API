// DOM MANIPULATION

class UI {
    newCard(person) {
        const wrapper = document.getElementById('wrapper'),
            card = document.createElement('article'),
            cardImg = document.createElement('img'),
            cardName = document.createElement('h5')

        wrapper.appendChild(card)
        card.appendChild(cardImg)
        card.appendChild(cardName)

        card.setAttribute('class', 'card col-12 col-sm-6 col-md-4 col-lg-3 p-4')
        cardImg.setAttribute('class', 'card-img-top')
        cardName.setAttribute('class', 'text-capitalize mt-2')

        cardImg.src = person.picture.large
        cardName.textContent = `${person.name.first} ${person.name.last}`

        card.addEventListener('click', () => {
            this.modal(person)
        })
    }
    modal(person) {
        // OPEN MODAL
        const temp = document.querySelector('template'),
            clon = temp.content.cloneNode(true)
        document.body.appendChild(clon)

        const picture = document.getElementById('picture'),
            name = document.getElementById('name'),
            gender = document.getElementById('gender'),
            age = document.getElementById('age'),
            city = document.getElementById('city'),
            phone = document.getElementById('phone'),
            email = document.getElementById('email')

        name.innerHTML = `${person.name.first} ${person.name.last}`
        picture.src = person.picture.large
        gender.innerHTML = `<strong>Gender:</strong> ${person.gender}`
        age.innerHTML = `<strong>Age:</strong> ${person.dob.age}`
        city.innerHTML = `<strong>City:</strong> ${person.location.city}`
        phone.innerHTML = `<strong>Phone:</strong> ${person.phone}`
        email.innerHTML = `<strong>Email:</strong> ${person.email}`

        // CLOSE MODAL
        document.getElementById('close')
            .addEventListener('click', () => {
                document.querySelector('.overlay')
                    .remove()
            })
    }
    clearContent(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild)
        }
    }
}

// DATA QUERIES

const ui = new UI()

const get_api = num => {
    fetch(`https://randomuser.me/api/?results=${num}`)
        .then(resp => resp.json())
        .then(data => {
            let arr = data.results

            arr.forEach((arr) => {
                ui.newCard(arr)
            })
        })
}

// EVENT LISTENERS

window.addEventListener('load', () => {
    get_api(12)
})

document.getElementById('amount_form')
    .addEventListener('submit', e => {
        ui.clearContent(wrapper)
        const amount = document.getElementById('amount').value
        get_api(amount)
        e.preventDefault()
    })