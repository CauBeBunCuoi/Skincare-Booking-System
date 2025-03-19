import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { Add, Delete, Edit, Settings, Update } from "@mui/icons-material";
import { callApi } from "../api/main/api_call/api";
import { publicApi } from "../api/instance/axiosInstance";

// Interface for Quiz and Options
interface Quiz {
  quiz: {
    _id: string;
    content: string;
  };
  options: {
    _id: string;
    content: string;
    quizQuestionId: string;
  }[];
}

const QuizManager: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [open, setOpen] = useState(false);
  const [newQuiz, setNewQuiz] = useState<Quiz>({
    quiz: { _id: "", content: "" },
    options: [{ _id: "", content: "", quizQuestionId: "" }],
  });
  const [editQuizOpen, setEditQuizOpen] = useState(false);
  const [editOptionOpen, setEditOptionOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [updatedQuestionContent, setUpdatedQuestionContent] = useState("");
  const [updatedOptions, setUpdatedOptions] = useState<
    { _id: string; content: string }[]
  >([]);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);

  // Open delete confirmation dialog
  const handleOpenDeleteConfirm = (id: string) => {
    setQuizToDelete(id);
    setDeleteConfirmOpen(true);
  };

  // Close delete confirmation dialog
  const handleCloseDeleteConfirm = () => {
    setQuizToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const handleOpenEditQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setUpdatedQuestionContent(quiz.quiz.content);
    setEditQuizOpen(true);
  };

  const handleCloseEditQuiz = () => {
    setEditQuizOpen(false);
    setSelectedQuiz(null);
  };

  const handleOpenEditOptions = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setUpdatedOptions(
      quiz.options.map((opt) => ({ _id: opt._id, content: opt.content }))
    );
    setEditOptionOpen(true);
  };

  const handleCloseEditOptions = () => {
    setEditOptionOpen(false);
    setSelectedQuiz(null);
  };

  const getAllQuizz = async () => {
    try {
      const res = await callApi({
        instance: publicApi,
        method: "get",
        url: "/quizzes",
      });
      setQuizzes(res.data.quizzes);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    getAllQuizz();
  }, []);

  // Open / Close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setNewQuiz({ quiz: { _id: "", content: "" }, options: [] });
    setOpen(false);
  };

  // Add a new quiz
  const handleAddQuiz = async () => {
    if (
      newQuiz.quiz.content.trim() &&
      newQuiz.options.every((opt) => opt.content.trim())
    ) {
      const res = await callApi({
        instance: publicApi,
        method: "post",
        url: "/quizzes",
        data: {
          content: newQuiz.quiz.content,
          options: newQuiz.options.map((opt) => ({ content: opt.content })),
        },
      });

      if (!res.success) {
        throw new Error("Failed to add quiz");
      }

      // const data = await res.json();
      // setQuizzes([...quizzes, { ...data }]); // Assuming API returns the new quiz
      getAllQuizz();
      handleClose();
    }
  };

  // Delete a quiz
  const handleDeleteQuiz = async (id: string) => {
    // setQuizzes(quizzes.filter(quiz => quiz.quiz._id !== id));
    const res = await callApi({
      instance: publicApi,
      method: "delete",
      url: `/quizzes/${quizToDelete}`,
      data: {
        content: newQuiz.quiz.content,
        options: newQuiz.options.map((opt) => ({ content: opt.content })),
      },
    });

    if (!res.success) {
      throw new Error("Failed to add quiz");
    } else {
      getAllQuizz();
      handleCloseDeleteConfirm();
    }
  };

  const handleDeleteOption = async (optionId: string, index: number) => {
    if (updatedOptions.length <= 1) {
      alert("Quiz must have at least one option.");
      return;
    }

    try {
      await callApi({
        instance: publicApi,
        method: "delete",
        url: `/quizzes/options/${optionId}`,
      });

      // Remove the option locally
      const filteredOptions = updatedOptions.filter((_, i) => i !== index);
      getAllQuizz();

      setUpdatedOptions(filteredOptions);
    } catch (error) {
      console.error("Error deleting option:", error);
    }
  };

  const handleUpdateQuizQuestion = async () => {
    if (!selectedQuiz) return;

    try {
      const res = await callApi({
        instance: publicApi,
        method: "put",
        url: `/quizzes/${selectedQuiz.quiz._id}`,
        data: { content: updatedQuestionContent },
      });

      if (!res.success) throw new Error("Failed to update quiz");

      getAllQuizz();
      handleCloseEditQuiz();
    } catch (error) {
      console.error("Error updating quiz question:", error);
    }
  };

  const handleUpdateQuizOptions = async () => {
    if (!selectedQuiz) return;

    try {
      const res = await callApi({
        instance: publicApi,
        method: "put",
        url: `/quiz-options`,
        data: { quizId: selectedQuiz.quiz._id, options: updatedOptions },
      });

      if (!res.success) throw new Error("Failed to update quiz options");

      getAllQuizz();
      handleCloseEditOptions();
    } catch (error) {
      console.error("Error updating quiz options:", error);
    }
  };

  // Update quiz content
  const handleQuizContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuiz({
      ...newQuiz,
      quiz: { ...newQuiz.quiz, content: e.target.value },
    });
  };

  // Update option content
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newQuiz.options];
    updatedOptions[index].content = value;
    setNewQuiz({ ...newQuiz, options: updatedOptions });
  };

  // Add an option
  const addOption = () => {
    setNewQuiz({
      ...newQuiz,
      options: [
        ...newQuiz.options,
        { _id: "", content: "", quizQuestionId: newQuiz.quiz._id },
      ],
    });
  };

  // Remove an option
  const removeOption = (index: number) => {
    if (newQuiz.options.length > 1) {
      setNewQuiz({
        ...newQuiz,
        options: newQuiz.options.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <Card sx={{ p: 2, boxShadow: "none", borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Quiz Management
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
            Add Quiz
          </Button>
          <Dialog open={deleteConfirmOpen} onClose={handleCloseDeleteConfirm}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this quiz?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteConfirm} color="error">
                Cancel
              </Button>
              <Button onClick={handleDeleteQuiz} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={editQuizOpen} onClose={handleCloseEditQuiz}>
            <DialogTitle>Cập nhật câu hỏi</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Câu hỏi"
                variant="outlined"
                margin="dense"
                value={updatedQuestionContent}
                onChange={(e) => setUpdatedQuestionContent(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditQuiz} color="error">
                Hủy
              </Button>
              <Button onClick={handleUpdateQuizQuestion} color="primary">
                Cập nhật
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={editOptionOpen} onClose={handleCloseEditOptions}>
            <DialogTitle>Cập nhật lựa chọn</DialogTitle>
            <DialogContent>
              {updatedOptions.map((option, index) => (
                <Box
                  key={option._id}
                  display="flex"
                  gap={1}
                  alignItems="center"
                  my={1}
                >
                  <TextField
                    fullWidth
                    label={`Lựa chọn ${index + 1}`}
                    variant="outlined"
                    value={option.content}
                    onChange={(e) => {
                      const updated = [...updatedOptions];
                      updated[index].content = e.target.value;
                      setUpdatedOptions(updated);
                    }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteOption(option._id, index)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditOptions} color="error">
                Hủy
              </Button>
              <Button onClick={handleUpdateQuizOptions} color="primary">
                Cập nhật
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Question</TableCell>
                <TableCell>Choices</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzes.map((quiz, index) => (
                <TableRow key={quiz.quiz._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{quiz.quiz.content}</TableCell>
                  <TableCell>
                    {quiz.options.map((opt, idx) => (
                      <div key={idx}>{opt.content}</div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEditQuiz(quiz)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenEditOptions(quiz)}
                    >
                      <Settings />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDeleteConfirm(quiz.quiz._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {/* Modal for adding quiz */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Quiz</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Question"
            variant="outlined"
            margin="dense"
            value={newQuiz.quiz.content}
            onChange={handleQuizContentChange}
          />
          {newQuiz.options.map((option, index) => (
            <Box key={index} display="flex" gap={1} alignItems="center" my={1}>
              <TextField
                label={`Option ${index + 1}`}
                variant="outlined"
                value={option.content}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                fullWidth
              />
              <IconButton color="error" onClick={() => removeOption(index)}>
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button onClick={addOption} color="primary">
            + Add Option
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddQuiz} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default QuizManager;
