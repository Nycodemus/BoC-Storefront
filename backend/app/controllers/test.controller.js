exports.public = (req, res) => {
    res.status(200).send({message:"Public content"});
}

exports.user = (req, res) => {
    res.status(200).send({message:"User content"});
}

exports.gm = (req, res) => {
    res.status(200).send({message:"GM Content"});
}

exports.admin = (req, res) => {
    res.status(200).send({message:"Admin content"});
}