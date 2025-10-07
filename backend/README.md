# Backend

basic firebase backend in python

## Requirements

- [firebase cli](https://firebase.google.com/docs/cli)
- python 3.13

## Setup

change python/pip to python3/pip3 depending on os

```bash
# init venv
python -m venv venv
source venv/bin/activate

# install deps
pip install -r requirements.txt
```

## Testing

deploying locally

```bash
firebase emulators:start --only functions
```
