import React from 'react';
import { Container } from '@chakra-ui/react';

const Page404 = props => {
  return (
    <Container {...container_style} >
      Page Not Found
    </Container>
  );
};

export default Page404;

const container_style = {
  maxW:"960px",
  marginTop:"85px",
  marginBottom:"16px"
}