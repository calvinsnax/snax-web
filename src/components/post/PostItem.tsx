import React, { useMemo } from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { Link } from "gatsby";

import { Box } from "../atom";

export interface PostItemProps {
  slug?: string;
  title?: string;
  date?: string;
  featuredImage?: {
    publicURL: string;
    name: string;
  };
  category?: string;
  color?: string;
}

export const PostItem = (props: PostItemProps) => {
  const { slug, title, date, featuredImage, category, color } = props;

  const postPath = useMemo(() => {
    return `${category}${slug}`;
  }, [category, slug]);

  return (
    <Li>
      <ItemLink to={postPath}>
        {!!featuredImage?.publicURL && (
          <ThumbnailArea>
            <Thumbnail
              src={featuredImage?.publicURL}
              alt={featuredImage?.name}
            />
          </ThumbnailArea>
        )}

        <TextArea
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          width="100%"
          height="100%"
          p="2rem"
        >
          <Box
            as="p"
            display="inline-flex"
            p="0.375rem 0.75rem"
            color={color || "var(--color-grey-900)"}
            fontSize={1}
            fontWeight={700}
            mb={3}
            background="white"
            border="1px solid var(--color-grey-200)"
            borderRadius="2rem"
          >
            {category}
          </Box>

          <Box
            as="h4"
            mb={3}
            fontSize={["1.25rem", "1.5rem"]}
            fontWeight={700}
            wordBreak="keep-all"
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

const ItemLink = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--color-float-background);
  border-radius: var(--border-radius-basic);
  box-shadow: 0 0.5rem 1rem var(--color-opacity-200);

  color: var(--color-grey-900);
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
  overflow: hidden;
`;

const ThumbnailArea = styled.div`
  position: relative;
  padding-bottom: 56.25%;
`;
