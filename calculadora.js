document.addEventListener('DOMContentLoaded', () => {
    let inputStorage = window.localStorage.getItem('inputMeasure');
    let outputStorage = window.localStorage.getItem('outputMeasure');

    if (!inputStorage) {
        inputStorage = 'kilo';
        window.localStorage.setItem('inputMeasure', inputStorage);
    }
    if (!outputStorage) {
        outputStorage = 'kilo';
        window.localStorage.setItem('outputMeasure', outputStorage);
    }

    let xMeasureDOM = document.getElementById('xMeasure');
    let yMeasureDOM = document.getElementById('yMeasure');

    xMeasureDOM.value = inputStorage;
    yMeasureDOM.value = outputStorage;

    xMeasureDOM.addEventListener('change', (e) => saveChange('inputMeasure', e.target.value));
    yMeasureDOM.addEventListener('change', (e) => saveChange('outputMeasure', e.target.value));

    xMeasureDOM.addEventListener('change', clearResults);

    let inputDOM = document.getElementById('x');
    let outputDOM = document.getElementById('y');

    inputDOM.addEventListener('input', calcular);
    outputDOM.addEventListener('click', copyToClipboard);

});

const saveChange = (name, value) => {
    window.localStorage.setItem(name, value);
}

const clearResults = () => {
    document.getElementById('x').value = '';
    document.getElementById('y').value = '';
}

function calcular() {
    let x = document.getElementById('x');
    let y = document.getElementById('y');

    let xMeasure = document.getElementById('xMeasure').value;
    let yMeasure = document.getElementById('yMeasure').value;

    if (xMeasure == 'kilo' && yMeasure == 'libra') {
        let total = kiloLibra(x.value);
        y.value = total;
    }
    else if (xMeasure == 'libra' && yMeasure == 'kilo') {
        let total = libraKilo(x.value);
        y.value = total;
    }
    else {
        alert('No implementado aún');
    }

}

function copyToClipboard() {
    let dom = document.getElementById('y');

    if (!dom.value)
        return;

    dom.select();
    navigator.clipboard.writeText(dom.value);
    showClipboard();
}

function showClipboard() {
    let messageDOM = document.getElementById('clipboardMessage');
    messageDOM.classList.add('show');
    setTimeout(function () {
        messageDOM.classList.remove('show');
    }, 2300);
}


function libraKilo(libras) {
    let value = libras * .4536;
    return Math.round(value * 1000) / 1000;
}

function kiloLibra(kilos) {
    let value = kilos / .4536;
    return Math.round(value * 1000) / 1000;
}