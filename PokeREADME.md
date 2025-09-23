README — PokeList App








1. Propósito da aplicação

A PokeList App é uma aplicação front-end em React + TypeScript que consome a PokeAPI para exibir listas de Pokémon de forma dinâmica.

O objetivo principal é treinar:

Consumo de API pública

Tipagem estática com TypeScript

Estilização encapsulada via styled-components

Navegação simples com react-router-dom

Organização de componentes reutilizáveis e contexto de tema

2. Funcionalidades entregues
📋 Lista de Pokémons

Carregamento de uma lista principal de 10 Pokémons aleatórios.

Carregamento de uma segunda lista “extra” (também 10 aleatórios), exibida quando a prop showExtra estiver ativa.

Filtro por tipo (select) — busca no endpoint /type/{type}.

Exibição de nome capitalizado, imagem oficial e tipos de cada Pokémon.

Tratamento de estados de loading e error com mensagens amigáveis.

Links para a rota de detalhe (/pokemon/:name).

🔎 Página de Detalhes

Nome e imagem oficial do Pokémon.

Tipos listados.

Descrição (flavor text) extraída do endpoint /pokemon-species.

Lista dos 5 primeiros movimentos.

Integração com ThemeContext para cores dinâmicas.

🎨 Estilização

Uso de styled-components para estilos encapsulados.

ThemeContext para trocar cores de fundo e textos dinamicamente.

🛡️ Tipagem TypeScript

Interfaces para entidades principais (PokemonResumo, PokemonDetalhes, PokemonTypeSlot, PokemonMoveSlot etc.).

3. Ferramentas utilizadas

React — interface declarativa baseada em componentes.

TypeScript — tipagem estática para mais segurança e manutenção.

styled-components — estilos dinâmicos encapsulados.

react-router-dom — roteamento e navegação.

Fetch API — consumo direto da PokeAPI.

PokeAPI (https://pokeapi.co
) — fonte de dados pública.

Vite — dev server rápido e build otimizado.

4. Decisões adotadas

Busca por tipo no servidor → evita trazer toda a lista de Pokémons localmente.

Dois batches (principal + extra) → maior flexibilidade de exibição.

Randomização simples (shuffle()) → garante variedade sem precisar de lógica complexa de backend.

Detalhes via dois endpoints → /pokemon/{name} e /pokemon-species/{name} para enriquecer a experiência do usuário.

Uso de TypeScript → previne erros comuns em runtime.

Simplicidade acima de otimização prematura → sem cache ou libs extras de dados neste momento.

5. Como rodar o projeto
Pré-requisitos

Node.js (recomendado v16 ou v18+)

npm ou yarn

Git (opcional)

Clonar o repositório
git clone https://github.com/SEU_USUARIO/SEU_REPO.git
cd SEU_REPO

Instalar dependências
npm install
# ou
yarn install

Rodar em modo desenvolvimento
Vite
npm run dev
# ou
yarn dev


Acesse: http://localhost:5173

CRA
npm start
# ou
yarn start


Acesse: http://localhost:3000

Build para produção
npm run build
# ou
yarn build

Preview (Vite)
npm run preview
# ou
yarn preview

6. Estrutura de arquivos
/src
  /components
    List.tsx
  /pages
    PokemonDetalhesPage.tsx
  /contexts
    themeContext.tsx
  App.tsx
  main.tsx
package.json
README.md

7. Prints da aplicação

(Adicione imagens reais do projeto após rodar localmente — exemplo abaixo)

Lista de Pokémons


Página de detalhes


8. Melhorias futuras

✅ Paginação da lista de Pokémons

✅ Dark/Light theme mais completo

✅ Testes unitários com Jest + React Testing Library

✅ Cache de requisições com React Query

✅ Melhor responsividade em mobile

9. Contribuindo

Sinta-se livre para abrir issues e enviar pull requests 🚀
Sugestões são sempre bem-vindas!

10. Créditos

Dados: PokeAPI

Implementação: SerpianDevStack (João Lucas Gomes) — fiz essa aplicação inspirado em uma versão anterior, mas reorganizando a lógica, simplificando e tornando mais eficiente para treinar consumo de API.