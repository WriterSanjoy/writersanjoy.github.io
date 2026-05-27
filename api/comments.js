export default async function handler(req, res) {

  try {

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;

    const type = req.query.type;
    const contentId = req.query.id;

    const filePath =
      `comments/${type}/${contentId}.json`;

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json"
        }
      }
    );

    const data = await response.json();

    return res.status(200).json({
      githubResponse:data
    });

  } catch(error){

    return res.status(500).json({
      success:false,
      message:error.message
    });
  }
}
