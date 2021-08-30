const loadQuotes = () => {
    fetch('https://api.kanye.rest/')
        .then(res => res.json())
        .then(data => showQuote(data));
}

const showQuote = (data) => {
    const quoteElement = document.getElementById('quote');
    quoteElement.innerText = data.quote;
}