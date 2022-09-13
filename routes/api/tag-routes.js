const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // find all tags
    const tagGet = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagGet);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", (req, res) => {
  try {
    // find a single tag by its `id`
    const tagGet = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagGet) {
      res.status(404).json({ message: "Unable to find Tag with that ID!" });
      return;
    }
    res.status(200).json(tagGet);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", (req, res) => {
	try {
  // create a new tag
		const tagPost = await Tag.create({
			tag_name: req.body.tag_name,
		});
		res.status(200).json(tagPost);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.put("/:id", (req, res) => {
  try {
    const tagPut = await Tag.update(req.body, {
      // update a tag's name by its `id` value
      where: {
        id: req.params.id,
      },
    });
    if (!tagPut) {
      res
        .status(404)
        .json({ message: "Unable to update Tag with that ID!" });
      return;
    }
    res.status(200).json(tagPut);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", (req, res) => {
  try {
    // delete on tag by its `id` value
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagDelete) {
      res
        .status(404)
        .json({ message: "Unable to delete Tag with that ID!" });
      return;
    }
    res.status(200).json(tagDelete);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
