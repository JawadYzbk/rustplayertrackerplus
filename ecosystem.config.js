module.exports = {
  apps: [
    {
      name: "rust-tracker",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
