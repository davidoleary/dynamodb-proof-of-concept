module.exports = (aws) => {
  aws.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: "eu-west-2"
  });
}