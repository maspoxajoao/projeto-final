function openModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
  }
  
  function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  }
  
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
  
  const formularioModal = document.getElementById("formularioModal");
  
  if (formularioModal) {
    formularioModal.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("teste")
      // Aqui eu pego a informação dos pacientes no HTML e trago valores para a API em forma de objetos
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
      
      // Envia os dados do paciente para a API
      await addPaciente(paciente);
      
      // Fecha o modal após o envio dos dados
      closeModal();
    });
  }