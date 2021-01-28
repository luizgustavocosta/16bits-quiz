/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import Footer from '../src/components/Footer';
import { Router, useRouter } from 'next/router';
import Input from '../src/components/Input';
import Button from '../src/components/Button';


export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  // Hooks alwasy before the return
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>The Star Wars Saga Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (event) {
              event.preventDefault();
              router.push(`quiz?name=${name}`);
              
            }}>
              <Input
                name="userName"
                onChange={(currentEvent) => {
                    setName(currentEvent.target.value);
                }}
                placeholder="Digite o seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Play ${name}`}
              </Button>
            </form>
           </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Let's start...</h1>
          </Widget.Header>
          <Widget.Content>
            <p>This is the way ...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/luizgustavocosta" />
    </QuizBackground>
  );
}
