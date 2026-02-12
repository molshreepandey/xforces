FROM alpine:latest

RUN apk add --no-cache g++

RUN adduser -D -g '' runner

WORKDIR /app
RUN chown runner:runner /app
USER runner

CMD ["/bin/sh"]