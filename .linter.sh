#!/bin/bash
cd /home/kavia/workspace/code-generation/skillswap-community-5463-5470/skillswap_community
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

