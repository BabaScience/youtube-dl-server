const express = require('express');
const youtubedl = require('youtube-dl-exec');
const app = express();

app.use(express.json());

app.post('/download', async (req, res) => {
    const { url } = req.body;

    console.log("Download Endpoint Called!")
    try {
      const info = await youtubedl(url, {
        dumpSingleJson: true,
        noCheckCertificate: true
      });
  
      console.log("FORMATS: ", format)
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
