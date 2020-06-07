module.exports = {
  title: 'Teleprompt Docs',
  tagline: 'Secure headless communication',
  url: 'https://docs.teleprompt.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'teleprompt', // Usually your GitHub org/user name.
  projectName: 'docs.teleprompt.io', // Usually your repo name.
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
          to: 'docs/create-project',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'recipes/index',
          activeBasePath: 'recipes',
          label: 'Recipes',
          position: 'left'
        },
        {
          href: 'https://teleprompt.io/dashboard',
          className: 'header-dashboard-link header-icon-link',
          'aria-label': 'Dashboard',
          position: 'right',
        },
        {
          href: 'https://github.com/teleprompt',
          className: 'header-github-link header-icon-link',
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
          homePageId: 'docs/create-project',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/teleprompt/docs.teleprompt.io/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
