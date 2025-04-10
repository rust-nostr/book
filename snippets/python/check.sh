#!/bin/bash

set -exuo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PYTHON_ENV_PATH="${SCRIPT_DIR}/venv"

# Create a python env
python -m venv "${PYTHON_ENV_PATH}" || virtualenv "${PYTHON_ENV_PATH}"

# Enter in the python env
. "${PYTHON_ENV_PATH}/bin/activate"

# Install dependencies
pip install -r "${SCRIPT_DIR}/requirements.txt"

# Check
pyright "${SCRIPT_DIR}/src"
