// Abre o modal na página
function openModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

// Fecha o modal na página
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Envia os dados do paciente para a API
const addPaciente = async (paciente) => {
  await fetch("http://localhost:3000/pacientes", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paciente),
  });
};

// Edita os dados de um paciente na API
const editaPaciente = async (id, paciente) => {
  await fetch(`http://localhost:3000/pacientes/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paciente),
  });
};

// Deleta um paciente da API
const deletaPaciente = async (id) => {
  await fetch(`http://localhost:3000/pacientes/${id}`, {
    method: "DELETE",
  });
};

// Adiciona um listener para o evento de submit do formulário do modal
const formularioModal = document.getElementById("formularioModal");
if (formularioModal) {
  formularioModal.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Coleta os dados dos campos do formulário do modal
    const paciente = {
      CPF: document.getElementById("cpf").value,
      nome: document.getElementById("nome").value,
      dataNascimento: document.getElementById("dataNasc").value,
      email: document.getElementById("email").value,
      sexoGenero: document.getElementById("sexoGenero").value,
      nacionalidade: document.getElementById("nacionalidade").value,
      naturalidade: document.getElementById("naturalidade").value,
      profissao: document.getElementById("profissao").value,
      escolaridade: document.getElementById("escolaridade").value,
      estadoCivil: document.getElementById("estadoCivil").value,
      mae: document.getElementById("mae").value,
      pai: document.getElementById("pai").value,
    };

    // Envia os dados do paciente para a API através da função addPaciente()
    await addPaciente(paciente);

    // Fecha o modal após o envio dos dados
    closeModal();
  });
}
