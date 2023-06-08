import type { GatsbyConfig, PluginRef } from "gatsby";
import "dotenv/config";

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

const config: GatsbyConfig = {
  siteMetadata: {
    siteTitle: `Harvest and Share, Be Content and Find Joy.`,
    siteTitleAlt: `Bin - 收获与分享 知足而常乐`,
    siteHeadline: `Bin - 收获与分享 知足而常乐`,
    keywords: `bin 技术 分享 technology`,
    siteUrl: `https://bin.ink`,
    siteDescription: `欢迎来到我的个人博客(https://bin.ink)！我分享日常、资源和技术，为您提供有趣的故事、实用的资源和最新的技术见解。一起探索生活、学习和成长！ Welcome to my personal blog (https://bin.ink)! I share daily life, resources, and technology to provide you with interesting stories, practical resources, and the latest technological insights. Let's explore life, learning, and personal growth together!`,
    siteImage: `/banner.jpg`,
    siteLanguage: `zh-Hans`,
    author: `junfu`,
  },
  // 网址结尾是否带 /
  trailingSlash: `never`,
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        // header 导航
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `Tags`,
            slug: `/tags`,
          },
          // {
          //   title: `About`,
          //   slug: `/about`,
          // },
        ],
        // header 右侧
        externalLinks: [
          // {
          //   name: `Github`,
          //   url: `https://github.com/junfuchang`,
          // },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bin - 收获与分享 知足而常乐`,
        short_name: `Bin - 收获与分享 知足而常乐`,
        description: `欢迎来到我的个人博客(https://bin.ink)！我分享日常、资源和技术，为您提供有趣的故事、实用的资源和最新的技术见解。一起探索生活、学习和成长！ Welcome to my personal blog (https://bin.ink)! I share daily life, resources, and technology to provide you with interesting stories, practical resources, and the latest technological insights. Let's explore life, learning, and personal growth together!`,
        start_url: `/`,
        background_color: `#ffffe2`,
        theme_color: `#90EE90`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.jpg`,
            sizes: `192x192`,
            type: `image/jpg`,
          },
          {
            src: `/android-chrome-512x512.jpg`,
            sizes: `512x512`,
            type: `image/jpg`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allPost },
            }: {
              query: {
                allPost: IAllPost;
                site: { siteMetadata: ISiteMetadata };
              };
            }) =>
              allPost.nodes.map((post) => {
                const url = site.siteMetadata.siteUrl + post.slug;
                const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`;

                return {
                  title: post.title,
                  date: post.date,
                  excerpt: post.excerpt,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": content }],
                };
              }),
            query: `{
              allPost(sort: {date: DESC}) {
                nodes {
                  title
                  date(formatString: "MMMM D, YYYY")
                  excerpt
                  slug
                }
              }
            }`,
            output: `rss.xml`,
            title: `Bin - 收获与分享 知足而常乐`,
          },
        ],
      },
    },
    // You can remove this plugin if you don't need it
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-statoscope`,
      options: {
        saveReportTo: `${__dirname}/public/.statoscope/_bundle.html`,
        saveStatsTo: `${__dirname}/public/.statoscope/_stats.json`,
        open: false,
      },
    },
  ].filter(Boolean) as Array<PluginRef>,
};

export default config;

interface IPostTag {
  name: string;
  slug: string;
}

interface IPost {
  slug: string;
  title: string;
  defer: boolean;
  date: string;
  excerpt: string;
  contentFilePath: string;
  html: string;
  timeToRead: number;
  wordCount: number;
  tags: Array<IPostTag>;
  banner: any;
  description: string;
  canonicalUrl: string;
}

interface IAllPost {
  nodes: Array<IPost>;
}

interface ISiteMetadata {
  siteTitle: string;
  siteTitleAlt: string;
  siteHeadline: string;
  siteUrl: string;
  siteDescription: string;
  siteImage: string;
  author: string;
}
