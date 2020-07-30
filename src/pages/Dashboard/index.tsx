import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="logo" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/54912285?s=460&u=137cc853fca83655d59fc8d2fb95dbf21a3d496d&v=4"
            alt="avatar"
          />

          <div>
            <strong>nymalone/github-explorer</strong>
            <p>A platform to search for repositories</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/54912285?s=460&u=137cc853fca83655d59fc8d2fb95dbf21a3d496d&v=4"
            alt="avatar"
          />

          <div>
            <strong>nymalone/github-explorer</strong>
            <p>A platform to search for repositories</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/54912285?s=460&u=137cc853fca83655d59fc8d2fb95dbf21a3d496d&v=4"
            alt="avatar"
          />

          <div>
            <strong>nymalone/github-explorer</strong>
            <p>A platform to search for repositories</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
