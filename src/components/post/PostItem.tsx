import React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { Link } from "gatsby";
import { Box } from "../atom";

type PostItemProps = Partial<Queries.MdxFrontmatter>;

export const PostItem = (props: PostItemProps) => {
  const {
    slug,
    title,
    date,
    featuredImage,
    category,
    categoryBackgroundColor,
    categoryTextColor,
  } = props;

  return (
    <Li>
      <ItemLink to={slug ? "/blog" + slug : "/404"}>
        <Thumbnail
          src={featuredImage?.publicURL ?? ""}
          alt={featuredImage?.name}
        />

        <Box
          position="absolute"
          zIndex={1}
          left={0}
          bottom={0}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          background={rgba("black", 0.2)}
          p="2rem"
        >
          <Box
            as="p"
            display="inline-flex"
            p="0.5rem 1rem"
            color={categoryTextColor || "var(--color-grey-600)"}
            fontSize={3}
            fontWeight={700}
            mb={3}
            background={categoryBackgroundColor || "white"}
            borderRadius="2rem"
          >
            {category}
          </Box>
          <Box
            as="h4"
            mb={4}
            mx={6}
            fontSize={6}
            fontWeight={700}
            wordBreak="keep-all"
            textAlign="center"
          >
            {title}
          </Box>
          <Box as="time" fontSize={2} opacity={0.5}>
            {date}
          </Box>
        </Box>
      </ItemLink>
    </Li>
  );
};

const Li = styled.li`
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ItemLink = styled(Link)`
  position: relative;
  display: flex;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
  border-radius: 1rem;

  color: white;
  font-size: 2rem;
  font-weight: 700;
  text-decoration: none;

  transition: 0.4s ease;

  & > ${Thumbnail} {
    transition: 0.4s ease;
  }

  & > *:not(${Thumbnail}) {
    transition: 0.4s ease;
  }

  &:hover {
    transform: scale(1.01);
    & > ${Thumbnail} {
      transform: scale(1.1);
    }

    & > *:not(${Thumbnail}) {
      opacity: 0.5;
    }
  }
`;
