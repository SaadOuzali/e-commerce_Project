async function delete_categories(req,res,next,_id){
    try {
      const deletcategorie=await Categories.findOneAndDelete({_id})
      if(!deletcategorie){
        const error=new Error('invalid categorie id');
        error.status=404
        next(error);
        return;
      }
      res.status(200).json({
        status:'success',
        message:"categorie deleted successfully"
      })
    } catch (error) {
      const err=new Error(error.message);
      err.status=404
      next(err);
    }
}

module.exports={
    delete_categories
}