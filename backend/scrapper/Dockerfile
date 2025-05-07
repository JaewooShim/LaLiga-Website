#FROM python:3.10
#
#WORKDIR /app
#
#COPY . /app
#
#RUN pip install -r requirements.txt
#
## Install Chrome and its dependencies
#RUN apt-get update && apt-get install -y \
#    wget \
#    unzip \
#    gnupg \
#    fonts-liberation \
#    libappindicator3-1 \
#    libasound2 \
#    libatk-bridge2.0-0 \
#    libatk1.0-0 \
#    libatspi2.0-0 \
#    libc6 \
#    libcairo2 \
#    libcups2 \
#    libcurl4 \
#    libdbus-1-3 \
#    libexpat1 \
#    libgbm1 \
#    libglib2.0-0 \
#    libgtk-3-0 \
#    libnspr4 \
#    libnss3 \
#    libpango-1.0-0 \
#    libudev1 \
#    libvulkan1 \
#    libx11-6 \
#    libxcb1 \
#    libxcomposite1 \
#    libxdamage1 \
#    libxext6 \
#    libxfixes3 \
#    libxkbcommon0 \
#    libxrandr2 \
#    xdg-utils && \
#    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
#    apt install -y ./google-chrome-stable_current_amd64.deb && \
#    rm google-chrome-stable_current_amd64.deb && \
#    apt-get clean && \
#    rm -rf /var/lib/apt/lists/* \
#
#CMD: ["python", "scraper.py"]