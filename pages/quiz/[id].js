/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ thirdParty }) {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ThemeProvider theme={thirdParty.theme}>
      <QuizScreen
        externalQuestions={thirdParty.questions}
        externalBg={thirdParty.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  try {
    const thirdParty = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((serverResponse) => {
        if (serverResponse.ok) {
          return serverResponse.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((responseToObject) => responseToObject)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });

    return {
      props: {
        thirdParty,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
