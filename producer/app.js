const AWS=require("aws-sdk");
AWS.config.update({
  region:"ap-south-1"
});
// sqs send message

exports.producer=async (event, context)=> {
  const sqs = new AWS.SQS();
  const queueUrl = "https://sqs.ap-south-1.amazonaws.com/533267385969/sqslambdaQueue";
  const params = {
    MessageBody: JSON.stringify(event),
    QueueUrl: queueUrl,
    DelaySeconds: 0
  };
  const data = await sqs.sendMessage(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Message sent to queue",
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
