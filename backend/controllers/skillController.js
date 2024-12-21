const Skill = require('../models/Skill');

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll();
    res.status(200).json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to fetch skills.' });
  }
};
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, name } = req.body;
    const image = req.file ? `/uploads/skills/${req.file.filename}` : undefined; // Only update image if provided

    // Validate ID
    if (!id) {
      return res.status(400).json({ error: 'Skill ID is required.' });
    }

    // Check if the skill exists
    const skill = await Skill.findOne({ where: { id } });
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found.' });
    }

    // Update fields dynamically
    const updatedData = { title, name };
    if (image !== undefined) {
      updatedData.image = image;
    }

    await Skill.update(updatedData, { where: { id } });

    // Fetch the updated skill (optional)
    const updatedSkill = await Skill.findOne({ where: { id } });

    res.status(200).json({
      message: 'Skill updated successfully.',
      skill: updatedSkill,
    });
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ error: 'Failed to update skill.' });
  }
};

exports.addSkill = async (req, res) => {
  try {
    const { title, name } = req.body;
    const image = req.file ? `/uploads/skills/${req.file.filename}` : null;

    const newSkill = await Skill.create({ title, name, image });
    res.status(201).json(newSkill);
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ error: 'Failed to add skill.' });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    await Skill.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ error: 'Failed to delete skill.' });
  }
};
