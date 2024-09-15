import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class RepositoryStack extends cdk.Stack {
  ecrRepository: ecr.Repository;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.ecrRepository = new ecr.Repository(this, 'CloudTracksRepository', {
        repositoryName: 'cloudtracksrepository',
    });
  }
}
