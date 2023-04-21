// Abre o modal na pagina
function openModal(id) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

// Fecha o modal na pagina
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
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
const editPatient = async (id, data) => {
  await sendPatientData("PATCH", id, data);
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
        <button class="taBotao" onclick="openModal(${paciente.id})"><img src="../midia/adicionar.png"></button>
        <a class="taBotao"><img src="../midia/comentar.png" alt=""></a>
        <button class="taBotao" onclick="deletePatient(${paciente.id})" ><img src="../midia/deletar.png" alt=""></button>
      </td>
    <tr>
    `;
  });
};
imprimePatient();
