export const environment = {
  production: true,
  apiUrl: 'https://algamoney-bend.herokuapp.com/',
  tokenAllowedDomains: [ /localhost:8080/ ],
  tokenDisallowedRoutes: [/\/outh2\/token/],
  oauthCallbackUrl: 'https://oidcdebugger.com/debug',
  logoutRedirectToUrl: 'http://local-algamoney.com:8000'
};
