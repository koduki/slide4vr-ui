FROM node

RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
    apt-get update && apt-get install -y google-cloud-sdk && \
    apt-get -y --purge autoremove &&  rm -rf /var/lib/apt/lists/*

RUN curl https://storage.googleapis.com/nklab-artifacts/hwrap -o /usr/bin/hwrap && chmod a+x /usr/bin/hwrap 

RUN mkdir -p /home/slide4vr && useradd --home-dir /home/slide4vr slide4vr && chown -R slide4vr:slide4vr /home/slide4vr
ADD ./ /app
RUN chown -R slide4vr:slide4vr /app

USER slide4vr
WORKDIR /app

RUN yarn install && yarn build

ENV PORT=5000
CMD ["hwrap", "-Dquarkus.http.port=${PORT}", "-Dhwrap.cmd=./ssg/run.sh"]