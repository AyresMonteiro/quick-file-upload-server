const express = require('express')

const app = express()

const multer = require('multer')

const path = require('path')

const PORT = 3000

app.use(express.static('public'))

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.resolve(__dirname, 'public', 'uploads'))
  },
  filename: function (_req, file, cb) {
    const [name, ...extensions] = file.originalname.split('.')

    const extension = extensions.join('.')

    cb(null, `${name}_${Date.now()}.${extension}`)
  },
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
  const filename = req.file.filename

  res.json({ file: filename })
})

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, () => {
  console.log('Server is running on port 3000')
})
