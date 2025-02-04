
//Variaveis:
const resultado = document.querySelector(".resultado"); /* Seleciona o primeiro elemento da classe resultado*/
const botoes = document.querySelectorAll(".buttons button"); /* Seleciona todos os botões */

let expressao = ""; //let é usada pra declarar variavel

// Atualiza o visor da calculadora
function atualizarResultado(valor = "0") {
    resultado.innerText = valor.replace(".", ",");
}//converte 

// Adiciona dígitos e operadores à expressão
//Não deixa o usu colocar mais de uma virgula
function adicionarElemento(elemento) {
    if (elemento === "," && (expressao.includes(",") || expressao === "")) return;
    expressao += elemento.replace(",", "."); /* Substitui vírgula por ponto */
    atualizarResultado(expressao);
}
//No código, uso eval() para calcular
// os valores digitados pelo usuário.
// Calcula o resultado da expressão usando eval()
//uso o regex para fazer a validacao do q o usuario digita
// ^ inicio da expressao, !negacao, $final da string
function calcularResultado() {
    try { //se ocorrer um erro dentro do try o cod n quebra
        if (!expressao) return;
        if (!/^[0-9+\-*/.() ]+$/.test(expressao)) throw "Erro"; /* Valida a expressão */
        expressao = eval(expressao).toString();
        atualizarResultado(expressao);
    } catch {
        atualizarResultado("Erro");
        expressao = "";
    }
}


function limparCalculadora() {
    expressao = "";
    atualizarResultado();
}

// Converte para porcentagem
function calcularPorcentagem() {
    try {
        expressao = (eval(expressao) / 100).toString();
        atualizarResultado(expressao);
    } catch {
        atualizarResultado("Erro");
        expressao = "";
    }
}

// Alterna o sinal do número
function alternarSinal() {
    if (expressao) {
        expressao = (eval(expressao) * -1).toString();
        atualizarResultado(expressao);
    }
}

// Adiciona eventos aos botões
botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const valorBotao = botao.innerText;
        
        if (/^[0-9,]+$/.test(valorBotao)) {
            adicionarElemento(valorBotao); //include verifica se tem valor no botao
        } else if (["+", "-", "x", "/"].includes(valorBotao)) {
            expressao += valorBotao.replace("x", "*");
            atualizarResultado(expressao);
        } else if (valorBotao === "=") {
            calcularResultado();
        } else if (valorBotao === "C") {
            limparCalculadora();
        } else if (valorBotao === "+-") {
            alternarSinal();
        } else if (valorBotao === "%") {
            calcularPorcentagem();
        }
    });
});
