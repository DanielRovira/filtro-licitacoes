
function get_elements_by_inner(words) {
    let res = []
    const column = document.getElementsByClassName('row mx-1 mt-5')[0];
    const elems = [...document.getElementsByClassName('sc-caiLqq eUEOWK col-md-11')];

    words.forEach((word) => {
        let normalizeWord = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        elems.forEach((elem) => { 
            let selected = elem.firstChild.innerHTML.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            if(selected.includes(normalizeWord)) {
                res.push(elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement)
            }
        })
    })
    console.log(res)
    // column.firstChild.remove()
    column.firstChild.innerHTML = ""
    res.forEach((elem) => {
        column.firstChild.appendChild(elem)
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
