const apiUrl = 'http://localhost:3000/api/';

let flatGlobal, callValueGlobal;

mostrarValores();

const button_calcular = document.querySelector('.button-calcular');
button_calcular.addEventListener("click", calcular);

function calcular() {
  const select_planos  = document.querySelector('.select-planos');
  const select_origem  = document.querySelector('.select-origem');
  const select_destino = document.querySelector('.select-destino');
  const input_tempo    = document.querySelector('.input-tempo');
  const modal_title    = document.querySelector('.modal-title');
  const modal_body     = document.querySelector('.modal-body');

  modal_body.innerHTML = modal_title.innerHTML = '';

  let plano         = Number(select_planos.options[select_planos.selectedIndex].value);
  const ddd_origem  = select_origem.options[select_origem.selectedIndex].value;
  const ddd_destino = select_destino.options[select_destino.selectedIndex].value;
  let tempo         = Number(input_tempo.value);

  modal_title.innerHTML += `VALOR DA LIGAÇÃO ENTRE OS DDDs: ${ddd_origem} E ${ddd_destino}`;

  let valor_ligacao = 0;

  for (let i = 0; i < callValueGlobal.length; i++) {
    if (ddd_origem == callValueGlobal[i].origin && ddd_destino == callValueGlobal[i].destiny) {
      valor_ligacao = callValueGlobal[i].price;
      break;
    }
  }

  if (!valor_ligacao) {
    let tr = document.createElement('tr');

    tr.innerHTML += `COM PLANO: -`;
    modal_body.appendChild(tr);

    tr = document.createElement('tr');
    tr.innerHTML += `SEM PLANO: -`;
    modal_body.appendChild(tr);
  } else {
    const sem_plano = (tempo * valor_ligacao);
    let com_plano   = 0;

    if (plano < tempo) {
      const tarifa_normal = ((tempo - plano) * valor_ligacao);
      com_plano           = (tarifa_normal + (tarifa_normal * 0.1));
    }

    let tr = document.createElement('tr');
    tr.className = 'green';
    tr.innerHTML += `COM PLANO: $ ${com_plano.toFixed(2)}`;
    modal_body.appendChild(tr);

    tr = document.createElement('tr');
    tr.className = 'red';
    tr.innerHTML += `SEM PLANO: $ ${sem_plano.toFixed(2)}`;
    modal_body.appendChild(tr);
  }

  $('#valorLigacao').modal('show');
}

function adicionarElementosNaPagina(flats, callValues) {
  //console.log(flats, callValues);

  const planos_tbody  = document.querySelector('#planos-tbody');
  const ddds_tbody    = document.querySelector('#ddds-tbody');
  const select_planos = document.querySelector('.select-planos');

  for (let i = 0; i < flats.length; i++) {
    let tds  = '';
    const tr = document.createElement('tr');

    tds += `<td>${flats[i].name}</td>`;
    tds += `<td>${flats[i].time}</td>`;

    tr.innerHTML += tds;
    planos_tbody.appendChild(tr);

    let option = new Option('PLANO | ' + flats[i].name, flats[i].time);

    if (i == 0) 
      option.selected = true;

    select_planos.add(option);
  }

  const select_origem  = document.querySelector('.select-origem');
  const select_destino = document.querySelector('.select-destino');

  let ddds = [];

  for (let i = 0; i < callValues.length; i++) {
    let tds = '';
    const tr = document.createElement('tr');

    tds += `<td>${callValues[i].origin}</td>`;
    tds += `<td>${callValues[i].destiny}</td>`;
    tds += `<td>${callValues[i].price.toFixed(2)}</td>`;

    tr.innerHTML += tds;
    ddds_tbody.appendChild(tr);

    ddds.push(callValues[i].origin);
  }

  ddds = [...new Set(ddds)];

  for (let i = 0; i < ddds.length; i++) {
    let option1 = new Option(ddds[i], ddds[i]);
    let option2 = new Option(ddds[i], ddds[i]);

    select_origem.add(option1);
    select_destino.add(option2);
  }
}

async function mostrarValores() {
  try {
    flatGlobal      = await getAPI('flat');
    callValueGlobal = await getAPI('callvalue');

    adicionarElementosNaPagina(flatGlobal, callValueGlobal);
  } catch(erro) {
    console.log(erro);
  }
}

async function getAPI(table) {
  return new Promise(async (next, reject) => {
    try {
      const chamada = await fetch(`${apiUrl}${table}`, {
        method: 'GET'
      });
      const dados = await chamada.json();
  
      if(dados.erro)
        return reject(dados.erro);
  
      next(dados);
    } catch(error) {
      reject('Não foi Possível Conectar ao Servidor');
    }
  });
}