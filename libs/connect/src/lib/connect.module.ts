import { NgModule, ModuleWithProviders } from '@angular/core';
import { AngularFireModule, 
         FirebaseOptions, 
         FirebaseOptionsToken, 
         FirebaseNameOrConfigToken } from '@angular/fire';

export interface ConnectConfig {
  appname?: string,
  firebase: FirebaseOptions
}

@NgModule({
  imports: [ AngularFireModule ],
  declarations: []
})
export class ConnectModule { 

  static init(config: ConnectConfig): ModuleWithProviders<ConnectModule> {
    return {
      ngModule: ConnectModule,
      providers: [
        { provide: FirebaseOptionsToken, useValue: config.firebase },
        { provide: FirebaseNameOrConfigToken, useValue: config.appname || '' }
      ]
    }
  }
}