import React, { ReactNode } from "react";
import { useSiteMetadata } from "../../hooks";
import { Helmet } from "react-helmet";

export interface SeoProps {
  title?: string;
  description?: ReactNode;
  image?: string | null;
  pathname?: string;
  keyword?: string;
  children: ReactNode;
}

export const Seo = (props: SeoProps) => {
  const { children, title, description, image, pathname } = props;

  const {
    title: siteName,
    description: defaultDescription,
    siteUrl,
    author,
  } = useSiteMetadata();

  const seo = {
    siteName,
    title: title ? `${title} - ${siteName}` : siteName,
    ogTitle: title || siteName,
    description: description || defaultDescription,
    image: image ? `${siteUrl}${image}` : "",
    author,
    url: pathname ? `${siteUrl}${pathname || ``}` : siteUrl,
  };

  return (
    <>
      <Helmet title={seo.title} defer={false}>
        <meta name="description" content={seo.description} />
        {seo.image && <meta name="image" content={seo.image} />}
        <meta name="author" content={seo.author} />

        <meta name="og:site_name" content={seo.siteName} />
        <meta name="og:title" content={seo.ogTitle} />
        <meta name="og:description" content={seo.description} />
        <meta name="og:type" content="website" />
        <meta name="og:url" content={seo.url} />
        <meta name="og:image" content={seo.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:url" content={seo.url} />
        <meta name="twitter:description" content={seo.description} />
        {seo.image && <meta name="twitter:image" content={seo.image} />}
        <meta name="twitter:creator" content={seo.author} />
      </Helmet>
      {children}
    </>
  );
};
