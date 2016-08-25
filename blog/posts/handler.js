'use strict';

const BlogStorage = require('./BlogStorage');
const AWS = require('aws-sdk');

const config = {
  region: AWS.config.region || process.env.SERVERLESS_REGION || 'eu-west-1',
};
const dynamodb = new AWS.DynamoDB.DocumentClient(config);

module.exports.create = function createPost(event, context, cb) {
  const blog = new BlogStorage(dynamodb, event.stage);
  blog.savePost(event.body, cb);
};

module.exports.get = function getPosts(event, context, cb) {
  const blog = new BlogStorage(dynamodb, event.stage);
  blog.getPosts({}, cb);
};

module.exports.update = function updatePost(event, context, cb) {
  const blog = new BlogStorage(dynamodb, event.stage);
  blog.updatePost(event.path.id, event.body, cb);
};

module.exports.remove = function removePost(event, context, cb) {
  const blog = new BlogStorage(dynamodb, event.stage);
  blog.deletePost(event.path.id, cb);
};
