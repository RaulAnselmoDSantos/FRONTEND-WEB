console.log('Olá mundo!!')

const token = 'cp1bi01r01qu1k1i3jb0cp1bi01r01qu1k1i3jbg'

const allStocks = [
    {
        index: 1,
        bolsa: 'NASDAQ',
        codigo: 'AAPL',
        company: 'APPLE Inc.',
        valor: 25080,
        variacao: 0.35,
        qtdAcoes: 40,
        setor: 'Electronic Technology',
        site: 'APPLE.com.br'
    },
    {
        index: 2,
        bolsa: 'NASDAQ',
        codigo: 'MSFT',
        company: 'Microsoft Corp',
        valor: 51090,
        variacao: 1.35,
        qtdAcoes: 20,
        setor: 'Electronic Technology',
        site: 'Microsoft.com.br'
    },
    {
        index: 3,
        bolsa: 'NASDAQ',
        codigo: 'META',
        company: 'META Inc',
        valor: 51090,
        variacao: 1.35,
        qtdAcoes: 20,
        setor: 'Electronic Technology',
        site: 'meta.com.br'
    },
    {
        index: 4,
        bolsa: 'NASDAQ',
        codigo: 'NVIDIA',
        company: 'NVIDIA Inc',
        valor: 51090,
        variacao: 1.35,
        qtdAcoes: 20,
        setor: 'Electronic Technology',
        site: 'NVIDIA.com.br'
    }
]

function addCard(stock){
    let main = document.querySelector('body > main')
    main.innerHTML = main.innerHTML + `
            <div id="card_ticker" class="card_ticker" onclick="editCard()">  
            <header>
                <h2>${stock.bolsa}</h2>
                <p>${stock.codigo}</p>
                <p>${stock.company}</p>
            </header>
            <main>
                <div class="acima">
                    <h1>R$ ${realFormat((+stock.valor /100))}</h1>
                </div>
                <div class="abaixo">
                    <p ${stock.variacao < 0 ? 'style="background: #FF0000;"':'' }>${stock.variacao < 0 ? '▼' : '▲'} ${stock.variacao }%</p>
                    <div>
                        <p>R$ ${realFormat((+stock.valor /100)*(+stock.variacao /100))}</p>
                    </div>
                </div>
            </main>
            <footer>
                <div>
                    <div class="acima">
                        <p>${stock.qtdAcoes}</p>
                        <div>
                            <p>Número de ações</p>
                        </div>
                    </div>
                    <div class="abaixo">
                        <p>R$ ${realFormat(stock.qtdAcoes * (stock.valor /100))}</p>
                        <div>
                            <p>Posição</p>
                        </div>
                    </div>
                </div> 
            </footer> 
        </div> 
    `
}

function addTableLine(stock){
    let main = document.querySelector('main > table > tbody')
    main.innerHTML = main.innerHTML += `
    
          <tr>
            <td>${stock.bolsa}</td>
            <td>${stock.codigo}</td>
            <td>${stock.company}</td>
            <td>${stock.setor}</td>
            <td><a href="${stock.site}" target="_blank">${stock.site}</a></td>
          </tr>
    `
}

const openModal = (idModal) => {
    const display = document.getElementById(idModal)
        display.style.display = 'flex';
        console.log(display)
}

const closeModal = (event, id) => {
        if(id){
            const display = document.getElementById(id)
            modal.style.display = 'none'
            return
        }

        if(event?.target?.className === "modal"){
            display.style.display = 'none';
            return
        }
}

const createCard = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target)
    const stock = Object.fromEntries(formData)
    addCard(stock)

    closeModal(null, 'add-form-modal');
    event.target.reset();
}

const creatApitCard = async(event) => {
    event.preventDefault()
    const {codigo, nAcoes} = event.target.elements

    const response = await fetch(``)
    const result = await response.json()

    const response2 = await fetch(``)
    const profiel = await response2.json()
}


function realFormat(valor){
    return valor.toFixed(2).toString().replace('.',',');
}

 testeApi = async () => {
    const response = await fetch('https://cat-fact.herokuapp.com/facts')
    console.log(response)
    const result = await response.json()
    console.log(result[0].text)

    result.map((item => console.log(item.text)))

}


function loadCard(){ allStocks.map(stock => addCard(stock))}
function loadTable(){allStocks.map((stock, index) => addTableLine(stock))} 

// terminar projeto:
// fazer um cartão apartir da API fornecendo os requisitos para a API 
// utilizar : https://finnhub.io/docs/api/company-profile2 , https://finnhub.io/docs/api/quote , https://finnhub.io/docs/api/company-news
