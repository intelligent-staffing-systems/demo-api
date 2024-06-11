# POC Pipeline for VA Notify
latest runs are available to see in the [Actions tab of this repo](https://github.com/dialectic-devops/demo-api/actions/workflows/cd-pipeline.yml)

## How this pipeline works:

This pipeline was designed with the primary user being Quality Assurance. 
There are three stopping points for manual checks: pre-deploy to perf, staging, and finally prod. 
Pull Request Labels are used to determine the semver version, so the first check is to ensure there is only one label on the PR, and that the semver value is correct. 
This pipeline is intended to run through one commit at a time, thus the second check shows what the actual tag and SHA values will be upon merging the commit to the release branch. 
Once the Draft release notes are created, a convenient link is provided to ensure the generated notes (via GitHub's API) are accurate. 


Idealy these manually checks will be automated once greater confidence is had in team processes (to ensure correct labelling) and further automation of QA testing for performance and staging. 


