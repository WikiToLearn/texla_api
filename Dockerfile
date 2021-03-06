FROM python:3.5

ADD ./sources.list /etc/apt/sources.list

MAINTAINER wikitolearn sysadmin@wikitolearn.org
ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt

EXPOSE 80/tcp

ENTRYPOINT ["python","texla_api.py"]
