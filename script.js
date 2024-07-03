const filterButton = document.getElementById("filterButton")

let words = [
    "DRENAGEM",
    "ABASTECIMENTO",
    "SANEAMENTO",
    "ELEVATORIA",
    "TRATAMENTO",
    "ESGOT",
    "ADUTOR"
]

let states = [
    "RN",
    "AL",
    "SE",
    "PE",
    "PI",
    "PB",
    "CE",
    "PA"
]

filterButton.addEventListener('click', async (event) => {
    function get_elements_by_inner(words, states) {
        let res = []
        const elems = [...document.getElementsByClassName('sc-caiLqq eUEOWK col-md-11')];
        const counter = document.getElementsByClassName('col-md-12 d-flex align-items-center justify-content-end text-secondary')[0];
    
        words.forEach((word) => {
            let normalizeWord = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            elems.forEach((elem) => { 
                let selected = elem.firstChild.innerHTML.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
                elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
                if(selected.includes(normalizeWord) && !res.includes(elem) && states.includes(elem.parentElement.parentElement.children[4].children[1].getElementsByTagName("span")[0].innerText)) {
                    res.push(elem)
                }
            })
        })

        res.forEach((re) => {
            elems.forEach((elem) => {
                // if (re === elem && states.includes(re.parentElement.parentElement.children[4].children[1].getElementsByTagName("span")[0].innerText)) {
                if (re === elem) {
                    elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'flex'
                }
            })
        })
        counter.firstChild.innerText = `Total de ${res.length} licitações.`
        // console.log(res)
        // console.log(res[0].parentElement.parentElement.children[4].children[1].getElementsByTagName("span")[0].innerText)
    }

    event.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        // files : [ "filter.js" ],
        func: get_elements_by_inner,
        args: [words, states]

    });

});
