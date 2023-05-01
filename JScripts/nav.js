// Abre o modal na pagina
function openModal(id) {
  document.getElementById("modal").style.display = "block";
}

// Fecha o modal na pagina
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modal2").style.display = "none";
}

//abre o menu da pagina para sair
function out() {
  document.getElementById("janela").style.display = "block";
}

// Envia dados do paciente para a api
const sendPatientData = async (method, id, data) => {
  const url = id
    ? `https://projeto-final-back-end-1iuq.onrender.com/${id}`
    : "https://projeto-final-back-end-1iuq.onrender.com";

  await fetch(url, {
    method,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

//  Adiciona um novo paciente na api
const addPatient = async (data) => {
  await sendPatientData("POST", null, data);
  await imprimePatient();
};

// Pega os dados da api para editar
const editPatient = async (id) => {
  const apiResponse = await fetch(
    `https://projeto-final-back-end-1iuq.onrender.com/pacientes/${id}`
  );
  const patient = await apiResponse.json();

  //transformo os dados do primeiro modal html
  document.getElementById("cpf2").value = patient.cpf;
  document.getElementById("nome2").value = patient.nome;
  document.getElementById("dataNasc2").value = patient.dataNasc;
  document.getElementById("email2").value = patient.email;
  document.getElementById("sexoGenero2").value = patient.sexoGenero;
  document.getElementById("nacionalidade2").value = patient.nascionalidade;
  document.getElementById("naturalidade2").value = patient.naturalidade;
  document.getElementById("profissao2").value = patient.profissao;
  document.getElementById("escolaridade2").value = patient.escolaridade;
  document.getElementById("estadoCivil2").value = patient.estadoCivil;
  document.getElementById("mae2").value = patient.mae;
  document.getElementById("pai2").value = patient.pai;

  document.getElementById("modal2").style.display = "block";

  idPatient = id;
};

// Salva os novos dados do paciente na api
let idPatient = null;

const modalForm2 = document.getElementById("formularioModal2");
if (modalForm2) {
  modalForm2.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pacientEdit = {
      cpf: document.getElementById("cpf2").value,
      nome: document.getElementById("nome2").value,
      dataNascimento: document.getElementById("dataNasc2").value,
      email: document.getElementById("email2").value,
      sexoGenero: document.getElementById("sexoGenero2").value,
      nacionalidade: document.getElementById("nacionalidade2").value,
      naturalidade: document.getElementById("naturalidade2").value,
      profissao: document.getElementById("profissao2").value,
      escolaridade: document.getElementById("escolaridade2").value,
      estadoCivil: document.getElementById("estadoCivil2").value,
      mae: document.getElementById("mae2").value,
      pai: document.getElementById("pai2").value,
    };

    await patientEdit(idPatient, pacientEdit);
    location.reload();
  });
}

//Edita os dados na api
const patientEdit = async (id, updatedPacient) => {
  await fetch(
    `https://projeto-final-back-end-1iuq.onrender.com/pacientes/${id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPacient),
    }
  );
};

// Deleta um paciente da api
const deletePatient = async (id) => {
  const response = await fetch(
    `https://projeto-final-back-end-1iuq.onrender.com/pacientes/${id}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    }
  );
  await imprimePatient();
};

// Adiciona um listener para o evento de submit do formulario do modal
const modalForm = document.getElementById("formularioModal");
if (modalForm) {
  modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    //  Pega todos os dados dos campos do formulario
    const patientData = Object.fromEntries(new FormData(modalForm).entries());
    await addPatient(patientData);

    closeModal();
  });
}

// Coloca o nome registrado pelo usuario
const replaceUserName = () => {
  const userName = localStorage.getItem("userName");
  console.log(userName);
  const nomeUser = document.getElementById("nomeUser");
  nomeUser.innerHTML = userName;
  const nomeUser2 = document.getElementById("nomeUser2");
  nomeUser2.innerHTML = userName;
};
replaceUserName();

// Monta a tabela dos pacientes cadastrados
const montarTabela = (pacientes) => {
  const listaPaciente = document.getElementById("corpo");
  listaPaciente.innerHTML = "";
  pacientes.forEach((paciente) => {
    listaPaciente.innerHTML += `
    <tr>
      <td>${paciente.id}</td>
      <td>${paciente.nome}</td>
      <td>${paciente.cpf}</td>
      <td>
        <button class="taBotao"><a href="./prontuario.html"><img src="./midia/adicionar.png"></a></button>
        <button class="taBotao" onclick="editPatient(${paciente.id})"><img src="./midia/comentar.png" alt=""></button>
        <button class="taBotao" onclick="deletePatient(${paciente.id})" ><img src="./midia/deletar.png" alt=""></button>
      </td>
    <tr>
    `;
  });
};

//Tabela completa com todos os pacientes
const imprimePatient = async () => {
  const apiResponse = await fetch(
    `https://projeto-final-back-end-1iuq.onrender.com/pacientes`
  );
  let pacientes = await apiResponse.json();
  montarTabela(pacientes);
};

//Mostra apenas pacientes pesquisados
const filter = async (namePatient) => {
  const nome = document.getElementById("txpesquisa").value;
  const apiResponse = await fetch(
    `https://projeto-final-back-end-1iuq.onrender.com/pacientes?nome_like=${nome}`
  );
  const patientName = await apiResponse.json();
  montarTabela(patientName);
};

imprimePatient();
