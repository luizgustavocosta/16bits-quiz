import styled from 'styled-components'
import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import GitHubCorner from '../src/components/GitHubCorner'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

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
  return (    
    <QuizBackground backgroundImage={db.bg}>
      <Header></Header>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>The Star Wars Saga Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Teste seu conhecimento desta saga</p>
            <p>May the force be with you and</p>
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
