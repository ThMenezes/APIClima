const apiKey = "";
const apiPaisURL = "https://countryflagsapi.com/png/";

const inputCidade = document.querySelector('#input-cidade');
const botãoSearch = document.querySelector('#search');

const elementoCidade = document.querySelector('#cidade');
const elementoTemperatura = document.querySelector('#temperatura span');
const elementoDescricao = document.querySelector('#descricao');
const elementoIcone = document.querySelector('#icone-tempo');
const elementoPais = document.querySelector('#pais');
const elementoUmidade = document.querySelector('#umidade span');
const elementoVento = document.querySelector('#vento span');

// obter clima da cidade
const obterMeteorologia = async(cidade) => {
    const apiTempoURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`

    const resposta = await fetch(apiTempoURL)
    const data = await resposta.json()

    console.log(data)
}

//função mostrar cidade
const mostrarMeteorologia = (cidade) => {
    obterMeteorologia(cidade)
}

botãoSearch.addEventListener("click", (e) => {
    e.preventDefault();

    const cidade = inputCidade.value;
    mostrarMeteorologia(cidade)
})

