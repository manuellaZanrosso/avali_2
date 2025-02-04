// Função para carregar as notas

//VIDEO DO YT QUE EU USEI https://youtu.be/XgUlnoPresc?si=gXW6HEcglzMaCJUP
function carregarNotas() {
    const notas = JSON.parse(localStorage.getItem('notas')) || [];
    // localStorage.getItem('notas'): pega as notas armazenadas no localStorage do navegador
    // com a chave 'notas'. Se não houver nada armazenado,
    //  o JSON.parse converte o valor null para um array vazio ([]).
    const listaNotas = document.getElementById('listaNotas');
    listaNotas.innerHTML = ''; // limpa a lista antes de adicionar as notas

    notas.forEach((nota, indice) => { //forEach é um método que executa a função em cada item da lista
        const li = document.createElement('li');//ve a posicao do item na lista
        li.textContent = nota.titulo;
        
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.onclick = () => excluirNota(indice);
        
        li.appendChild(botaoExcluir);// metodo que relaciona elemento pai 
        listaNotas.appendChild(li);

        li.onclick = () => abrirNota(indice);
    });
}

// Função para criar uma nova nota
function criarNota() {
    document.getElementById('campoNota').value = ''; // limpa o campo
    document.getElementById('conteudoNota').style.display = 'block';
    indiceNotaAtual = -1; // criando uma nova nota
}

// Função para edição
function abrirNota(indice) {
    const notas = JSON.parse(localStorage.getItem('notas')) || [];//carrega o arquivo JSON
    document.getElementById('campoNota').value = notas[indice].conteudo;
    document.getElementById('conteudoNota').style.display = 'block';
    indiceNotaAtual = indice;
}

// Função para salvar ou editar a nota
function salvarNota() {
    const conteudo = document.getElementById('campoNota').value.trim(); //funcao pra ver se tem algo em branco trim
    if (!conteudo) {
        alert('A nota não pode estar vazia!');
        return;
    }

    const notas = JSON.parse(localStorage.getItem('notas')) || [];
    if (indiceNotaAtual === -1) {
        // Criar nova nota
        notas.push({ titulo: `Nota ${notas.length + 1}`, conteudo });
    } else {
        // editar nota existente
        notas[indiceNotaAtual].conteudo = conteudo;
    }

    localStorage.setItem('notas', JSON.stringify(notas));
    document.getElementById('conteudoNota').style.display = 'none';//tira a escrita que ja tem pra o usuario poder digitar
    carregarNotas();
    indiceNotaAtual = -1; // resetando o índice
}



// Função para excluir uma nota
function excluirNota(indice) {
    if (confirm('Tem certeza que deseja excluir esta nota?')) {
        const notas = JSON.parse(localStorage.getItem('notas')) || [];
        notas.splice(indice, 1); // metodo que remove a nota
        localStorage.setItem('notas', JSON.stringify(notas));
        carregarNotas(); // atualiza a lista
    }
}

// variavel para controlar o índice da nota que está sendo editada
let indiceNotaAtual = -1;

// Configuração inicial
document.getElementById('novaNotaBtn').onclick = criarNota;
document.getElementById('salvarBtn').onclick = salvarNota;


// evento que faz carregar as notas quando a página for carregada
window.onload = carregarNotas;
