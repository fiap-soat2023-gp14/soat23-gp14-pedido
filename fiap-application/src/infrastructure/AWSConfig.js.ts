// import * as AWS from 'aws-sdk';
//
// const dynamoDB = process.env.IS_OFFLINE
//   ? new AWS.DynamoDB.DocumentClient({
//       region: "localhost",
//       endpoint: process.env.DYNAMODB_ENDPOINT,
//     })
//   : new AWS.DynamoDB.DocumentClient();
//
// export default dynamoDB;
//
// // create a connection with dynamoDB‘s local instance‘s endpoint
//
//
// if(process.env.IS_OFFLINE)AWS.config.update({
//   region: 'us-east-1',
//   endpoint: 'http://localhost:4566', // LocalStack DynamoDB endpoint
// });
//
// const dynamodb = new AWS.DynamoDB();
//
// module.exports = dynamodb;
//
