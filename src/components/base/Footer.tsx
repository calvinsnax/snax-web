import React from "react";
import { Box, Container } from "../atom";

export const Footer = () => {
  return (
    <Box background="var(--color-grey-50)" py="3rem">
      <Container>
        <Box as="address" color="var(--color-grey-500)" fontSize="0.875rem">
          Copyright © SNAX. All Rights Reserved.
        </Box>
      </Container>
    </Box>
  );
};
