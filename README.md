*📌 Desafio*

Desenvolver uma aplicação de machine learning que:

-Receba um arquivo CSV como input (via frontend)

-Processe os dados

-Treine um modelo de regressão linear

-Devolva as predições ao usuário

Toda a lógica de processamento será feita com suporte da plataforma Databricks

---

*✅ Status Atual*

*Frontend (Angular) – Finalizado*
- Tela de Upload de Arquivo CSV
- Tela de Resultado com área para exibir gráfico de regressão linear (aguardando integração com backend)

*Backend (FastAPI) – Em desenvolvimento*
- API principal construída com FastAPI
- Função dedicada para receber arquivos CSV enviados via HTTP a partir do frontend Angular

Em breve integrará com Databricks para processar os dados e retornar as predições

---
*🛠️ Tecnologias Usadas*

-Angular (Frontend)

-Tailwind CSS

-HTML5 / CSS3

-Python (FastAPI)

-Databricks (Processamento de dados e treino de modelo)

---
*🖥️ Como rodar o projeto (frontend):*

Clone o repositório:
git clone https://github.com/TaisBds/EntregaFrontPorto.git

Acesse a pasta do projeto:
cd EntregaFrontPorto

Instale as dependências:
npm install

Rode o servidor Angular:
ng serve

Abra o navegador em:
http://localhost:****

---
*🚀 Próximos Passos*

- Concluir backend com FastAPI

 Integração do backend com Databricks para:
- Pré-processamento de dados
- Treinamento e geração de predições
- Comunicação total entre frontend e backend (integração via HTTP)
- Renderizar o gráfico de regressão linear na tela de resultado

---
*👩‍💻 Desenvolvido por*

Esquadrão 11 – Projeto Fullstack com foco em soluções de IA aplicadas à visualização de dados

