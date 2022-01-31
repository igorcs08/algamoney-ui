import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = environment.apiUrl + '/oauth2/token';
  oauthAuthorizeUrl = environment.apiUrl + '/oauth2/authorize';

  constructor(private http: HttpClient) { }

  login() {
    const state = 'abc';
    const challengeMethod = 'plain';
    const codeChallenge = 'desafio123';
    const redirectURI = encodeURIComponent(environment.oauthCallbackUrl);

    const clientId = 'angular';
    const scope = 'read write';
    const responseType = 'code';

    const params = [
      'response_type=' + responseType,
      'client_id=' + clientId,
      'scope=' + scope,
      'code_challenge=' + codeChallenge,
      'code_challenge_method=' + challengeMethod,
      'state=' + state,
      'redirect_uri=' + redirectURI
    ]

    window.location.href = this.oauthAuthorizeUrl + '?' + params.join('&');
  }
}
