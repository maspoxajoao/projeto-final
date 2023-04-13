const login = async (e) => {
  e.preventDefault();
  const apiResponse = await fetch("http://localhost:3000/users");
  const users = await apiResponse.json();

  const email = document.getElementById("txEmail").value;
  const senha = document.getElementById("txSenha").value;

  users.forEach((user) => {
    if (email === user.email && senha === user.senha)
      window.location = "/indexs/pacientes.html";
  });
};


const formulario = document.getElementById("form");
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  //Aqui eu Pego a informação do usuario e trago valores para a API em forma de objeitos
  const user = {
    name: document.getElementById("txNome").value,
    email: document.getElementById("txEmail").value,
    senha: document.getElementById("txSenha").value,
  };
  //faço confirmação de senha com true e false
  const confSenha = document.getElementById("confSenha").value;
  if (user.senha === confSenha) {
    await addApi(user);
  } else {
  }
  window.location = "/indexs/index.html";
});

function next() {
  const div1 = (document.getElementById("div1").style.display = "none");
  const div2 = (document.getElementById("div2").style.display = "block");
  console.log("rodou");
}

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
