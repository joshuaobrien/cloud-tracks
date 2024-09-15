#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RepositoryStack } from '../lib/repository-stack';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const app = new cdk.App();

const repository = new RepositoryStack(app, 'RepositoryStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION,
  }
})

new InfrastructureStack(app, 'InfrastructureStack', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION 
  },
  repository: repository.ecrRepository,
});
