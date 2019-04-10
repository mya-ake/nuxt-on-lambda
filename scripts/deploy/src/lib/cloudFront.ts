import { CloudFront } from 'aws-sdk';

const cloudFront = new CloudFront();

export const createInvalidation = (
  params: CloudFront.CreateInvalidationRequest,
) => {
  return new Promise((resolve, reject) => {
    cloudFront.createInvalidation(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
