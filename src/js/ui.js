// NOSTALGIC JQUERY SELECTOR

const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// GLOBAL VARIABLES

const wrapper = $('.wrapper')
const loader = $('.loader')

// DOM MANIPULATION

class UserInterface {
    createTag(tagName, attributes) {
        const tag = document.createElement(tagName)
        for (let [key, value] of Object.entries(attributes)) {
            tag.setAttribute(key, value)
        }
        return tag
    }
    appendChildren(parent, children) {
        for (let elements of children.values()) {
            parent.appendChild(elements)
        }
    }
    newCard(person) {
        const card = this.createTag('article', {
            'class': 'card col-12 col-sm-6 col-md-4 col-lg-3 p-4'
        })
        const cardImg = this.createTag('img', {
            'class': 'card-img-top',
            'src': person.picture.large
        })
        const cardName = this.createTag('h5', {
            'class': 'text-capitalize mt-2'
        })

        cardName.textContent = `${person.name.first} ${person.name.last}`

        this.appendChildren(card, [cardImg, cardName])
        wrapper.appendChild(card)

        card.addEventListener('click', () => this.modal(person))
    }
    getTemplate(selector, object) {
        let template = $(selector)
        let clon = template.content.cloneNode(true)
        document.body.appendChild(clon)

        let element
        for (let [key, value] of Object.entries(object)) {
            element = $(key)
            element.textContent = value
        }
        return element
    }
    modal(person) {
        // OPEN MODAL
        $('body').classList.add('overflow-hidden')

        this.getTemplate('.modal', {
            '.name': `${person.name.first} ${person.name.last}`,
            '.gender': person.gender,
            '.age': person.dob.age,
            '.city': person.location.city,
            '.phone': person.phone,
            '.email': person.email
        })
        $('.picture').src = person.picture.large

        // CLOSE MODAL
        $('.close').addEventListener('click', () => {
            $('.overlay').remove()
            $('body').classList.remove('overflow-hidden')
        })
    }
    clearContent(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    }
}

// DATA QUERIES

const userInterface = new UserInterface()

const makeRequest = number => {
    fetch(`https://randomuser.me/api/?results=${number}`)
        .then(response => response.json())
        .then(data => {
            let array = data.results
            array.forEach(array => userInterface.newCard(array))

            loader.style.display = 'none'
        })
        .catch(error => {
            console.log(error)
            loader.style.display = 'none'
        })
}

// EVENT LISTENERS

window.addEventListener('load', () => makeRequest(12))

$('.amount_form').addEventListener('submit', e => {
    e.preventDefault()

    const amount = $('.amount').value
    userInterface.clearContent(wrapper)
    makeRequest(amount)

    loader.style.display = 'flex'
})
