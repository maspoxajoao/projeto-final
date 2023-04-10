//Aqui eu Pego a informação do usuario e trago valores para a API em forma de objeitos
const create = async () => {
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
};


function next() {
  const div1 = document.getElementById('div1').style.display="none"
  const div2 = document.getElementById('div2').style.display ="block"
  console.log('rodou')
}
//Aqui guardo a informação do usauario na API

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
