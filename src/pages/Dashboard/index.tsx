/* eslint-disable camelcase */
import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

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
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    // se essa variável estiver presente
    if (storageRepositories) {
      // de dentro dessa função eu vou retornar
      return JSON.parse(storageRepositories); // .parse pq preciso desconverter ele em array
    }
    // se ele não encontrar nada dentro do storage
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories), // TS não aceita o array, preciso converter para string
    ); // nome para evitar conflito local de mais de uma aplicação utilizar port 3000 por exemplo
  }, [repositories]); // vou disparar essa função sempre que algo mudar dentro do meu repositories

  // adição de novos repositórios
  // consumir API github
  // salvar novo repositório no estado
  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault(); // vou prevenir o evento padrão do meu form

    // caso haja submit vazio
    if (!newRepo) {
      setInputError('Digite autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get(`repos/${newRepo}`); // o formato é o seguinte -> https://api.github.com/repos/nymalone/github-explorer então eu espero que o newRepo é o valor que o usuário digita que é nymalone/github-explorer

      const repository = response.data;

      setRepositories([...repositories, repository]); // respeitando os conceitos de imutabilidade, só quero add o que eu acabei de pesquisar
      setNewRepo(''); // para limpar meu input após o submit
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse respositório.');
    }
  }

  return (
    <>
      <img src={logoImg} alt="logo" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)} // aqui vai estar o valor do meu inpur
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
