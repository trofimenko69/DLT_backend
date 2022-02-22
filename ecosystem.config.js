module.exports = {
  apps : [
    {
      name: "api-dev",
      script: "npm",
      args: "run dev"
    },
    {
      name: "api-prod",
      script: "npm",
      args: "run start:server"
    }
  ]
}
