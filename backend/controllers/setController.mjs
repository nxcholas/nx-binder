import Set from "../models/setModel.mjs";

const getSets = async (_, res) => {
  try {
    const sets = await Set.find({}, "id name logo").lean();
    res.json(sets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching sets" });
  }
};

const getSetById = async (req, res) => {
  try {
    const set = await Set.findOne({ id: req.params.id }, "cards").lean();

    if (!set) {
      return res.status(404).json({ msg: "Set not found" });
    }
    res.status(200).json(set)
  } catch (error) {
    console.log(error)
    throw new Error('Error when getting set by id');
  }
};

export {getSets, getSetById};
