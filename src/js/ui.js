class Person {
    constructor(picture, name, gender, city, email, age, phone) {
        this.picture = picture
        this.name = name
        this.gender = gender
        this.city = city
        this.email = email
        this.age = age
        this.phone = phone
    }
}

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

        cardImg.src = person.picture
        cardName.textContent = person.name
    }
    clearContent(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild)
        }
    }
}

let ui = new UI(),
    person = new Person()

let _picture,
    _name,
    _gender,
    _city,
    _email,
    _age,
    _phone

const cardLoop = (arr) => {
    arr.forEach((el, i) => {
        _picture = el.picture.large,
        _name = `${el.name.first} ${el.name.last}`,
        _gender = el.gender,
        _city = el.location.city,
        _email = el.email,
        _age = el.dob.age,
        _phone = el.phone

        person = new Person(_picture, _name)
        ui.newCard(person)
    })
}

const openModal = () => {
    let modal = document.querySelector('template'),
        clon = modal.content.cloneNode(true)
        document.body.appendChild(clon)

    let picture = document.getElementById('picture'),
        name = document.getElementById('name'),
        gender = document.getElementById('gender'),
        age = document.getElementById('age'),
        city = document.getElementById('city'),
        phone = document.getElementById('phone'),
        email = document.getElementById('email')

    name.innerHTML = _name
    picture.src = _picture
    gender.innerHTML = `<strong>Gender:</strong> ${_gender}`
    age.innerHTML = `<strong>Age:</strong> ${_age}`
    city.innerHTML = `<strong>City:</strong> ${_city}`
    phone.innerHTML = `<strong>Phone:</strong> ${_phone}`
    email.innerHTML = `<strong>Email:</strong> ${_email}`
}

const closeModal = () => {
    let modal = document.querySelector('.cst-modal'),
        overlay = document.querySelector('.overlay')

    document.getElementById('close')
        .addEventListener('click', () => {
            modal.remove()
            overlay.remove()
        })
}

const modal = () => {
    document.querySelector('article')
        .addEventListener('click', () => {
            openModal()
            closeModal()
        })
}

const get_api = num => {
    fetch(`https://randomuser.me/api/?results=${num}`)
        .then(resp => resp.json())
        .then(data => {
            let arr = data.results
            cardLoop(arr)
            modal()
        })
}

window.addEventListener('load', () => {
    get_api(12)
})

document.getElementById('amount_form')
    .addEventListener('submit', e => {
        ui.clearContent(wrapper)
        let amount = document.getElementById('amount').value
        get_api(amount)
        e.preventDefault()
    })