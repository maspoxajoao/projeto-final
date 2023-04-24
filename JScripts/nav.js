// Abre o modal na pagina
function openModal(id) {
  document.getElementById("modal").style.display = "block";
}

// Fecha o modal na pagina
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modal2").style.display = "none";
}

// Envia dados do paciente para a api
const sendPatientData = async (method, id, data) => {
  const url = id
    ? `http://localhost:3000/pacientes/${id}`
    : "http://localhost:3000/pacientes";

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

// Edita os dados de um paciente na api
const editPatient = async (id) => {
  const apiResponse = await fetch(`http://localhost:3000/pacientes/${id}`);
  const patient = await apiResponse.json();

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

let idPatient = null;

const modalForm2 = document.getElementById("formularioModal2");
if (modalForm2) {
  modalForm2.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pacientEdit = {
      CPF: document.getElementById("cpf2").value,
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
    await patientEdit(idPatient, pacientEdit)
    location.reload();
  });
}

const patientEdit = async (id, updatedPacient) => {
  await fetch(`http://localhost:3000/pacientes/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPacient),
  });
};

// Deleta um paciente da api
const deletePatient = async (id) => {
  const response = await fetch(`http://localhost:3000/pacientes/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  await imprimePatient();
};

// Adiciona um listener para o evento de submit do formulario do modal
const modalForm = document.getElementById("formularioModal");
if (modalForm) {
  modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    //  Coleta os dados dos campos do formulario do modal
    const patientData = Object.fromEntries(new FormData(modalForm).entries());

    // Envia os dados do paciente para a api atraves da funçao addPatient
    await addPatient(patientData);

    // Fecha o modal apos o envio dos dados
    closeModal();
  });
}

const imprimePatient = async () => {
  const apiResponse = await fetch(`http://localhost:3000/pacientes`);
  let pacientes = await apiResponse.json();
  console.log(pacientes);
  const listaPaciente = document.getElementById("muda");
  listaPaciente.innerHTML = "";
  pacientes.forEach((paciente) => {
    listaPaciente.innerHTML += `
    <tr>
      <td>${paciente.id}</td>
      <td>${paciente.nome}</td>
      <td>${paciente.cpf}</td>
      <td>
        <button class="taBotao"><a href="../indexs/prontuario.html"><img src="../midia/adicionar.png"></a></button>
        <button class="taBotao" onclick="editPatient(${paciente.id})"><img src="../midia/comentar.png" alt=""></button>
        <button class="taBotao" onclick="deletePatient(${paciente.id})" ><img src="../midia/deletar.png" alt=""></button>
      </td>
    <tr>
    `;
  });
};
imprimePatient();
