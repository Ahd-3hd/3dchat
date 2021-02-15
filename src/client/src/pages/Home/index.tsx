import { Wrapper, Title, Span, Container, Button } from './index.style';
import { v1 as uuid } from 'uuid';

const Home = (props: any) => {
  function create() {
    const id = uuid();
    props.history.push(`/room/${id}`);
  }
  return (
    <Wrapper>
      <Title>
        <Span>Proof of Concept-</Span>
        <Span>Bugs are imminent</Span>
      </Title>
      <Container>
        <Button onClick={create}>Create a room</Button>
      </Container>
    </Wrapper>
  );
};

export default Home;
