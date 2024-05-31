// deleteTags.js

/**
 * Deletes the specified tags from a GitHub repository.
 * @param {Object} params - Parameters including GitHub client, context, and core.
 * @returns {Promise<void>} - A promise resolving when the tags have been deleted.
 */
async function deleteTags(params) {
  const { github, context, core } = params;
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const tags = context.payload.inputs['tag(s)'];

  if (!tags) {
    core.setFailed('No tags provided');
    return;
  }

  const tagList = tags.split(',').map(tag => tag.trim());

  try {
    for (const tag of tagList) {
      await github.rest.git.deleteRef({
        owner,
        repo,
        ref: `tags/${tag}`,
      });
      console.log(`Deleted tag: ${tag}`);
    }
  } catch (error) {
    core.setFailed(`Failed to delete tags: ${error.message}`);
    console.error('Error deleting tags:', error);
  }
}

module.exports = deleteTags;

