import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: #00000070;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px; 
  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: white;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
    span {
      text-decoration: underline;
    }
  }
`;

export default function Header() {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <HeaderWrapper>
        <title>The Rock (1996)</title>
        <meta property="og:title" content="Imersão Alura" />
        {/* <meta property="og:type" content="video.movie" /> */}
        <meta property="og:url" content="https://cdn.pixabay.com/photo/2017/02/08/09/44/starwars-2048262_1280.jpg" />
        <meta property="og:image" content="https://cdn.pixabay.com/photo/2017/02/08/09/44/starwars-2048262_1280.jpg" />
    </HeaderWrapper>
  );
}
