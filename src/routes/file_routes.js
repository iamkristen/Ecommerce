const router = require("express").Router();
const upload = require("./../middlewares/file_upload");

router.post("/single",upload.single("image"),async (req,res)=>{
    const uploadedFile = req.file;

    if(!uploadedFile){
        res.json({success: false,error: "File not Uploaded"});
        return;
    }
    res.json({success:true,data:process.env.HOST+ uploadedFile.filename});
});

router.post("/multiple",upload.array("images",5),async (req,res)=>{
    const uploadedFiles = req.files;

    if(!uploadedFiles || uploadedFiles.length == 0){
        res.json({success:false,error: "Files not found"});
        return;
    }
    var downloadUrls = [];
    uploadedFiles.forEach((file)=>{
        const uploaded = process.env.HOST+ file.filename
        downloadUrls.push(uploaded);
        
    })
    res.json({success:true,data:downloadUrls});
})


module.exports = router;