import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

export interface InfrasStackP extends cdk.StackProps {
  repository: ecr.Repository;
}

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfrasStackP) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'CloudTracksVPC', {
      maxAzs: 2,
    });

    const cluster = new ecs.Cluster(this, 'CloudTracksCluster', {
      vpc: vpc,
    });

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'CloudTracksTaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    const container = taskDefinition.addContainer('CloudTracksContainer', {
      image: ecs.ContainerImage.fromEcrRepository(props.repository),
      logging: ecs.LogDriver.awsLogs({ streamPrefix: 'CloudTracks' }),
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

    fargateService.targetGroup.configureHealthCheck({
      path: "/health",
      interval: cdk.Duration.seconds(30),
      timeout: cdk.Duration.seconds(5),
      healthyHttpCodes: "200",
    });

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