const filterButton = document.getElementById("filterButton")

let list = [
    "drenagem",
    "abastecimento",
    "SANEAMENTO",
    "ELEVATÓRIA",
    "TRATAMENTO",
    "esgot",
    "ADUTOR"
]

filterButton.addEventListener('click', async (event) => {
    function get_elements_by_inner(words) {
        let res = []
        const elems = [...document.getElementsByClassName('sc-caiLqq eUEOWK col-md-11')];
    
        words.forEach((word) => {
            let normalizeWord = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            elems.forEach((elem) => { 
                let selected = elem.firstChild.innerHTML.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
                elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
                if(selected.includes(normalizeWord)) {
                    res.push(elem)
                }
            })
        })

        res.forEach((re) => {
            elems.forEach((elem) => {
                if (re === elem) {
                    elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'flex'
                }
            })
        })
    }

    event.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        // files : [ "filter.js" ],
        func: get_elements_by_inner,
        args: [list]

    });

});
