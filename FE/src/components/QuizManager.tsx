import React, { useState } from "react";
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
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

// Danh sách dịch vụ (tạm thời giả lập)
const services = [
  { id: 1, name: "Spa Facial" },
  { id: 2, name: "Massage Body" },
  { id: 3, name: "Hair Treatment" },
];

// Interface Quiz
interface Quiz {
  id: number;
  question: string;
  options: { text: string; serviceId: number }[];
}

const QuizManager: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [open, setOpen] = useState(false);
  const [newQuiz, setNewQuiz] = useState<Quiz>({
    id: 0,
    question: "",
    options: [{ text: "", serviceId: 1 }],
  });

  // Mở / đóng modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setNewQuiz({ id: 0, question: "", options: [{ text: "", serviceId: 1 }] });
    setOpen(false);
  };

  // Thêm quiz mới
  const handleAddQuiz = () => {
    if (
      newQuiz.question.trim() &&
      newQuiz.options.every((opt) => opt.text.trim())
    ) {
      setQuizzes([...quizzes, { ...newQuiz, id: quizzes.length + 1 }]);
      handleClose();
    }
  };

  // Xóa quiz
  const handleDeleteQuiz = (id: number) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  // Cập nhật nội dung câu hỏi
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuiz({ ...newQuiz, question: e.target.value });
  };

  // Cập nhật nội dung option
  const handleOptionChange = (
    index: number,
    key: "text" | "serviceId",
    value: any
  ) => {
    const updatedOptions = [...newQuiz.options];
    updatedOptions[index][key] = value;
    setNewQuiz({ ...newQuiz, options: updatedOptions });
  };

  // Thêm option
  const addOption = () => {
    setNewQuiz({
      ...newQuiz,
      options: [...newQuiz.options, { text: "", serviceId: 1 }],
    });
  };

  // Xóa option
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
        </Box>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Question</TableCell>
                <TableCell>Choice</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell>{quiz.id}</TableCell>
                  <TableCell>{quiz.question}</TableCell>
                  <TableCell>
                    {quiz.options.map((opt, index) => (
                      <div key={index}>
                        {opt.text} -{" "}
                        {
                          services.find(
                            (service) => service.id === opt.serviceId
                          )?.name
                        }
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteQuiz(quiz.id)}
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

      {/* Modal thêm quiz */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Thêm Quiz</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Câu hỏi"
            variant="outlined"
            margin="dense"
            value={newQuiz.question}
            onChange={handleQuestionChange}
          />
          {newQuiz.options.map((option, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <TextField
                label={`Lựa chọn ${index + 1}`}
                variant="outlined"
                value={option.text}
                onChange={(e) =>
                  handleOptionChange(index, "text", e.target.value)
                }
                fullWidth
              />
              <Select
                value={option.serviceId}
                onChange={(e) =>
                  handleOptionChange(index, "serviceId", e.target.value)
                }
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
              <IconButton color="error" onClick={() => removeOption(index)}>
                <Delete />
              </IconButton>
            </div>
          ))}
          <Button onClick={addOption} color="primary">
            + Thêm lựa chọn
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Hủy
          </Button>
          <Button onClick={handleAddQuiz} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default QuizManager;
