export const environment = {
  production: true,
  apiUrl: 'https://algamoney-bend.herokuapp.com',
  tokenAllowedDomains: [ /localhost:8080/ ],
  tokenDisallowedRoutes: [/\/outh2\/token/],
  oauthCallbackUrl: 'https://algamoney-ui-gamma.vercel.app/authorized',
  logoutRedirectToUrl: 'https://algamoney-ui-gamma.vercel.app'
};
