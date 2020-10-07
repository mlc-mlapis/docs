const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Zerops.io docs & knowledge base',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Documentation',
        link: '/documentation/',
      }
    ],
    sidebar: {
      '/documentation/': [
        {
          title: 'Zerops Overview',
          collapsable: false,
          children: [
            '',
            'overview/projects-and-services-structure',
            'overview/users',
            'overview/made-for-developers',
          ]
        },
        {
          title: 'Building apps on Zerops',
          collapsable: false,
          children: [
            'build/how-zerops-build-works',
            'build/build-config',
          ]
        },
        {
          title: 'Deploying code to Zerops',
          collapsable: false,
          children: [
            'deploy/how-deploy-works',
            'deploy/deploy-with-cli',
            'deploy/use-in-github-actions',
            'deploy/use-in-gitlab-ci',
            'deploy/use-in-circle-ci'
          ]
        },
        {
          title: 'GitHub vs. Zerops',
          collapsable: false,
          children: [
            'github/login-with-github',
            'github/github-integration',
          ]
        },
        {
          title: 'High availability & Realibility',
          collapsable: false,
          children: [
            'ha/why-should-i-want-high-availability',
            'ha/how-to-make-my-code-ha-enabled',
            'ha/zerops-enterprise-grade-realibility',
          ]
        },
        {
          title: 'Automatic Scaling',
          collapsable: false,
          children: [
            'automatic-scaling/how-automatic-scaling-works',
          ]
        },
        {
          title: 'Backup and restore',
          collapsable: false,
          children: [
            'backup-restore/backup-restore-databases',
            'backup-restore/deploy-versioning',
          ]
        },
        {
          title: 'Public & private routing',
          collapsable: false,
          children: [
            'routing/routing-between-project-services',
            'routing/using-your-domain',
            'routing/access-through-ip-and-firewall',
            'routing/change-synchronization',
            'routing/zerops-subdomain',
            'routing/unique-ipv4-ipv6-addresses',
          ]
        },
        {
          title: 'Logs',
          collapsable: false,
          children: [
            'logs/build-logs',
            'logs/runtime-logs',
          ]
        },
        {
          title: 'Enviroment variables',
          collapsable: false,
          children: [
            'environment-variables/how-to-access',
            'environment-variables/helper-variables',
            'environment-variables/commit-changes',
          ]
        },
        {
          title: 'CLI',
          collapsable: false,
          children: [
            'cli/available-commands',
            'cli/vpn'
          ]
        },
        {
          title: 'Services in zerops',
          collapsable: false,
          initialOpenGroupIndex: 1,
          children: [
            'services/runtimes',
            'services/databases',
            'services/storage',
            'services/managed-linux-container'
          ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
