// import data from "./filters.json" with { type: "json" }
//const filterButton = document.getElementById("filterButton")

chrome.action.onClicked.addListener((tab) => {

    async function Filter() {
        data = await fetch(chrome.runtime.getURL("filters.json"))
            .then((response) => response.json())
        let words = data.words
        let states = data.states
        let situation = data.situation
        let res = []
        const elems = [...document.getElementsByClassName('sc-caiLqq eUEOWK col-md-11')];   // Um elemento acima da div que contém o texto da descrição do objeto.
        const counter = document.getElementsByClassName('col-md-12 d-flex align-items-center justify-content-end text-secondary')[0]; // Um elemento acima da div que contém o texto do contador.
    
        words.forEach((word) => {
            let normalizeWord = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            elems.forEach((elem) => { 
                let selected = elem.firstChild.innerHTML.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
                elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
                if (!res.includes(elem)
                    && selected.includes(normalizeWord)
                    && states.includes(elem.parentElement.parentElement.children[4].children[1].getElementsByTagName("span")[0].innerText)
                    && situation.includes(elem.parentElement.parentElement.children[1].children[3].firstChild.innerText)
                ) {
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
        counter.firstChild.innerText = `Total de ${res.length} licitaç${res.length === 1 ? "ão" : "ões"}.`
        // console.log(res[0].parentElement.parentElement.children[1].children[3].firstChild.innerText)
    }

    // event.preventDefault();
    // const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        // files : [ "filter.js" ],
        func: Filter,
        // args: [data.words, data.states, data.situation]
    
    });
});

