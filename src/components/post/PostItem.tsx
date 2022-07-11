import React, { useMemo } from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { Link } from "gatsby";

import { Box } from "../atom";

export type PostItemProps = Partial<Queries.MdxFrontmatter>;

export const PostItem = (props: PostItemProps) => {
  const { slug, title, date, featuredImage, category, color } = props;

  const postPath = useMemo(() => {
    return `${category}${slug}`;
  }, [category, slug]);

  return (
    <Li>
      <ItemLink to={postPath} $backgroundColor={color}>
        {!!featuredImage?.publicURL && (
          <>
            <Thumbnail
              src={featuredImage?.publicURL}
              alt={featuredImage?.name}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              background={rgba("black", 0.2)}
            />
          </>
        )}

        <TextArea
          position="absolute"
          zIndex={2}
          left={0}
          bottom={0}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          p="2rem"
        >
          <Box
            as="p"
            display="inline-flex"
            p="0.375rem 0.75rem"
            color={color || "var(--color-grey-900)"}
            fontSize={2}
            fontWeight={700}
            mb={3}
            background="white"
            borderRadius="2rem"
          >
            {category}
          </Box>

          <Box
            as="h4"
            mb={3}
            maxWidth={["100%", "56%"]}
            fontSize={["1.75rem", "2.25rem"]}
            fontWeight={700}
            wordBreak="keep-all"
            textAlign="center"
          >
            {title}
          </Box>
          <Box as="time" fontSize={1} fontWeight={400} opacity={0.5}>
            {date}
          </Box>
        </TextArea>
      </ItemLink>
    </Li>
  );
};

const Li = styled.li``;

const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const TextArea = styled(Box)``;

const ItemLink = styled(Link)<{ $backgroundColor?: string | null }>`
  position: relative;
  display: flex;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
  border-radius: var(--border-radius-xlarge);

  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;

  ${({ $backgroundColor }) =>
    !!$backgroundColor &&
    `
    background-color: ${$backgroundColor};
  `}

  &, & > ${TextArea} {
    transition: 0.4s ease;
  }

  & > ${Thumbnail} {
    transform: scale(1.05);
    transition: 0.6s ease;
  }

  &:hover {
    transform: scale(0.98);
    & > ${Thumbnail} {
      transform: scale(1);
    }

    & > *:not(${Thumbnail}) {
      transform: scale(1.05);
    }
  }
`;
