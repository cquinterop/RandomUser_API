const wrapper = document.querySelector('.wrapper')

// DOM MANIPULATION

class UI {
    createTag(tagName, attributes, parent, content) {
        const tag = document.createElement(tagName)

        for (let [key, value] of Object.entries(attributes)) {
            tag.setAttribute(key, value)
            tag.textContent = content
            parent.appendChild(tag)
        }
        return tag
    }
    newCard(person) {
        const card = this.createTag('article', { 'class': 'card col-12 col-sm-6 col-md-4 col-lg-3 p-4' }, wrapper),
        cardImg = this.createTag('img', { 'class': 'card-img-top', 'src': person.picture.large }, card),
        cardName = this.createTag('h5', { 'class': 'text-capitalize mt-2' }, card, `${person.name.first} ${person.name.last}`)

        card.addEventListener('click', () => {
            this.modal(person)
        })
    }
    getTemplate(sel, obj) {
        let temp = document.querySelector(sel),
            clon = temp.content.cloneNode(true)
            document.body.appendChild(clon)

        let el
        for (let [key, value] of Object.entries(obj)) {
            el = document.querySelector(key)
            el.textContent = value
        }
        return el
    }
    modal(person) {
        // OPEN MODAL
        this.getTemplate('.modal', {
            '.name': `${person.name.first} ${person.name.last}`,
            '.gender': person.gender,
            '.age': person.dob.age,
            '.city': person.location.city,
            '.phone': person.phone,
            '.email': person.email
        })

        document.querySelector('.picture').src = person.picture.large

        // CLOSE MODAL
        document.querySelector('.close')
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

document.querySelector('.amount_form')
    .addEventListener('submit', e => {
        e.preventDefault()
        const amount = document.querySelector('.amount').value
        amount > 0 ? get_api(amount) : alert('Please enter a number greater than or equal to 1')
        ui.clearContent(wrapper)
    })