// NOSTALGIC JQUERY SELECTOR

const $ = (sel) => document.querySelector(sel),
    $$ = (sel) => document.querySelectorAll(sel)

// GLOBAL VARIABLES

const wrapper = $('.wrapper'),
    loader = $(".loader")

// DOM MANIPULATION

class UI {
    createTag(tagName, attributes) {
        const tag = document.createElement(tagName)
        for (let [key, value] of Object.entries(attributes)) {
            tag.setAttribute(key, value)
        }
        return tag
    }
    appendElements(parent, children) {
        for (let elements of children.values()) {
            parent.appendChild(elements)
        }
    }
    newCard(person) {
        const card = this.createTag('article', {
            'class': 'card col-12 col-sm-6 col-md-4 col-lg-3 p-4'
        }),
            cardImg = this.createTag('img', {
                'class': 'card-img-top',
                'src': person.picture.large
            }),
            cardName = this.createTag('h5', {
                'class': 'text-capitalize mt-2'
            })

        cardName.textContent = `${person.name.first} ${person.name.last}`

        this.appendElements(card, [cardImg, cardName])
        this.appendElements(wrapper, [card])

        card.addEventListener('click', () => this.modal(person))
    }
    getTemplate(sel, obj) {
        let temp = $(sel),
            clon = temp.content.cloneNode(true)
        document.body.appendChild(clon)

        let el
        for (let [key, value] of Object.entries(obj)) {
            el = $(key)
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

        $('.picture').src = person.picture.large

        // CLOSE MODAL
        $('.close')
            .addEventListener('click', () => {
                $('.overlay')
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
            loader.style.display = "none"
        })
        .catch(error => {
            console.log(error)
            loader.style.display = "none"
        })
}

// EVENT LISTENERS

window.addEventListener('load', () => get_api(12))

$('.amount_form')
    .addEventListener('submit', e => {
        e.preventDefault()
        const amount = $('.amount').value
        ui.clearContent(wrapper)
        get_api(amount)

        loader.style.display = "flex"
    })