function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
let dados = {
    usuarios: [
        { "id": generateUUID (), "login": "admin", "senha": "123", "nome": "Administrador do Sistema", "email": "admin@abc.com"},
        { "id": generateUUID (), "login": "user", "senha": "123", "nome": "Usuario Comum", "email": "user@abc.com"},
    ]
}


function addUser(login, senha, nome, email){
  let usuarioPegar = JSON.parse(localStorage.getItem('usuarios'));
  if(login === '' || senha === '' || nome === '' || email === '' ){
    alert('erro faltando informações para cadastro');
  }else{
    
      let usuarioExistente = JSON.parse(localStorage.getItem('usuarios'));
      let newUsuario = new Object;
      
      newUsuario.id = generateUUID();
      newUsuario.login = login;
      newUsuario.senha = senha;
      newUsuario.nome = nome;
      newUsuario.email = email;
      
      usuarioExistente.usuarios.push(newUsuario);
      
      localStorage.setItem('usuarios',JSON.stringify(usuarioExistente)); 
      alert('usuário cadastrado com sucesso');
  }
}

function pickUpUser(login){
  let usuarioPegar = JSON.parse(localStorage.getItem('usuarios'));
  
  let userPick = usuarioPegar.usuarios.filter((valor) =>{
      return valor.login === login
    })  

  return userPick;
}

function changeUser(loginAtual, login, senha, nome, email){
  let usuarioMudar = JSON.parse(localStorage.getItem('usuarios'));

  usuarioMudar.usuarios.forEach((valor) =>{
    let loginFinal = (login == undefined) ?  valor.login : login;
    let senhaFinal = (senha == undefined) ? valor.senha : senha;
    let nomeFinal = (nome == undefined) ? valor.nome : nome;
    let emailFinal = (email == undefined) ? valor.email : email;
    if(valor.login === loginAtual ){
      console.log(valor.email);
      valor.login = loginFinal;
      valor.senha = senhaFinal;
      valor.nome = nomeFinal;
      valor.email = emailFinal;
    }
  })
  
  
  localStorage.setItem('usuarios', JSON.stringify(usuarioMudar));
}

function deleteUser(login){
  let usuarioDeletar = JSON.parse(localStorage.getItem('usuarios'));

  for(let i = 0; i < usuarioDeletar.usuarios.length; i++){
    if(usuarioDeletar.usuarios[i].login === login && usuarioDeletar.usuarios[i].login){
      usuarioDeletar.usuarios.splice(i, 1);
    }
  }
  localStorage.setItem('usuarios', JSON.stringify(usuarioDeletar));
}


