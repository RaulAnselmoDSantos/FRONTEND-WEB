console.log('Olá mundo!!')

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

const openModal = () => {
    const display = document.getElementById('add-card-modal')
        display.style.display = 'flex';
        console.log(display)
}

const closeModal = (event, id) => {
    const display = document.getElementById('add-card-modal')

        if(event?.target?.id === 'add-card-modal' || id == 'add-card-modal'){
            display.style.display = 'none';
        }
}

const createCard = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target)
    const stock = Object.fromEntries(formData)
    addCard(stock)

    closeModal(null, 'add-card-modal');
    event.target.reset();
}

const editCard = (event) => {

    const formData = document.getElementById("card_ticker")
    console.log(formData)
}

function realFormat(valor){
    return valor.toFixed(2).toString().replace('.',',');
}

function loadCard(){ allStocks.map(stock => addCard(stock))}
function loadTable(){allStocks.map((stock, index) => addTableLine(stock))} 