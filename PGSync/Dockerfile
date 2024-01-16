FROM python:3.9-slim-bullseye

WORKDIR /usr/src/app

COPY . .

RUN chmod +x ./entrypoint.sh

RUN pip install pgsync==3.1.0

RUN apt update \
    && apt install -y moreutils \
    && apt install -y jq \
    && apt install -y wait-for-it

ENTRYPOINT ["bash", "./entrypoint.sh"]