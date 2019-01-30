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
            span = document.createElement('span'),
            p = document.createElement('p')

        wrapper.appendChild(article)
        article.appendChild(img)
        article.appendChild(span)
        span.appendChild(p)

        article.setAttribute('class', 'card col-6 col-md-4')
        img.setAttribute('class', 'card-img-top')
        span.setAttribute('class', 'card-body')
        p.setAttribute('class', 'card-text')

        img.src = person.picture
        p.innerHTML = person.name
    }
}

window.addEventListener('load', () => {
    fetch('https://randomuser.me/api/?key=04HA-DCYA-ZX83-1OD7&results=20')
        .then(resp => resp.json())
        .then((data) => {
            data.results.forEach((element) => {
                let person_picture = element.picture.large,
                person_name = `${element.name.first} ${element.name.last}`

                const person = new Person(person_picture, person_name)
                const ui = new UI()
    
                ui.newCard(person)

            })
        })
})