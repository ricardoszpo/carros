var carros = []
const firebaseConfig = {
    apiKey: "AIzaSyAlstn3NAtkd1qYSeI03QzdM-6EC9IUYQk",
    authDomain: "carros-403e2.firebaseapp.com",
    databaseURL: "https://carros-403e2-default-rtdb.firebaseio.com",
    projectId: "carros-403e2",
    storageBucket: "carros-403e2.appspot.com",
    messagingSenderId: "784515989521",
    appId: "1:784515989521:web:6af605141627c376ce71b0"
  };
  
firebase.initializeApp(firebaseConfig);

function identifica(botao) {
    for (var carro of carros) {
        if (carro.placa === botao.id) {
            return carro
        }
    }
    return null
}
function modal(botao) {
    var carro = identifica(botao)
    var modal = document.getElementById("myModal")
    var marca = document.getElementById("marcaModal")
    marca.innerHTML = carro.marca
    var modelo = document.getElementById("modeloModal")
    modelo.innerHTML = carro.modelo
    var preco = document.getElementById("precoModal")
    preco.innerHTML = carro.preco
    var span = document.getElementsByClassName("close")[0]
    var btnModal = document.getElementById(botao.id)
    

    btnModal.onclick = function () {
        modal.style.display = "block"
    }
    var btnExcluir = document.getElementById("excluir")
    btnExcluir.onclick = function () {
        alert("As informaçoes do carro com a placa "+ carro.placa +" foram excluidas")
        firebase.database().ref().child("Carros").child(carro.placa).remove() 
    }
    span.onclick = function () {
        modal.style.display = "none"
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }
}

var logo = document.getElementById("logo")

logo.onload = function () {
    carrega()
}
function limpatabela() {
    var tabela = document.getElementById("carros")
    tabela.innerHTML = "<thead><tr><th>Marca</th><th>Modelo</th><th>Ano</th><th>Preço</th><th>Placa</th><th></thead>"
}
function carrega() {
    limpatabela()
    var tabela = document.getElementById("carros")
    var db = firebase.database().ref().child("Carros");
    db.on('child_added', function (snapshot) {
        var carro = snapshot.val()
        var botaoid = "<td><button id='" + snapshot.key + "' class='btn-info'>Mais info</button></td>"
        var linha = "<tr><td>" +
            carro.marca + "</td><td>" +
            carro.modelo + "</td><td>" +
            carro.ano + "</td><td>" +
            carro.preco + "</td><td>" +
            carro.placa + "</td>" +
            botaoid + "</tr>"

        tabela.innerHTML += linha
        carros.push(carro)

        var botoes = document.querySelectorAll('.btn-info')
        for (var botao of botoes) {
            botao.onclick = function () {
                modal(this)
            }
        }
    })
}
