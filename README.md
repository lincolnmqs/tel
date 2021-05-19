TECNOLOGIAS

 - Back-end: NodeJS
 - Banco de Dados: MongoDB

DENTRO DA PASTA "BACK-END"

- Instalar todas dependências do NodeJS, digite o comando: "npm install" 
- Se precisar alterar a URL e PORTA do servidor, acesse o arquivo: ".env"
- Para iniciar o servidor de desenvolvimento, execute o comando: "npm run dev" (produção: "npm run start")

CADASTRO DOS DADOS NO BANCO DE DADOS

- APIs Valor de Chamada (Call Value):
    GET:    http://localhost:3000/api/callValue
    GET:    http://localhost:3000/api/callValueId{id} /api/callValueId08c0efdcc4b080774e9cb33
    POST:   http://localhost:3000/api/newCallValue
    UPDATE: http://localhost:3000/api/updateCallValue{id}
    DELETE: http://localhost:3000/api/deleteCallValue{id}

- Utilize o método "POST" e cadastre os dados por meio do array abaixo:
[{
    "origin": "011",
    "destiny": "016",
    "price": 1.90
}, {
    "origin": "016",
    "destiny": "011",
    "price": 2.90
}, {
    "origin": "011",
    "destiny": "017",
    "price": 1.70
}, {
    "origin": "017",
    "destiny": "011",
    "price": 2.70
}, {
    "origin": "011",
    "destiny": "018",
    "price": 0.90
}, {
    "origin": "018",
    "destiny": "011",
    "price": 1.90
}]

- APIs Plano (Flat):
    GET:    http://localhost:3000/api/flat
    GET:    http://localhost:3000/api/flatId{id} // /api/flatId608c0f4e1be5ce0494664d06 6
    POST:   http://localhost:3000/api/newFlat
    UPDATE: http://localhost:3000/api/updateFlat{id}
    DELETE: http://localhost:3000/api/deleteFlat{id}

- Utilize o método "POST" e cadastre os dados por meio do array abaixo:
[{
    "name": "FaleMais 30",
    "time": 30
}, {
    "name": "FaleMais 60",
    "time": 60
}, {
    "name": "FaleMais 120",
    "time": 120
}]

DENTRO DA PASTA "FRONT-END"

- Se precisar alterar a URL e PORTA do servidor no front-end, acesse: "js/index.js", em seguida altere a linha 1
- Agora é só abrir o arquivo: "index.html" e testar a aplicação integrada a interface

TDD COM JEST

- Para realizar o teste, execute o comando: "yarn test"
- Para testar casos errados, acesse "__test__/callValue.test.js" ou "__test__/flat.test.js" e altere o valor do método ".toBe()"
- Exemplo: "expect(flatAux.name).toBe('FaleMais 140')" -> "expect(flatAux.name).toBe('FaleMais 145')"  