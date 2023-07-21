import PostModel from '../models/Post.js';
  
export const create = async (req, res) =>{
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        });

        const post = await doc.save();
        res.status(203).json({
            post
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Не удалось создать статью"
        })
    }
}

export const getAll = async (req, res) =>{
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.status(200).json({
            posts
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Не удалось получить статьи"
        })
    }
}

export const get = async (req, res) =>{
    try {
        const id = req.params.id;
        console.log(id);
        PostModel.findOneAndUpdate({
            _id: id,

        },{
            $inc: {viewsCount: 1}
        },{
            returnDocument: 'after'
        }).then((doc, err) =>{
            if (err){
                console.log(err);
                return res.status(500).json({
                    msg: "Не удалось получить статью"
                })
            }
            if (!doc){
                return res.status(404).json({
                    message: 'Статья не найдена'
                });
            }

            res.status(200).json(doc)
        }).catch((err) =>{
            
            res.status(404).json({
                msg: 'Такой статьи нет!'
            })
        });
    } catch (err) {
        res.status(500).json({
            msg: "Не удалось получить статью"
        })
    }
}

export const remove = async (req, res) =>{
    try {
        const postId = req.params.id;
        const doc = await PostModel.findOneAndDelete({
            _id: postId
        });

        if (!doc){
            return res.status(500).json({
                msg: "Ошибка удаления"
            })
        }

        res.status(200).json({
            msg: 'Статья была удалена',
            ...doc
        })
    } catch (err) {
        
        res.status(500).json({
            msg: "Ошибка удаления"
        })
    }
}

export const update = async (req, res) =>{
    try {
        const postId = req.params.id;
        const doc = await PostModel.findOneAndUpdate({
            _id: postId
        },
        {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        })

        if (!doc){
            return res.status(500).json({
                msg: 'Статья не была обновлена'
            })
        }
        res.status(200).json({
            msg: 'Статья была обновлен'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Статья не была обновлена'
        })
    }
}