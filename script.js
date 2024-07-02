const form = document.querySelector('form')

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files : [ "filtro.js" ],

        // function: get_elements_by_inner(list),
    });

});