// .github/scripts/deleteNonVTags.js

/**
 * Deletes all tags from a GitHub repository that don't start with "v".
 * @param {Object} params - Parameters including GitHub client, context, and core.
 * @returns {Promise<void>} - A promise resolving when the tags have been deleted.
 */
async function deleteNonVTags(params) {
  const { github, context, core } = params;
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  try {
    const tags = await github.rest.repos.listTags({
      owner,
      repo,
    });

    const nonVTags = tags.data.filter(tag => !tag.name.startsWith('v'));

    for (const tag of nonVTags) {
      await github.rest.git.deleteRef({
        owner,
        repo,
        ref: `tags/${tag.name}`,
      });
      console.log(`Deleted tag: ${tag.name}`);
    }
  } catch (error) {
    core.setFailed(`Failed to delete tags: ${error.message}`);
    console.error('Error deleting tags:', error);
  }
}

module.exports = deleteNonVTags;

