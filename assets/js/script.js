const apiKey = "";
const apiPaisURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const inputCidade = document.querySelector('#input-cidade');
const botãoSearch = document.querySelector('#search');

const elementoCidade = document.querySelector('#cidade');
const elementoTemperatura = document.querySelector('#temperatura span');
const elementoDescricao = document.querySelector('#descricao');
const elementoIcone = document.querySelector('#icone-tempo');
const elementoPais = document.querySelector('#pais');
const elementoUmidade = document.querySelector('#umidade span');
const elementoVento = document.querySelector('#vento span');

const containerTempo = document.querySelector('#weather-data')

const containerMensagemErro = document.querySelector("#erro-mensagem");

const loader = document.querySelector("#loader");

const toggleLoader = () => {
    loader.classList.toggle("hide");
};

//função obter dados da api

const obterMeteorologia = async (cidade) => {
    toggleLoader();

    const apiTempoURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`

    const resposta = await fetch(apiTempoURL)
    const data = await resposta.json();

    toggleLoader();

    return data;
};

// Tratamento de erro e informações na tela
const mostrarMensagemErro = () => {
    containerMensagemErro.classList.remove("hide");
};

const hideInformacao = () => {
    containerMensagemErro.classList.add("hide");
    containerTempo.classList.add("hide");
};

const mostrarMeteorologia = async (cidade) => {
    hideInformacao();

    const data = await obterMeteorologia(cidade);

    if (data.cod === "404") {
        mostrarMensagemErro();
        return;
    }

    elementoCidade.innerText = data.name;
    elementoTemperatura.innerText = parseInt(data.main.temp);
    elementoDescricao.innerText = data.weather[0].description;
    elementoIcone.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    elementoPais.setAttribute("src", apiPaisURL + data.sys.country);
    elementoUmidade.innerText = `${data.main.humidity}%`;
    elementoVento.innerText = `${data.wind.speed}km/h`;

    //mostrar imagem fundo
    document.body.style.backgroundImage = `url("${apiUnsplash + cidade}")`;

    // mostrar o container da função mostrarMeteorologia
    containerTempo.classList.remove("hide")
};

// evento botão
botãoSearch.addEventListener("click", async (e) => {
    e.preventDefault();

    const cidade = inputCidade.value;
    mostrarMeteorologia(cidade)
});

// evento input com enter
inputCidade.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const cidade = e.target.value

        mostrarMeteorologia(cidade);
    }
});