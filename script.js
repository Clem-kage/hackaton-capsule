document.querySelector('#searchButton').addEventListener('click', function () {
    const trips = document.querySelector('#departureInput').value;
    const arrival = document.querySelector('#arrivalInput').value;
    const calendar = document.querySelector('#calendar').value;

    if (!trips || !arrival || !calendar) {
        const message = 'No trips have been found';
        let newMessageElement = document.createElement('div');
        newMessageElement.classList.add('column', 'new-column');
        newMessageElement.innerHTML = `
            <div id="result-container">
                <a id="baseline">
                    <img id="baselineIcon" src="/images/notfound.png" />
                    <p id="eventScript">${message}</p>
                </a>
            </div>`;
        let currentResultContainer = document.querySelector('#result-container');
        currentResultContainer.innerHTML = newMessageElement.innerHTML;
    } else {
        fetch('', {//API placeholder
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trips, arrival, calendar }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.trajets) {
                    let newElement = '';
                    for (let i = 0; i < data.trajets.length; i++) {
                        newElement += `
                            <div class="column">
                                <p class="departure">${data.trajets[i].departure}</p>
                                <p class="arrival">${data.trajets[i].arrival}</p>
                                <p class="date">${data.trajets[i].date}</p>
                                <p class="price">${data.trajets[i].price}</p>
                                <button class="bookButton" id="${data.trajets[i].id} href="/cart.html">Book</button>
                            </div>`;
                    }
                    document.querySelector('#result-container').innerHTML = newElement;
                    updateBookButtonEventListener();
                }
            })
    }
});

function updateBookButtonEventListener() {
    for (let i = 0; i < document.querySelectorAll('.bookButton').length; i++) {
        document.querySelectorAll('.bookButton')[i].addEventListener('click', function () {
            fetch(`/${this.id}`, { method: 'GET' })//Needs API
                .then(response => response.json())
                .then(data => {
                    location.assign("/cart.html")
                })
        });
    }
}

document.querySelector('#cartBoard')