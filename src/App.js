//Importação do useState e useEffect para mudança de estados(imutabilidade)
import React, {useState, useEffect} from "react"; 

//Importação da api que usaremos para chamar as rotas criadas no Back-end
 
import api from "./services/api";

import "./styles.css";

function App() {
  //Array que guardará todos os registros
  const [repositories, setRepositories] = useState([]);

  //Evento disparado uma única vez na inicialização da página para carregar os registros
  useEffect(() =>{
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, {});

  //Inclusão do Repositório através da rota post
  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: "Novo Projeto",
      url: "Fernando Freitas",
      techs: "Java Script"
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  //Remoção do Repositório através da rota delete
  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);

    const filteredRepositories = repositories.filter((repository) => {
      return repository.id !== id;
    });

    setRepositories(filteredRepositories);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          //Percorre o Array de Repositórios
          repositories.map(repository => (
            //Colocando a chave no item da lista
            //O título e botões no conteúdo
            //Chamando a função de remover no botão;
            <li key={repository.id}>              
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>  
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
