# ilp-connector-docker

ILP connector With XRP

Docker images are built for quick deployment in various computing cloud providers. For more information on docker and containerization technologies, refer to [official document][4].

## Prepare the host

Many cloud providers offer docker-ready environments, for instance the [CoreOS Droplet in DigitalOcean][5] or the [Container-Optimized OS in Google Cloud][6].

If you need to install docker yourself, follow the [official installation guide][7].


Before starting you need to have a domain for the certificate .


If you are using ubuntu 14.4 you may have an issue running certbot, if so try to export the following variables and run it again:

```
export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"
```


1. Clone the repo

```bash
$ git clone https://github.com/xrp-community/tf-connector-docker.git ~/tf-connector
```

1. Download the installer

```bash
$ wget https://dl.eff.org/certbot-auto
```

2. Allow it to be an executable

```bash
$ chmod a+x certbot-auto
```

3. Get SSL certificate for your domain

```bash
$ ./certbot-auto certonly --standalone -d <YOUR_DOMAIN>
```

4. Type your email

5. Decide if you want to share your email or not

6. Copy then to your certs folder, see that you need to update the following path your your server path:

```bash
$ cp /etc/letsencrypt/live/<YOUR_DOMAIN>/* ~/tf-connector/nginx/certs/
```

7. Edit connector config and fill the required informations

```bash
$ vim ~/tf-connector/app/launch.config.js
```



## Use docker-compose to manage

It is very handy to use [docker-compose][3] to manage docker containers.
You can download the binary at <https://github.com/docker/compose/releases>.

This is a sample `docker-compose.yml` file.

```
version: '2'
services:
  nginx:
      container_name: Nginx
      build: nginx
      network_mode: host
      ports:
        - '80:80'
        - '443:443'
      depends_on:
          - "app"
      environment:
        - DOMAIN_NAME=btp.my-domain.com
  gui:
        container_name: GUI
        build: gui
        network_mode: host
        ports:
          - "127.0.0.1:7770:7770"
        depends_on:
              - "app"
  app:
      container_name: APP
      build: app
      network_mode: host
      ports:
        - "127.0.0.1:8080:8080"
        - "127.0.0.1:7769:7769"
        - "127.0.0.1:7768:7768"


```

Run the connector

```bash
$ cd ~/tf-connector
$ docker-compose up -d
$ docker-compose ps
```

## Access your Connector

### Use as your Moneyd

You can access your deployed connector by tunnelling its
`ilp-plugin-mini-accounts` instance to your local machine. Then any application
can access it via port 7768, just as though you were running moneyd.

You should have an IP address for your connector, once it's deployed.
To get access to your funds locally, just run the following command:

```
ssh -N -L 7768:localhost:7768 root@YOUR_IP_ADDRESS
```

Replace `YOUR_IP_ADDRESS` with your IP address. This command should produce no
output; just keep the command running to keep the port-forward running.

To test your ILP connection, try these [examples from moneyd's
README.](https://github.com/sharafian/moneyd#sending-payments)

### Monitor with Moneyd-GUI

The connector you deployed comes with a GUI to view routes, ping destinations,
and send test payments. This GUI runs as a webserver.

To access it, forward the GUI's port to your local machine.

```
ssh -N -L 7770:localhost:7770 root@YOUR_IP_ADDRESS
```

### Donations

If you want to show your appreciation, you can donate via XRP to
`rD1ioePTv7P1jgELM3tDkDU1LJqTEwuwo` :)

### Contact

[<img src="https://user-images.githubusercontent.com/6250203/42041517-5435904c-7b07-11e8-906b-39a5f763a406.png" data-canonical-src="https://twitter.com/baltazar223" width="80" height="80" />
](https://twitter.com/baltazar223)

[3]: https://github.com/docker/compose
[4]: https://docs.docker.com/
[5]: https://www.digitalocean.com/products/linux-distribution/coreos/
[6]: https://cloud.google.com/container-optimized-os/
[7]: https://docs.docker.com/install/
