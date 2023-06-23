var express = require('express');
var router = express.Router();
const Music = require('../model/Music');
const MusicType = require('../model/MusicType');
const User = require('../model/User');
const multer = require('multer')
const path = require('path');
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.parse(file.originalname).ext)
  }
});
const storage2 = multer.diskStorage({
  destination: './media',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.parse(file.originalname).ext)
  }
});
const upload = multer({ storage });
const upload2 = multer({ storage: storage2 });
/* GET home page. */
function userCheck() {
  return (req, res, next) => {
    const { _id } = req.query;
    // console.log(_id, '_id');
    if (!_id) {
      return res.json({
        statusCode: 4000,
        message: '请登录',
        data: null
      });
    }
    // console.log(_id, 'query');
    req._id = _id;
    next();
  }
}
router.get('/userLike', async (req, res, next) => {
  const id = req.query._id;
  // const id = '648c119a7a1715ef04bbda56';
  console.log(id, 'id');
  const  user  = await User.findById(id);
  // console.log(likes, 'likes');
  // const data = await Music.find({ _id: { $in: likes } });
  res.json({
    statusCode: 2000,
    data: user.likes
  })
})
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const data = await User.findOne({ username, password });
  if (!data) {
    return res.json({
      statusCode: 4000,
      message: '用户名或密码错误',
      data: null
    })
  }
  res.json({
    statusCode: 2000,
    message: '登录成功',
    data
  })

})
router.post('/userAdd', async (req, res, next) => {
  // console.log(req.body);
  const { username } = req.body;
  const u = await User.find({ username });
  // console.log(u);
  if (u.length) {
    return res.json({
      statusCode: 4000,
      data: null,
      message: '用户名已存在'
    })
  }
  const user = new User(req.body);
  user.save().then(data => {
    res.json({
      statusCode: 2000,
      data
    })
  });
})
router.get('/user', async (req, res, next) => {
  // const {id} = req.body;
  const id = "648c119a7a1715ef04bbda56"
  const data = await User.findById(id);
  res.json({
    statusCode: 2000,
    data
  })
})
router.get('/user/:id', async (req, res, next) => {
  const { id } = req.params;
  const data = await User.findById(id);
  res.json({
    statusCode: 2000,
    data
  })
})
router.get('/userList', async (req, res, next) => {
  // const {id} = req.body;
  const data = await User.find();
  res.json({
    statusCode: 2000,
    data
  })
})
router.put('/user/:id', async (req, res, next) => {
  const { id } = req.params;
  // const id = "648c0653d03d6f7f666cd223"
  const data = await User.findByIdAndUpdate(id, req.body);
  res.json({
    statusCode: 2000,
    data
  })
})
router.delete('/user/:id', async (req, res, next) => {
  const { id } = req.params;
  // const id = "648c0653d03d6f7f666cd223"
  const data = await User.findByIdAndRemove(id);
  res.json({
    statusCode: 2000,
    data
  })
})
router.put('/addLike', async (req, res, next) => {
  
  // console.log(req.query);
  const _id = req.query._id;
  const {music} = req.body;
  const user = await User.findById(_id);
  let mIndex = 0;
  let isIn = false;
  user.likes.forEach((m, i)=>{
    if(m._id === music._id){
      isIn = true;
      mIndex = i;
      return false;
    }
  });
  if(isIn){
    user.likes.splice(mIndex, 1);
  }else{
    user.likes.push(music);
  }
  const data = await User.findByIdAndUpdate(_id, {likes: user.likes});
  res.json({
    statusCode: 2000,
    data
  })
});
router.get('/music', async (req, res, next) => {
  const data = await Music.find();
  res.json({
    statusCode: 2000,
    data
  })
})
router.get('/music/recommend', async (req, res, next) => {
  // console.log(req.query, 'query');
  // console.log(req.params, 'params');
  const typeName = req.query.typeName;
  let data = await Music.find().limit(8);
  // console.log(typeName);
  if (typeName) {
    data = await Music.find({ musicType: typeName }).limit(8);
    // console.log(data);
  }
  res.json({
    statusCode: 2000,
    data
  })
})
router.get('/music/new', async (req, res, next) => {
  const data = await Music.find().sort({ create_time: 'desc' }).limit(8);
  res.json({
    statusCode: 2000,
    data
  })
})

router.get('/musicType', async function (req, res, next) {
  // console.log(req.url);
  const data = await MusicType.find();
  res.json({
    statusCode: 2000,
    data
  })
});


router.get('/musicType/:id', async function (req, res, next) {
  const data = await MusicType.findOne({ _id: req.params.id });
  res.json({
    statusCode: 2000,
    data
  })
});
router.put('/musicType', async function (req, res, next) {
  const data = await MusicType.findByIdAndUpdate({ _id: req.body._id }, req.body);
  res.json({
    statusCode: 2000,
    data
  })
});
router.delete('/musicType/:id', async function (req, res, next) {

  const data = await MusicType.findByIdAndRemove(req.params.id);
  res.json({
    statusCode: 2000,
    data
  })
});
router.post('/musicType', async function (req, res, next) {

  const data = new MusicType(req.body);
  data.save().then(data => {
    res.json({
      statusCode: 2000,
      message: '添加成功',
      data
    })
  })

});
router.post('/upload', upload.single('file'), function (req, res, next) {
  res.json({
    url: 'http://localhost:3000/' + req.file.path
  });
})
router.post('/uploadMusic', upload2.single('music'), function (req, res, next) {
  res.json({
    url: 'http://localhost:3000/' + req.file.path
  });
})

router.post('/',  function (req, res, next) {
  const data = new Music(req.body);
  data.save().then(data => {
    res.json({
      statusCode: 2000,
      message: '添加成功',
      data
    })
  })
})
router.get('/', userCheck(),async function (req, res, next) {
  const data = await Music.find();
  res.json({
    statusCode: 2000,
    data
  })
})
router.get('/musicList', async function (req, res, next) {
  console.log();
  const {search} = req.query;
  let data = await Music.find();
  if(search){
     data = await Music.find({name: {$regex: search}});
  }
  res.json({
    statusCode: 2000,
    data
  })
})

router.get('/musics/:id', async function (req, res, next) {
  // console.log(req.params);
  const data = await Music.findById(req.params.id);
  // console.log(data);
  res.json({
    statusCode: 2000,
    data
  })
})

router.delete('/:id', async function (req, res, next) {
  const data = await Music.findByIdAndRemove(req.params.id);
  res.json({
    statusCode: 2000,
    data
  })
})

router.put('/', async function (req, res, next) {
  const data = await Music.findByIdAndUpdate({ _id: req.body._id }, req.body);
  res.json({
    statusCode: 2000,
    data
  })
})


module.exports = router;
