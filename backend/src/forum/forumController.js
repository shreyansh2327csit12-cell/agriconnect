import forumModel from "../models/forumModel.js";

import createHttpError from "http-errors";

export const createQuestion = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.body);

    if (!title || !description) {
      console.log("Title and description are required");
      return createHttpError(400, "Title and description are required");
    }

    const newQuestion = await forumModel.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    return createHttpError(500, "Error while creating question");
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await forumModel
      .find()
      .populate({ path: "userId", select: "name" });
    res.json(questions);
  } catch (error) {
    return createHttpError(500, "Error while getting questions");
  }
};

export const postComment = async (req, res) => {
  try {
    const { comment } = req.body;
    console.log(comment);
    if (!comment) {
      return createHttpError(400, "Comment is required");
    }
    const question = await forumModel.findById(req.params.id);
    question.comments.push({
      userId: req.userId,
      comment,
    });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    return createHttpError(500, "Error while posting comment");
  }
};

export const getForumPostByid = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params; // Get forum post ID from request params

    // Fetch forum post by ID and populate user details if needed
    const forumPost = await forumModel.findById(id).populate("userId", "name");

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    res.status(200).json(forumPost); // Send post details as response
  } catch (error) {
    return createHttpError(500, "Error while getting forum post by ID");
  }
};
