module.exports = {
  title: 'Teleprompt Docs',
  tagline: 'Secure headless communication',
  url: 'https://docs.teleprompt.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'teleprompt', // Usually your GitHub org/user name.
  projectName: 'teleprompt-docs', // Usually your repo name.
  themeConfig: {
    disableDarkMode: true,
    navbar: {
      title: 'Teleprompt',
      logo: {
        alt: 'Teleprompt Logo',
        src: 'img/teleprompt-white.svg',
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'recipes/',
          label: 'Recipes',
          position: 'left'
        },
        {
          to: 'https://teleprompt.io/dashboard',
          label: 'Dashboard',
          position: 'left'
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/teleprompt',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      // [
      //   {
      //     title: 'Quick links',
      //     items: [
      //       {
      //         label: 'Teleprompt',
      //         to: 'https://teleprompt.io/',
      //       }
      //       // TODO: Link to CLI tool
      //       // TODO: Link to twitter profile
      //     ]
      //   }
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} Next Step Software UG (haftungsbeschränkt). Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'create-project',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/teleprompt/teleprompt-docs/edit/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/teleprompt/teleprompt-docs/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
