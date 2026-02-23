FROM alpine:latest

RUN apk add --no-cache g++ openjdk25
COPY --from=oven/bun:alpine /usr/local/bin/bun /usr/local/bin/bun
RUN g++ --version && bun --version

RUN adduser -D -g '' runner

WORKDIR /app
RUN chown runner:runner /app
USER runner

CMD ["/bin/sh"]