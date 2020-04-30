let inputResultado = document.querySelector("#inputDisplayResultado");
let textAreaHistorico = document.querySelector("#textAreaHistorico");

let calculo = {
    valorSalvo: null,
    funcaoParaCalcular: null
}

window.addEventListener('load',atribuirEventos)

function atribuirEventos(){
    document.querySelector("#btnLimpar").addEventListener('click', limparDados)
    document.querySelector("#btnPonto").addEventListener('click', clicarPonto)
    document.querySelector("#btnResultado").addEventListener('click', clicarResultado)

    let numeros = document.querySelectorAll('.btn-numero')
    let operacoes = document.querySelectorAll('.btn-operador')

    numeros.forEach(function(numero){
        numero.addEventListener('click', clicarNumero)
    })
    operacoes.forEach(function(numero){
        numero.addEventListener('click', clicarOperador)
    })        
}

function limparDados(){
    inputResultado.value = ""
    inserirTextoHistorico("----")
    funcaoParaCalcular = null
    valorSalvo = null
    dasabilitarBotoes(false)
}

function dasabilitarBotoes(desabilitar){
    let botoes = document.querySelectorAll(".btn")
    botoes.forEach(function(botao){
        botao.disabled = desabilitar
    })
    document.querySelector("#btnLimpar").disabled = false
}

function inserirTextoHistorico(texto){
    textAreaHistorico.textContent += texto + "\n"
    textAreaHistorico.scrollTop = textAreaHistorico.scrollHeight
}

function clicarPonto(){
    if(isNaN(inputResultado.value)){
        inserirTextoHistorico(inputResultado.value)
    }
    if(inputResultado.value == "" || isNaN(inputResultado.value)){
        inputResultado.value = '0.'
    } else if (!inputResultado.value.includes('.')){
        inputResultado.value += '.'
    }
}

function clicarNumero(){
    let novoValor = event.target.textContent

    if(isNaN(inputResultado.value)){
        inserirTextoHistorico(inputResultado.value)
        inputResultado.value = novoValor
    }else {
        if(inputResultado.value == 0 && inputResultado.value !=="0."){
            inputResultado.value = novoValor
        } else{
            inputResultado.value += novoValor
        }

    }
}

function clicarOperador(){
    if(!isNaN(inputResultado.value)){
        let novoValor = Number(inputResultado.value)
        if(calculo.valorSalvo == 0 || calculo.funcaoParaCalcular == null){
            calculo.valorSalvo = novoValor
        }else{
            calculo.valorSalvo = calculo.funcaoParaCalcular(calculo.valorSalvo, novoValor)
        }
        inserirTextoHistorico(calculo.valorSalvo)
    }

    let operador = event.target.textContent
    atribuirOperacao(operador)
    inputResultado.value = operador
}

function clicarResultado(){
    if(!isNaN(inputResultado.value) && calculo.funcaoParaCalcular != null){
        let resultado = calculo.funcaoParaCalcular(calculo.valorSalvo, Number(inputResultado.value))

        inserirTextoHistorico(inputResultado.value + '\n=' + resultado)
        inputResultado.value = resultado;
        calculo.valorSalvo = resultado

        calculo.funcaoParaCalcular = null
    }
}

function atribuirOperacao(operador){
    switch(operador){
        case '+':
            calculo.funcaoParaCalcular = somar
            break
        case '-':
            calculo.funcaoParaCalcular = subtrair
            break
        case '*':
            calculo.funcaoParaCalcular = multiplicar
            break
        case '/':
            calculo.funcaoParaCalcular = dividir
            break
        default:
            calculo.funcaoParaCalcular = null
            break    
    }
}


function somar(valor1, valor2){
    return valor1 + valor2
}

function subtrair(valor1, valor2){
    return valor1 - valor2
}

function multiplicar(valor1, valor2){
    return valor1 * valor2
}

function dividir(valor1, valor2){
    if(valor2 == 0){
        dasabilitarBotoes(true)
        return "ERRO, DIVISÃO POR 0"
    }else {
        return valor1/valor2
    }
}
