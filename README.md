# Nuxt.js on AWS Lambda

## Commands

### Deploy

#### Build & Deploy for API Gateway

Endpoint: API Gateway  
Deploy to: Lambda

```
$ yarn deploy:api_gw
```

#### Build & Deploy for CloudFront

Endpoint: CloudFront  
Deploy to: Lambda, S3

```
$ yarn deploy
```

⚠️CloudFront and S3 are not created. Please create from the console.

### Remove Lambda 

```
$ yarn delete
```
