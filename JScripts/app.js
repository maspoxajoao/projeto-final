//Aqui guardo a informação para a API

const addApi = async (usuario) => {
  await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
};

const formularioLogin = document.getElementById("formulario");
const formularioCadastro = document.getElementById("form");

if (formularioCadastro) {
  formularioCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();
    //Aqui eu Pego a informação do usuario e trago valores para a API em forma de objeitos
    const user = {
      name: document.getElementById("txNome")?.value,
      email: document.getElementById("txEmail").value,
      senha: document.getElementById("txSenha").value,
      paciente: [],
    };
    //faço confirmação de senha com true e false
    const confSenha = document.getElementById("confSenha")?.value;
    if (user.senha === confSenha) {
      await addApi(user);
      window.location = "/indexs/index.html";
    } else {
      window.alert("[ERRO] As senhas nao são semelhantes");
    }
  });

  /*
EXEMPLO DE FUNÇÂO

async function fetchId() {
  try {
    const response = await fetch('https://exemplo.com/api/dados');
    const data = await response.json();
    const id = data.id;
    console.log(id); // Imprime o ID na saída do console
  } catch (error) {
    console.error(error);
  }
}

fetchId();*/
}

function next() {
  const div1 = (document.getElementById("div1").style.display = "none");
  const div2 = (document.getElementById("div2").style.display = "block");
  console.log("rodou");
}

if (formularioLogin) {
  formularioLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("txEmail").value;

    const apiResponse = await fetch(
      `http://localhost:3000/users?email=${email}`
    );
    const users = await apiResponse.json();

    const senha = document.getElementById("txSenha").value;

    users.forEach((user) => {
      if (email === user.email && senha === user.senha)
        window.location = "/indexs/pacientes.html";
      else {
        window.alert("[ERRO] Email ou senha incorreto!");
      }
    });
  });
}

function openModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}
