FROM python:3
WORKDIR "/tracker/rest-api"
COPY requirements.txt $WORKDIR
RUN pip install -r requirements.txt
COPY . $WORKDIR
ENV PYTHONUNBUFFERED=0
CMD ["python", "app.py"]
