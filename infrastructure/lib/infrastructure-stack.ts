import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

export interface InfrastructureStackP extends cdk.StackProps {
  repository: ecr.Repository;
}

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfrastructureStackP) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'CloudTracksVPC', {
      maxAzs: 2,
    });

    const cluster = new ecs.Cluster(this, 'CloudTracksCluster', {
      vpc: vpc,
    });

    // Create RDS PostgreSQL Instance
    const database = new rds.DatabaseInstance(this, 'PostgresDB', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_16_4,
      }),
      vpc: vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      publiclyAccessible: false,
      multiAz: false,
      allocatedStorage: 20,
      storageType: rds.StorageType.GP2,
      credentials: rds.Credentials.fromGeneratedSecret('postgresUser'),
      databaseName: 'CloudTracksDB',
      backupRetention: cdk.Duration.days(7),
      deleteAutomatedBackups: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'CloudTracksTaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    const container = taskDefinition.addContainer('CloudTracksContainer', {
      image: ecs.ContainerImage.fromEcrRepository(props.repository),
      logging: ecs.LogDriver.awsLogs({ streamPrefix: 'CloudTracks' }),
      environment: {
        DATABASE_HOST: database.dbInstanceEndpointAddress,
        DATABASE_PORT: database.dbInstanceEndpointPort,
        DATABASE_NAME: 'CloudTracksDB',
        DATABASE_USER: 'postgresUser',
      },
      secrets: {
        DATABASE_PASSWORD: ecs.Secret.fromSecretsManager(database.secret!, 'password'),
      },
    });

    container.addPortMappings({
      containerPort: 3000,
    });

    // Create Fargate Service
    const fargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'CloudTracksFargateService', {
      cluster,
      taskDefinition: taskDefinition,
      desiredCount: 1,
      publicLoadBalancer: true,
    });

    // Allow ECS Task (via its Security Group) to connect to RDS
    database.connections.allowDefaultPortFrom(fargateService.service.connections);

    // Optional: Define Auto Scaling policies
    const scaling = fargateService.service.autoScaleTaskCount({
      minCapacity: 1,
      maxCapacity: 1,
    });

    scaling.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 50,
    });

    scaling.scaleOnMemoryUtilization('MemoryScaling', {
      targetUtilizationPercent: 50,
    });

    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
    });
  }
}
