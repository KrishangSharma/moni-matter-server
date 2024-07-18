// Model Imports
const User = require("../models/userModel");
const Group = require("../models/groupModel");
const Transaction = require("../models/transactionModel");

// Create group
const createGroup = async (req, res) => {
  try {
    const { name, desc } = req.body;

    // Validate the data
    if (!name) {
      return res.status(400).json({ message: "Group Name cannot be empty!" });
    }

    // Construct a Group Object
    const newGrp = new Group({
      // Make current user the Admin
      admin: req.session.user.id,
      name,
      desc,
    });

    // Save to DB
    const savedGrp = await newGrp.save();

    return res.status(200).json({
      message: "Group created! Add members to get started!",
      savedGrp,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message:
        "Server encountered an error while processing the request. Please try again later.",
    });
  }
};

// Add members to the grp
const addMembers = async (req, res) => {
  try {
    const grpID = req.params.id;
    const { members } = req.body;
    // Only allow admin to make changes to a grp
    const grp = await Group.findOne({ _id: grpID });
    const isAdmin = req.session.user.id === grp.admin;
    if (!isAdmin) {
      return res
        .status(401)
        .json({ message: "You are not authorized to do this." });
    }

    // Check if all users exist
    const usersExist = await Promise.all(
      members.map(async (id) => {
        const user = await User.findById(id);
        if (!user) {
          return res
            .status(404)
            .json({ message: `User with ID ${id} not found!` });
        }
      })
    );

    // Add users to the group
    const updatedGroup = await Group.findByIdAndUpdate(
      grpID,
      { $addToSet: { users: { $each: members } } },
      { new: true }
    );

    // Update User's array with the group
    const updateUserGroups = await Promise.all(
      members.map(async (id) => {
        const user = await User.findByIdAndUpdate(id, {
          $push: { groups: grpID },
        });
      })
    );

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found!" });
    }

    return res.status(200).json({
      message: "Members added successfully.",
      group: updatedGroup,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message:
        "Server encountered an error while processing the request. Please try again later.",
    });
  }
};

// Update group
const updateGroup = async (req, res) => {
  try {
    const grpID = req.params.id;
    const { name, description, members } = req.body;

    // Only allow admin to make changes to a grp
    const grp = await Group.findOne({ _id: grpID });
    const isAdmin = req.session.user.id === grp.admin.toString();
    if (!isAdmin) {
      return res
        .status(401)
        .json({ message: "You are not authorized to do this." });
    }

    // Check if all users exist
    const usersExist = await Promise.all(
      members.map(async (id) => {
        const user = await User.findById(id);
        if (!user) {
          return res
            .status(404)
            .json({ message: `User with ID ${id} not found!` });
        }
      })
    );

    // Add or remove users from the group
    const userIds = members.map((id) => id.toString());
    const currentMembers = grp.users.map((user) => user._id.toString());

    const usersToAdd = userIds.filter((id) => !currentMembers.includes(id));
    const usersToRemove = currentMembers.filter((id) => !userIds.includes(id));

    if (usersToAdd.length > 0) {
      await Group.findByIdAndUpdate(
        grpID,
        { $addToSet: { users: { $each: usersToAdd } } },
        { new: true }
      );
      await User.updateMany(
        { _id: { $in: usersToAdd } },
        { $addToSet: { groups: grpID } }
      );
    }

    if (usersToRemove.length > 0) {
      await Group.findByIdAndUpdate(
        grpID,
        { $pull: { users: { $in: usersToRemove } } },
        { new: true }
      );
      await User.updateMany(
        { _id: { $in: usersToRemove } },
        { $pull: { groups: grpID } }
      );
    }

    // Update name and description if provided
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    const updatedGroup = await Group.findByIdAndUpdate(grpID, updateData, {
      new: true,
    });

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found!" });
    }

    return res.status(200).json({
      message: "Group updated successfully!",
      group: updatedGroup,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message:
        "Server encountered an error while processing the request. Please try again later.",
    });
  }
};

module.exports = { createGroup, addMembers, updateGroup };
