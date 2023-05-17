[![portfolio-api](.github/images/project-thumbnail.png)](https://api.ericodesu.com)

# portfolio-api

### tl;dr

 ```
git clone https://github.com/pepeien/portfolio-api.git
cd portfolio-api/
docker-compose up --build
```

### Setting up nginx & SSL

If you want to deploy this project publicly you may need to install nginx or if installed, tweak a few things:

1. Reach the `nginx/` folder inside this project;

2. Open up the `reverse_proxy.conf` file:
    
    **I strongly recommend using a Linux O.S (Ubuntu 20.04) to run this project, which was the system the project was built on**
    
    **This side of the project was design towards having SSL certificates so if you aren't certificated please follow:**
    
    **Linux**: [Digital Ocean's tutorial](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04), while following this tutorial this file content will subistitute the `/etc/nginx/sites-available/example.com` while still changing the correct fields for both, the tutorial and the ones informed inside the `reverse_proxy.conf`.

3. Open up the `/home` folder inside this project:
   
   Transfer all the content to `/var/www/example.org/html`. **Keep in mind that the `example.org` it's a placeholder and MUST be updated conform you domain name**
  
Now you are ready to use the project, just issue a `docker-compose up --build` and you're good to go

## About the Project

Firstly, this project was to only provide [namah](https://github.com/pepeien/namah) project, but as i worked on it, i deciced to be the back-end source for all my portfolio related projects.

## Documentation

You can reach to the [Developer Portal](https://api.ericodesu.com) to a more hands-on driven info.
