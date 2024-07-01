

function get_elements_by_inner(words) {
    let res = []
    let column = document.getElementsByClassName('row mx-1 mt-5')[0];
    let elems = [...document.getElementsByClassName('sc-caiLqq eUEOWK col-md-11')];

    words.forEach((word) => {
        let normalizeWord = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        elems.forEach((elem) => { 
            let selected = elem.firstChild.innerHTML.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            if(selected.includes(normalizeWord)) {
                res.push(elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement)
            }
        })
    })

    column.firstChild.remove()
    res.forEach((elem) => {
        column.appendChild(elem)
    })
    return
}

let list = [
    "drenagem",
    "abastecimento",
    "SANEAMENTO",
    "ELEVATÓRIA",
    "TRATAMENTO",
    "esgot",
    "ADUTOR"
]
get_elements_by_inner(list)
