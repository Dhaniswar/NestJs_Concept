import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin, { ServiceAccount } from 'firebase-admin';
import { IConfig } from '../../common/interfaces/config.interface';

@Injectable()
export class FirebaseService {
  private firebaseConfig: IConfig['firebase'];

  constructor(private readonly configService: ConfigService<IConfig, true>) {
    this.firebaseConfig = this.configService.get('firebase', {
      infer: true,
    });

    const { privateKey, clientEmail, projectId } = this.firebaseConfig;

    const credential: ServiceAccount = {
      projectId,
      clientEmail,
      privateKey,
    };

    admin.initializeApp({
      credential: admin.credential.cert(credential),
    });
  }
}
