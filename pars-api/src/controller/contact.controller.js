import contact from "../models/contact.js";
import User from "../models/user.js";

export async function createContact(req, res) {
  try {
    const { name, email, message , phone, service,address} = req.body;
    if (!name || !email || !message || !phone || !service || !address) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const doc = await contact.create({ name, email, message, phone, service, address });
    res.status(201).json({ success: true, contact: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getContacts(req, res) {
  try {
    if(req.user.role !== "admin") {
      return res.status(403).json({message: "Unauthorized"})
    }
    return res.status(200).json({ success: true, contacts: await contact.find().sort({ createdAt: -1 }) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function deleteContact(req, res) {
  try {
    if(req.user.role !== "admin") {
      return res.status(403).json({message: "Unauthorized"})
    }
    const id = req.params.id || req.query._id || req.body._id;
    if (!id) {
      return res.status(400).json({ error: "Contact id is required." });
    }
    const deleted = await contact.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Contact doesn't exist." });
    }
    return res.status(200).json({ success: true, message: "Contact deleted." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function updateContactStatus(req, res) {
  try {
    if(req.user.role !== "admin") {
      return res.status(403).json({message: "Unauthorized"})
    }
    const id = req.params.id || req.body._id || req.query._id;
    const { status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ error: "Contact id and status are required." });
    }
    if (!["new", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }
    const updated = await contact.findByIdAndUpdate(id, { status
      }, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Contact doesn't exist." });
    }
    return res.status(200).json({ success: true, contact: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function getUsers(req, res) {
  try {
    if(req.user.role !== "admin") {
      return res.status(403).json({message: "Unauthorized"})
    }
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json({ success: true, users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
