#!/bin/bash
# v0.2 - Simple script to Just upload and compile the files

Run() {
    echo "Script started at: `date`";
    Upload;
}

GetScriptDir() {
    echo `cd $(dirname "$0") && pwd`;
}

GetWebDir() {
    echo `cd $(GetScriptDir)/../web && pwd`;
}

GetRootDir() {
    echo `cd $(GetScriptDir)/.. && pwd`;
}

Upload() {
    source "`GetRootDir`/.env"; # Load Config
    rsync -vcza \
        "`GetWebDir`/" \
        $DEPLOY_SERVER:$DEPLOY_DIR/ \
        -e "ssh -i $DEPLOY_SSH_KEY" \
        --exclude='node_modules' \
        --exclude='room_version.json' \
        --exclude='.env'
}

Run;

