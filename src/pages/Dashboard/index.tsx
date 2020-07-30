/* eslint-disable camelcase */
import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

interface Repository {
  // crio a tipagem só do que eu vou utilizar
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState(''); // vai armazenar o valor do input
  const [repositories, setRepositories] = useState<Repository[]>([]);

  // adição de novos repositórios
  // consumir API github
  // salvar novo repositório no estado
  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault(); // vou prevenir o evento padrão do meu form

    const response = await api.get(`repos/${newRepo}`); // o formato é o seguinte -> https://api.github.com/repos/nymalone/github-explorer então eu espero que o newRepo é o valor que o usuário digita que é nymalone/github-explorer

    const repository = response.data;

    setRepositories([...repositories, repository]); // respeitando os conceitos de imutabilidade, só quero add o que eu acabei de pesquisar
    setNewRepo(''); // para limpar meu input após o submit
  }

  return (
    <>
      <img src={logoImg} alt="logo" />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)} // aqui vai estar o valor do meu inpur
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map(repository => (
          <a key={repository.full_name} href="teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
