// Dados das expressões (exemplo)
        const expressoes = [
            {
                id: "1",
                pt: "Bater as botas",
                fr: "Casser sa pipe",
                significado: "Morrer",
                exemplo_pt: "Ele bateu as botas ontem.",
                exemplo_fr: "Il a cassé sa pipe hier.",
                favorito: false
            },
            {
                id: "2",
                pt: "Estar nas nuvens",
                fr: "Être sur un petit nuage",
                significado: "Estar muito feliz",
                exemplo_pt: "Estou nas nuvens com a notícia.",
                exemplo_fr: "Je suis sur un petit nuage avec la nouvelle.",
                favorito: false
            },
            {
                id: "3",
                pt: "Ficar de boca aberta",
                fr: "Rester bouche bée",
                significado: "Ficar surpreso",
                exemplo_pt: "Fiquei de boca aberta com o presente.",
                exemplo_fr: "Je suis resté bouche bée avec le cadeau.",
                favorito: false
            },
            {
                id: "4",
                pt: "Colocar os pingos nos is",
                fr: "Mettre les points sur les i",
                significado: "Esclarecer algo",
                exemplo_pt: "Preciso colocar os pingos nos is nessa história.",
                exemplo_fr: "Je dois mettre les points sur les i dans cette histoire.",
                favorito: false
            },
            {
                id: "5",
                pt: "A conta chegou",
                fr: "L'addition est salée",
                significado: "Algo é caro",
                exemplo_pt: "A conta do restaurante chegou, e a adição estava salgada.",
                exemplo_fr: "L'addition du restaurant est arrivée, et l'addition était salée.",
                favorito: false
            }
        ];

        // Dados das aulas (exemplo)
        const aulas = [
            {
                titulo: "Pronúncia do Francês",
                descricao: "Aprenda os sons básicos do francês e como pronunciá-los corretamente.",
                tipo: "video",
                conteudo: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Substitua com o link do vídeo
            },
            {
                titulo: "Verbos Essenciais",
                descricao: "Conjugue os verbos mais importantes do francês.",
                tipo: "texto",
                conteudo: "Lista dos verbos essenciais: être, avoir, aller, faire...", // Simplificado para caber no exemplo
            },
            {
                titulo: "Cumprimentos em Francês",
                descricao: "Saiba como dizer olá, tchau e outras saudações.",
                tipo: "video",
                conteudo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            }
        ];

        let favoritos = []; // Array para armazenar os IDs dos favoritos

        // Função para alternar o status de favorito de uma expressão
        function alternarFavorito(botao) {
            const idExpressao = botao.dataset.id;
            const index = favoritos.indexOf(idExpressao);

            if (index === -1) {
                favoritos.push(idExpressao);
                botao.textContent = "Remover dos Favoritos";
                // Atualizar a interface para mostrar que foi favoritado
            } else {
                favoritos.splice(index, 1);
                botao.textContent = "Adicionar aos Favoritos";
                // Atualizar a interface para mostrar que foi removido dos favoritos
            }
            exibirFavoritos(); // Atualiza a lista de favoritos exibida
        }

        // Função para exibir as expressões na página
        function exibirExpressoes() {
            const expressoesContainer = document.getElementById("expressoes-container");
            expressoesContainer.innerHTML = ''; // Limpa o container

            for (let expressao of expressoes) {
                const expressaoCard = document.createElement("div");
                expressaoCard.className = "expressao-card";
                expressaoCard.innerHTML = `
                    <h3>${expressao.pt}</h3>
                    <p><strong>Francês:</strong> ${expressao.fr}</p>
                    <p><strong>Significado:</strong> ${expressao.significado}</p>
                    <p><strong>Exemplo (PT):</strong> ${expressao.exemplo_pt}</p>
                    <p><strong>Exemplo (FR):</strong> ${expressao.exemplo_fr}</p>
                    <div class="favorito">
                        <button data-id="${expressao.id}" onclick="alternarFavorito(this)">
                            ${expressao.favorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                        </button>
                    </div>
                `;
                expressoesContainer.appendChild(expressaoCard);
            }
        }

        // Função para exibir as aulas na página
        function exibirAulas() {
            const aulasContainer = document.getElementById("aulas-container");
            aulasContainer.innerHTML = ''; // Limpa o container

            for (let aula of aulas) {
                const aulaCard = document.createElement("div");
                aulaCard.className = "aula-card";
                aulaCard.innerHTML = `
                    <h3>${aula.titulo}</h3>
                    <p>${aula.descricao}</p>
                `;

                if (aula.tipo === "video") {
                    const iframe = document.createElement('iframe');
                    iframe.src = aula.conteudo;
                    iframe.width = '100%';
                    iframe.height = '315';  // Altura padrão para vídeos do YouTube
                    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                    iframe.allowFullscreen = true; // Permite tela cheia
                    aulaCard.appendChild(iframe);

                } else if (aula.tipo === "texto") {
                    aulaCard.innerHTML += `<p>${aula.conteudo}</p>`;
                }

                aulasContainer.appendChild(aulaCard);
            }
        }

        // Função para exibir os favoritos na página
        function exibirFavoritos() {
            const favoritosContainer = document.getElementById("favoritos-container");
            favoritosContainer.innerHTML = ''; // Limpa o container

            if (favoritos.length === 0) {
                favoritosContainer.innerHTML = `<p>Você ainda não adicionou nenhuma expressão aos seus favoritos.</p>`;
            } else {
                const listaFavoritos = document.createElement("ul");
                listaFavoritos.style.listStyleType = 'none'; // Remove marcadores de lista
                listaFavoritos.style.paddingLeft = '0'; // Remove padding esquerdo

                for (let idFavorito of favoritos) {
                    const expressao = expressoes.find(e => e.id === idFavorito); // Encontra a expressão pelo ID
                    if (expressao) { // Verifica se a expressão foi encontrada
                         const itemFavorito = document.createElement("li");
                         itemFavorito.className = 'favorito-item'; // Adiciona classe para estilização
                         itemFavorito.innerHTML = `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #ddd;">
                                <div>
                                    <p style="font-weight: bold; margin-bottom: 5px;">${expressao.pt}</p>
                                    <p style="color: #555;">${expressao.fr}</p>
                                </div>
                            </div>
                         `;
                        listaFavoritos.appendChild(itemFavorito);
                    }
                }
                favoritosContainer.appendChild(listaFavoritos);
            }
        }

        // Chamadas das funções para exibir o conteúdo ao carregar a página
        window.onload = function() {
            exibirExpressoes();
            exibirAulas();
            exibirFavoritos();
        };
    </script>