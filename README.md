# cron-parsing

# Execution
## Dockerized Execution Notes
I chose this route since its easier to not have to worry about system requirements to execute commands.

### Prereqs
You'll need to have docker running on your machine to execute command inside container. You can find installation instructions here:
https://docs.docker.com/docker-for-mac/install/

### Steps to run as Docker container

## Steps to run as Nodejs shell script

### Prereqs
 You'll need to install Nodejs to run the command as is below. Use the latest version of Long Term Support. You can find it here https://nodejs.org/en/

### Example execution
This file pulls input from a test file and pipes it into the command

```
cat test.txt | ./parse-cron.js
```