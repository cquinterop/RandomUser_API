class Person {
    constructor(picture, name) {
        this.picture = picture
        this.name = name
    }
}

class UI {
    newCard(person) {
        const wrapper = document.getElementById('wrapper'),
            article = document.createElement('article'),
            img = document.createElement('img'),
            h5 = document.createElement('h5')

        wrapper.appendChild(article)
        article.appendChild(img)
        article.appendChild(h5)

        article.setAttribute('class', 'card col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-4')
        img.setAttribute('class', 'card-img-top rounded-top')
        h5.setAttribute('class', 'text-capitalize mt-2')

        img.src = person.picture
        h5.innerText = person.name
    }
}


const get_api = (num) => {
    fetch(`https://randomuser.me/api/?results=${num}`)
        .then(resp => resp.json())
        .then((data) => {
            data.results.forEach((el, i) => {
                const person_picture = el.picture.large,
                    person_name = `${el.name.first} ${el.name.last}`

                const person = new Person(person_picture, person_name),
                    ui = new UI()

                ui.newCard(person)
            })
        })
}


document.getElementById('amount_form')
    .addEventListener('submit', (e) => {
        while(wrapper.firstChild){
            wrapper.removeChild(wrapper.firstChild)
        }
        const amount = document.getElementById('amount').value

        get_api(amount)

        e.preventDefault()
    })