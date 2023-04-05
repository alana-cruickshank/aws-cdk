"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ec2 = require("aws-cdk-lib/aws-ec2");
const cdk = require("aws-cdk-lib");
const ecs = require("aws-cdk-lib/aws-ecs");
const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-ecs-integ-spot');
const vpc = new ec2.Vpc(stack, 'Vpc', { maxAzs: 2 });
const cluster = new ecs.Cluster(stack, 'EcsCluster', { vpc });
cluster.addCapacity('asgSpot', {
    maxCapacity: 2,
    minCapacity: 2,
    desiredCapacity: 2,
    instanceType: new ec2.InstanceType('c5.xlarge'),
    spotPrice: '0.0735',
    spotInstanceDraining: true,
});
cluster.addCapacity('asgOd', {
    maxCapacity: 2,
    minCapacity: 1,
    desiredCapacity: 1,
    instanceType: new ec2.InstanceType('t3.large'),
});
const taskDefinition = new ecs.TaskDefinition(stack, 'Task', {
    compatibility: ecs.Compatibility.EC2,
});
taskDefinition.addContainer('PHP', {
    image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
    memoryLimitMiB: 512,
}).addPortMappings({
    containerPort: 80,
});
new ecs.Ec2Service(stack, 'Service', {
    cluster,
    taskDefinition,
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuc3BvdC1kcmFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVnLnNwb3QtZHJhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMkM7QUFDM0MsbUNBQW1DO0FBQ25DLDJDQUEyQztBQUUzQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDLENBQUM7QUFFdkQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUVyRCxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFFOUQsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7SUFDN0IsV0FBVyxFQUFFLENBQUM7SUFDZCxXQUFXLEVBQUUsQ0FBQztJQUNkLGVBQWUsRUFBRSxDQUFDO0lBQ2xCLFlBQVksRUFBRSxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO0lBQy9DLFNBQVMsRUFBRSxRQUFRO0lBQ25CLG9CQUFvQixFQUFFLElBQUk7Q0FDM0IsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7SUFDM0IsV0FBVyxFQUFFLENBQUM7SUFDZCxXQUFXLEVBQUUsQ0FBQztJQUNkLGVBQWUsRUFBRSxDQUFDO0lBQ2xCLFlBQVksRUFBRSxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO0NBQy9DLENBQUMsQ0FBQztBQUVILE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0lBQzNELGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUc7Q0FDckMsQ0FBQyxDQUFDO0FBRUgsY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7SUFDakMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDO0lBQ2xFLGNBQWMsRUFBRSxHQUFHO0NBQ3BCLENBQUMsQ0FBQyxlQUFlLENBQUM7SUFDakIsYUFBYSxFQUFFLEVBQUU7Q0FDbEIsQ0FBQyxDQUFDO0FBRUgsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUU7SUFDbkMsT0FBTztJQUNQLGNBQWM7Q0FDZixDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBlYzIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgZWNzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1lY3MnO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuY29uc3Qgc3RhY2sgPSBuZXcgY2RrLlN0YWNrKGFwcCwgJ2F3cy1lY3MtaW50ZWctc3BvdCcpO1xuXG5jb25zdCB2cGMgPSBuZXcgZWMyLlZwYyhzdGFjaywgJ1ZwYycsIHsgbWF4QXpzOiAyIH0pO1xuXG5jb25zdCBjbHVzdGVyID0gbmV3IGVjcy5DbHVzdGVyKHN0YWNrLCAnRWNzQ2x1c3RlcicsIHsgdnBjIH0pO1xuXG5jbHVzdGVyLmFkZENhcGFjaXR5KCdhc2dTcG90Jywge1xuICBtYXhDYXBhY2l0eTogMixcbiAgbWluQ2FwYWNpdHk6IDIsXG4gIGRlc2lyZWRDYXBhY2l0eTogMixcbiAgaW5zdGFuY2VUeXBlOiBuZXcgZWMyLkluc3RhbmNlVHlwZSgnYzUueGxhcmdlJyksXG4gIHNwb3RQcmljZTogJzAuMDczNScsXG4gIHNwb3RJbnN0YW5jZURyYWluaW5nOiB0cnVlLFxufSk7XG5cbmNsdXN0ZXIuYWRkQ2FwYWNpdHkoJ2FzZ09kJywge1xuICBtYXhDYXBhY2l0eTogMixcbiAgbWluQ2FwYWNpdHk6IDEsXG4gIGRlc2lyZWRDYXBhY2l0eTogMSxcbiAgaW5zdGFuY2VUeXBlOiBuZXcgZWMyLkluc3RhbmNlVHlwZSgndDMubGFyZ2UnKSxcbn0pO1xuXG5jb25zdCB0YXNrRGVmaW5pdGlvbiA9IG5ldyBlY3MuVGFza0RlZmluaXRpb24oc3RhY2ssICdUYXNrJywge1xuICBjb21wYXRpYmlsaXR5OiBlY3MuQ29tcGF0aWJpbGl0eS5FQzIsXG59KTtcblxudGFza0RlZmluaXRpb24uYWRkQ29udGFpbmVyKCdQSFAnLCB7XG4gIGltYWdlOiBlY3MuQ29udGFpbmVySW1hZ2UuZnJvbVJlZ2lzdHJ5KCdhbWF6b24vYW1hem9uLWVjcy1zYW1wbGUnKSxcbiAgbWVtb3J5TGltaXRNaUI6IDUxMixcbn0pLmFkZFBvcnRNYXBwaW5ncyh7XG4gIGNvbnRhaW5lclBvcnQ6IDgwLFxufSk7XG5cbm5ldyBlY3MuRWMyU2VydmljZShzdGFjaywgJ1NlcnZpY2UnLCB7XG4gIGNsdXN0ZXIsXG4gIHRhc2tEZWZpbml0aW9uLFxufSk7XG5cbmFwcC5zeW50aCgpO1xuIl19