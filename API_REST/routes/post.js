const Post = require("../models/Post");
const express = require('express');
const router = express.Router();

//En este archivo se definen las acciones de los datos
router.post('/', async(req,res) => {
   
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPost = await post.save(); //Este es el método que guarda la BD
        res.json(savedPost);
    } catch (error) {
        res.json({message:error});
    }
});

/**
 * Bloque para mostrar solo un post por el Id
 */

    router.get('/:postId', async (req,res) => {
        try {
            const post = await Post.findById(req.params.postId); //Encuentra por id
            res.json(post);
        } catch (error) {
            res.json({message: error});
        }
    });

    /**
     * Bloque para borrar un post 
     * */

    router.delete('/:postId', async (req,res) => {
        try{
            const removedPost = await Post.deleteOne({_id: req.params.postId}); //Borra
            res.json(removedPost);
        } catch (error) {
            res.json({message: error});
        }
    });



    /**
     * Actualizar un post
     */
    router.patch('/:postId', async (req,res) => { //Se utiliza patch para actualizar
        try{
            const updatePost = await Post.updateOne( //actualiza de uno en uno

                {_id: req.params.postId},
                {$set: {title: req.body.title}});
            res.json(updatePost);

        } catch (error) {
            res.json({message: error});
        }
    });

    module.exports = router; //devuelve como módulo lo que se le asigna a route