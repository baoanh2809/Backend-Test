Flowwing steps to run code with github

1. npm i
2. npm run build
3. npm run start:dev

After that, you can open browser and paste this link
http://localhost:3000/api-docs/

Runcode with Docker
Link Docker: https://hub.docker.com/r/adriantran2809/be-test

docker build --progress=plain -t baoanh/nodejs:v4 -f DockerFile.dev .

docker container run -dp 4000:4000 baoanh/nodejs:v4
