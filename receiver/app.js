const AWS=require("aws-sdk");
AWS.config.update({
  region:"ap-south-1"
});
// sqs receive message

exports.receiver=async (event, context)=> {
  const sqs = new AWS.SQS();
  const queueUrl = "https://sqs.ap-south-1.amazonaws.com/533267385969/sqslambdaQueue";
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 10,
    WaitTimeSeconds: 0,
  };
  const data = await sqs.receiveMessage(params).promise();
  if (data.Messages && data.Messages.length > 0) {
    const message = data.Messages[0];
    const messageBody = JSON.parse(message.Body);
    console.log(messageBody);
    const sqs = new AWS.SQS();
    const deleteParams = {
      QueueUrl: queueUrl,
      ReceiptHandle: message.ReceiptHandle,
    };
    await sqs.deleteMessage(deleteParams).promise();
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Message received from queue",
      data,
    })
  };


}


// export const producer = async (event, context) => {
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify({
//         message: 'Producer',
//       })
//     };

//     return response;
//   };
