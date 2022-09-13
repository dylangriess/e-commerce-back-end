const router = require("express").Router();
const { Category, Product } = require("../../models");
const { restore } = require("../../models/Product");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    // find all categories
    const categoryGet = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categoryGet);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find one category by its `id` value
    const categoryGet = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    if (!categoryGet) {
      res
        .status(404)
        .json({ message: "Unable to find Category with that ID!" });
      return;
    }
    res.status(200).json(categoryGet);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new category
    const categoryPost = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categoryPut = await Category.update(req.body, {
      // update a category by its `id` value
      where: {
        id: req.params.id,
      },
    });
    if (!categoryPut) {
      res
        .status(404)
        .json({ message: "Unable to update Category with that ID!" });
      return;
    }
    res.status(200).json(categoryPut);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete a category by its 'id' value
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryDelete) {
      res
        .status(404)
        .json({ message: "Unable to delete Category with that ID!" });
      return;
    }
    res.status(200).json(categoryDelete);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
