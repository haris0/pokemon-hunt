import React from 'react';
import { Container } from '@chakra-ui/react';

const CollectionPage = () => {
  return (
    <Container {...container_style}>
      Collection Page
    </Container>
  );
};

export default CollectionPage;

const container_style = {
  maxW:"960px",
  marginTop:"85px",
  marginBottom:"16px"
}