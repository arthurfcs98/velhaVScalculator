let jogador = ""
let pontuacao ={}
let vencedor = 0

function iniciarJogo(){
    jogador ="X"
    document.querySelector("#jogadorDoTurno").textContent = jogador

    pontuacao= {
        X: {
            linha1:0,
            linha2:0,
            linha3:0,
            coluna1:0,
            coluna2:0,
            coluna3:0,
            diagonal1:0,
            diagonal2:0
        },
        O: {
            linha1:0,
            linha2:0,
            linha3:0,
            coluna1:0,
            coluna2:0,
            coluna3:0,
            diagonal1:0,
            diagonal2:0
        }
    }

    let campos = document.querySelectorAll("div")

    for(let campo of campos){
        campo.textContent = ""
        campo.addEventListener("click", marcarCampo)
    }

}

function removerEventosCampos(){
    let campos = document.querySelectorAll("div")

    for(let campo of campos){
        campo.removeEventListener("click", marcarCampo)
    }
}

function marcarCampo(){
    if(event.target.textContent == ''){
        event.target.textContent = jogador
        vencedor = conferirResultado(event.target.classList.value.split(" "))
        trocarJogador() 
        verificarVencedor(vencedor)     
}
}

function trocarJogador(){
    jogador = jogador == "X" ? "O" : "X"
    document.querySelector("#jogadorDoTurno").textContent = jogador 
}

function conferirResultado(classes){
    for(let classe of classes){
        pontuacao[jogador][classe] += 1
        if(pontuacao[jogador][classe] == 3){
            return true
        }
    }
    
}

function verificarVencedor(resposta){
    if(resposta){
        let jogadorVencedor = jogador
        jogadorVencedor = jogador == "X" ? "O" : "X"
        alert("jogador: " + jogadorVencedor + " venceu!")
        removerEventosCampos()
        return
    }
}

document.querySelector("button").addEventListener("click", iniciarJogo)
iniciarJogo()
