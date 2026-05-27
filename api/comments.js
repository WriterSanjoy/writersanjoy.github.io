if (req.method === "GET") {

  try {

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json"
        }
      }
    );

    const fileData = await response.json();

    if (!response.ok) {

      return res.status(404).json({
        success:false,
        message:fileData.message || "Comments file not found"
      });
    }

    const comments = JSON.parse(
      Buffer
        .from(fileData.content, "base64")
        .toString()
    );

    return res.status(200).json(comments);

  } catch(error){

    return res.status(500).json({
      success:false,
      message:error.message
    });
  }
}
