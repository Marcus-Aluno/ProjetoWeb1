const btn = document.querySelector('#catGen');
const cards = document.querySelector('#card-holder');
let clickCount = 0;
let cardDivs = [];

async function getImage() {
    
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();
    const url = data[0].url;
    console.log(data)

    let cardDiv;

    if (clickCount < 3) {
        
        cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cards.appendChild(cardDiv);
        cardDivs.push(cardDiv);
    } else {
        
        cardDiv = cardDivs.shift();
        cards.appendChild(cardDiv);
        cardDivs.push(cardDiv); 
    }

    
    cardDiv.innerHTML = `<img src="${url}" width="200px" height="200px" class="photo">`;

    const frase = getFrase(cardDiv);


    clickCount++;
}

async function getFrase(cardDiv) {
    const response = await fetch('https://meowfacts.herokuapp.com/?lang=por-br');
    const data = await response.json();
    const frase = data.data[0];

    cardDiv.innerHTML += `<span class="texto">${frase}</span>`;
}

btn.addEventListener('click', () => {
    getImage();
});