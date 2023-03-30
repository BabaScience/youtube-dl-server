const express = require('express');
const youtubedl = require('youtube-dl-exec');
const app = express();

app.use(express.json());

app.post('/download', async (req, res) => {
    const { url } = req.body;
    // const url = "https://www.youtube.com/watch?v=R4qud199tQk"
    console.log("Download Endpoint Called!")
    console.log("URL: ", url)
    try {
      const info = await youtubedl(url, {
        dumpSingleJson: true,
        noCheckCertificate: true
      });
  
      const format = info.formats.find(
        (f) => f.ext === 'mp4' && f.acodec !== 'none' && f.vcodec !== 'none'
      );
  
      if (!format) {
        return res.status(400).json({ error: 'No MP4 format found.' });
      }
  
      res.json({ downloadUrl: format.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the video.' });
    }
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
