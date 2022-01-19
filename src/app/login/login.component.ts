import {Component, Inject, OnInit} from '@angular/core';
import {OKTA_AUTH} from '@okta/okta-angular';
import {OktaAuth, SigninWithRedirectOptions} from '@okta/okta-auth-js';
import * as OktaSignIn from '@okta/okta-signin-widget';

import myAppConfig from './my-app-config';

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: 'app-login',
  template: `
    <div>
      <div id="okta-sign-in-widget"></div>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  oktaSignIn: any;

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {
    this.oktaSignIn = new OktaSignIn({
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        issuer: myAppConfig.oidc.issuer
      }
    });
  }

  async ngOnInit() {
    this.oktaSignIn.showSignInToGetTokens({
      el: '#okta-sign-in-widget',
      scopes: myAppConfig.oidc.scopes
    }).then((tokens: SigninWithRedirectOptions | undefined) => {
      const originalUri = this.oktaAuth.getOriginalUri();
      if (originalUri === DEFAULT_ORIGINAL_URI) {
        this.oktaAuth.setOriginalUri('/');
      }
      this.oktaSignIn.remove();
      this.oktaAuth.signInWithRedirect(tokens);
    }).catch((error: any) => {
      throw error;
    });
  }

}
