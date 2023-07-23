import React, { useMemo } from "react";
import styled from "styled-components";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { Link } from "gatsby";

import { Box } from "../atom";
import { mobileBreakpoint } from "../../lib/styles";

export interface PostItemProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  featuredImage?: IGatsbyImageData;
  category: string;
}

export const PostItem = (props: PostItemProps) => {
  const { slug, title, date, featuredImage, category } = props;

  const postPath = useMemo(() => {
    return `${category}${slug}`;
  }, [category, slug]);

  return (
    <Li>
      <ItemLink to={postPath}>
        <Article>
          {!!featuredImage && (
            <ThumbnailArea>
              <GatsbyImage
                image={featuredImage}
                alt={title || ""}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
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
          >
            <Box
              as="h4"
              color={"var(--color-grey-600)"}
              fontSize={["0.75rem", "0.875rem"]}
              fontWeight={700}
              mb={3}
              style={{
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {category}
            </Box>

            <Box
              as="h3"
              mb={3}
              maxWidth="500px"
              fontSize={["1.5rem", "2rem"]}
              fontWeight={700}
              lineHeight={1.4}
              wordBreak="keep-all"
            >
              {title}
            </Box>
            <Box as="time" fontSize={1} fontWeight={400} opacity={0.5}>
              {date}
            </Box>
          </TextArea>
        </Article>
      </ItemLink>
    </Li>
  );
};

const Li = styled.li``;
const Article = styled.article`
  display: flex;
  align-items: center;
  @media (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ThumbnailArea = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 220px;
  height: 220px;

  @media (max-width: ${mobileBreakpoint}) {
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 0.75rem;
  }
`;

const TextArea = styled(Box)`
  flex: 1;
  padding: 2rem;

  @media (max-width: ${mobileBreakpoint}) {
    padding: 1.25rem 0 1.25rem 2px;
  }
`;

const ItemLink = styled(Link)`
  color: var(--color-grey-900);
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
  overflow: hidden;

  transition: color 250ms ease;

  &:hover {
    color: var(--color-primary-400);
  }
`;
