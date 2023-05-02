//faz uma requisição POST para a API
// para adicionar um usuário ao banco de dados
const addApi = async (usuario) => {
  await fetch("https://projeto-final-back-end-1iuq.onrender.com/users", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
};

// Seleciona o formulario de cadastro e adiciona um listener de evento
if (document.getElementById("form")) {
  document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtém os valores do formulario de cadastro
    const user = {
      name: document.getElementById("txNome")?.value,
      email: document.getElementById("txEmail").value,
      senha: document.getElementById("txSenha").value,
    };

    // Confirmação de senha
    const confSenha = document.getElementById("confSenha")?.value;
    if (user.senha === confSenha) {
      // Adiciona o usuario na API e redireciona para a página inicial
      await addApi(user);
      window.location = "./index.html";
    } else {
      window.alert("[ERRO] As senhas nao são semelhantes");
    }
  });
}

// Seleciona o formulário de login e adiciona um listener de evento
if (document.getElementById("formulario")) {
  document
    .getElementById("formulario")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      // Obtém os valores do formulário de login
      const email = document.getElementById("txEmail").value;
      const senha = document.getElementById("txSenha").value;

      // Faz um GET para a API buscando um usuário por email
      const apiResponse = await fetch(
        `https://projeto-final-back-end-1iuq.onrender.com/users?email=${email}`
      );
      const users = await apiResponse.json();

      // Verifica se o email e senha são válidos
      let valid = false;
      users.forEach(async (user) => {
        if (email === user.email && senha === user.senha) {
          valid = true;
          await saveUserName(user.name);
          window.location = `./pacientes.html?id=${user.id}`;
        }
      });

      if (!valid) {
        window.alert("[ERRO] Email ou senha incorreto!");
      }
    });
}
// Função troca tela para cadastro
function next() {
  document.getElementById("div1").style.display = "none";
  document.getElementById("div2").style.display = "block";
}

// Salva o nome no local storage
const saveUserName = async (name) => {
  localStorage.setItem("userName", name);
};
