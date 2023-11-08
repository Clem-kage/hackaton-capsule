//If no trips have been found
document.querySelector('#searchButton').addEventListener('click', function () {
    let message = 'No trips have been found'
    let newMessageElement = document.createElement('div')
    newMessageElement.classList.add('column', 'new-column')
    newMessageElement.innerHTML = `
    <div id="result-container">
        <a id="baseline">
            <img id="baselineIcon" src="/images/notfound.png" />
            <p id="eventScript">${message}</p>
        </a>
    </div>`;
    let currentResultContainer = document.querySelector('#result-container');
    currentResultContainer.innerHTML = newMessageElement.innerHTML
})