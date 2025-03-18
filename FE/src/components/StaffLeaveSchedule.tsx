import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, IconButton, Box } from "@mui/material";
import { ChevronLeft, ChevronRight, Add } from "@mui/icons-material";
import moment from "moment";

type LeaveItem = {
  title: string;
  date: string;
  type: "morning" | "evening" | "full-day";
};

type Employee = {
  id: number;
  name: string;
  leaveSchedule: LeaveItem[];
};

// Dummy Leave Data
const employees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    leaveSchedule: [
      { title: "Sick Leave", date: "2025-03-02", type: "morning" },
      { title: "Personal Leave", date: "2025-03-07", type: "evening" },
      { title: "Annual Leave", date: "2025-03-10", type: "full-day" }, // NEW FULL-DAY LEAVE
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    leaveSchedule: [
      { title: "Vacation", date: "2025-03-04", type: "full-day" },
      { title: "Sick Leave", date: "2025-03-17", type: "evening" },
    ],
  },
];


const LeaveCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const startOfMonth = currentMonth.clone().startOf("month");
  const endOfMonth = currentMonth.clone().endOf("month");
  const startDay = startOfMonth.clone().startOf("week");
  const endDay = endOfMonth.clone().endOf("week");

  const days = [];
  let day = startDay.clone();
  while (day.isBefore(endDay, "day")) {
    days.push(day.clone());
    day.add(1, "day");
  }

  // Navigate Months
  const prevMonth = () => setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
  const nextMonth = () => setCurrentMonth((prev) => prev.clone().add(1, "month"));

  return (
    <Card sx={{ p: 2, borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <IconButton onClick={prevMonth}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            {currentMonth.format("MMMM YYYY")}
          </Typography>
          <IconButton onClick={nextMonth}>
            <ChevronRight />
          </IconButton>
          <IconButton color="primary">
            <Add />
          </IconButton>
        </Box>

        {/* Calendar Grid */}
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Grid key={day} item xs={1.7}>
              <Typography variant="subtitle2" align="center" fontWeight="bold">
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={1}>
          {days.map((day) => {
            const dayEvents = employees.flatMap((employee) =>
              employee.leaveSchedule.filter((leave) => leave.date === day.format("YYYY-MM-DD"))
            );

            return (
              <Grid key={day.format("DD-MM")} item xs={1.7} sx={{ height: 80, border: "1px solid #ddd", position: "relative" }}>
                <Typography variant="subtitle2" align="center">
                  {day.format("D")}
                </Typography>

                {dayEvents.map((event, index) => (
                  <Box
                  sx={{
                    bgcolor: event.type === "full-day" ? "purple" : event.type === "morning" ? "red" : "blue",
                    color: "white",
                    px: 1,
                    py: event.type === "full-day" ? 1.5 : 0.5, // Bigger for full-day
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    textAlign: "center",
                    mt: 0.5,
                  }}
                >
                  {event.title}
                </Box>
                ))}
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LeaveCalendar;
