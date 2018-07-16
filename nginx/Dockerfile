FROM nginx

# File Author / Maintainer
MAINTAINER N3TC4T <netcat.av@gmail.com>

# Copy certs
COPY certs/fullchain.pem /etc/nginx/ssl/
COPY certs/privkey.pem /etc/nginx/ssl/


# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf

# remove unececery configs
RUN rm -f /etc/nginx/conf.d/*

# Append "daemon off;" to the beginning of the configuration
# in order to avoid an exit of the container
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

COPY docker-entrypoint.sh /
RUN chmod 755 /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

# Expose ports
EXPOSE 443

VOLUME /etc/nginx/ssl

# Define default command
CMD service nginx start
