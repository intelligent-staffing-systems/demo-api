const { appendSummary, getReleaseVersionValue } = require("./actionUtils");
const fs = require('fs');
const path = require('path');

async function formatDate() {
  const date = new Date();
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options).toUpperCase();
}

async function createDraftRelease(github, owner, repo, tag_name, body) {
  try {
    const response = await github.rest.repos.createRelease({
      owner,
      repo,
      tag_name,
      name: `${tag_name} - ${formatDate()}`,
      body,
      draft: true,
      prerelease: false,
    });

    const releaseUrl = response.data.html_url;
    const draftReleaseReference = response.data.id;

    console.log("The response is:", response.data);
    console.log("The release URL is: ", releaseUrl);
    console.log("The draftReleaseReference is: ", draftReleaseReference);

    return { releaseUrl, draftReleaseReference };
  } catch (error) {
    console.error(`Error creating release for ${tag_name} in ${owner}/${repo}:`, error);
    throw new Error(`Failed to create draft release: ${error.message}`);
  }
}

async function generateReleaseNotes(github, owner, repo, tag_name, previous_tag_name) {
  try {
    console.log('Current directory:', process.cwd());
    console.log('Files in .github directory:', fs.readdirSync(path.join(process.cwd(), '.github')));

    const response = await github.rest.repos.generateReleaseNotes({
      owner,
      repo,
      tag_name,
      target_commitish: 'main',
      previous_tag_name,
      configuration_file_path: ".github/release.yaml",
    });

    const releaseNotes = response.data.body;
    console.log("Release notes generated successfully: ", releaseNotes);
    return { releaseNotes };
  } catch (error) {
    console.error("Error generating release notes:", error);
    throw error;
  }
}

async function createReleaseNotes(params) {
  const { github, context, core } = params;
  const { previousVersion } = process.env;
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  try {
    const currentVersion = await getReleaseVersionValue(github, owner, repo);
    const { releaseNotes } = await generateReleaseNotes(
      github,
      owner,
      repo,
      currentVersion,
      previousVersion,
    );

    const { releaseUrl, draftReleaseReference } = await createDraftRelease(
      github,
      owner,
      repo,
      currentVersion,
      releaseNotes,
    );

    const summaryContent = `
### Release Notes Created!
[Link to the draft release notes](${releaseUrl})
Draft notes created based on the update to ${currentVersion} 
and comparing the tag from the previous version: ${previousVersion}
The draft release reference is ${draftReleaseReference}
    `;
    appendSummary(core, summaryContent);

    core.setOutput("draftReleaseReference", draftReleaseReference);

    console.log(`The previous release version was: ${previousVersion}`);
  } catch (error) {
    core.setFailed(`Failed to generate summary: ${error.message}`);
    console.error(error);
  }
}

module.exports = createReleaseNotes;

