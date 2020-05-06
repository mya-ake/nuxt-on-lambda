# Nuxt.js on AWS Lambda

## Versions

- Nuxt.js: 2.12.2
- Node.js: 12.16.2
- Lambda runtime: Node.js 12.x 
  - 12.16.2(as of 2020-05-06)

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
