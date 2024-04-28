import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { setTaskList } from "../../../redux/slices/tasksSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FilterModal from "./filterModal";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import { isValidJSON } from "../../../utils";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ApiInstance from "../../Interceptor/interceptor";

const columns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "board", label: "Board", minWidth: 170 },
  { id: "dueDate", label: "DueDate", minWidth: 170 },
  { id: "priority", label: "Priority", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
];

const initialSort = {
  field: "",
  current: "",
};
const initialdata = {
  dueDate: "",
  status: "",
  priority: "",
};
export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showFilter, setShowFilter] = useState(false);
  const taskList = useSelector((state) => state.tasksReducer.taskList);
  const [taskData, setTaskdata] = useState(taskList);
  const dispatch = useDispatch();
  const userLocal = localStorage.getItem("user");
  const user = isValidJSON(userLocal) ? JSON.parse(userLocal) : {};
  const [sort, setSort] = useState(initialSort);

  const [filterdata, setfilterData] = useState(initialdata);

  const getTaskList = async () => {
    try {
      const response = await ApiInstance.get("http://localhost:8000/tasks");
      const boardResponse = await ApiInstance.get(
        "http://localhost:8000/boards"
      );
      if (response.data) {
        const myTask = response.data
          ?.filter((doc) => doc?.assignee === user?.id)
          .map((doc) => {
            const { boardId } = doc;
            const boardInfo = boardResponse.data?.find(
              (item) => item.id === boardId
            );
            return { ...doc, boardName: boardInfo?.title };
          });
        dispatch(setTaskList(response.data));
        setTaskdata(myTask);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const onClose = () => {
    setShowFilter(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tableData = React.useMemo(() => {
    const { current, field } = sort;
    let data = taskData;
    if (current && field) {
      data = data?.sort((a, b) => {
        const asc = a?.[field] < b?.[field] ? -1 : 1;
        const desc = a?.[field] < b?.[field] ? 1 : -1;
        return current === "asc" ? asc : desc;
      });
    }
    return data;
  }, [taskData, sort]);

  const handleSort = (field, current) => {
    setSort({
      current,
      field,
    });
  };

  const renderSortIcon = (key) => {
    const iconStatus = sort.field === key ? sort.current : "unset";
    switch (iconStatus) {
      case "asc":
        return (
          <span className="cursor-pointer">
            <ArrowDownwardIcon
              fontSize="small"
              onClick={() => handleSort(key, "desc")}
            />
          </span>
        );
      case "desc":
        return (
          <span className="cursor-pointer">
            <ArrowUpwardIcon
              fontSize="small"
              onClick={() => handleSort(key, "asc")}
            />
          </span>
        );
      case "unset":
        return (
          <span className="cursor-pointer">
            <SwapVertIcon
              fontSize="small"
              onClick={() => handleSort(key, "asc")}
            />
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <div className="board-title">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/boards">
              Home
            </Link>
            <Typography color="text.primary">My Task</Typography>
          </Breadcrumbs>
        </div>
        <div className="flex gap-4">
          <div style={{ position: "relative" }}>
            {(filterdata.dueDate !== "" ||
              filterdata.priority !== "" ||
              filterdata.status !== "") && (
              <span
                style={{
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  display: "inline-flex",
                  borderRadius: "25px",
                  backgroundColor: "red",
                  top: -10,
                  right: -5,
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                }}
              ></span>
            )}
            <button
              className="primary_btn"
              onClick={() => {
                setShowFilter(true);
              }}
            >
              Filter <FilterListIcon />
            </button>
          </div>
        </div>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label} {renderSortIcon(column.id)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell key={row.id}>{row.title}</TableCell>
                      <TableCell key={row.id}>{row.boardName}</TableCell>
                      <TableCell key={row.id}>{row.dueDate}</TableCell>
                      <TableCell key={row.id}>
                        {row.priority || "N/A"}{" "}
                      </TableCell>
                      <TableCell
                        key={row.id}
                        style={{
                          color:
                            row.status == "Todo"
                              ? "blue"
                              : row.status == "InProgress"
                              ? "red"
                              : row.status == "Review"
                              ? "Orange"
                              : "green",
                        }}
                      >
                        {row.status || "N/A"}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={taskData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog onClose={onClose} open={showFilter}>
        <DialogTitle>Filter List</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <FilterModal
            setTaskdata={setTaskdata}
            setShowFilter={setShowFilter}
            getTaskList={getTaskList}
            data={filterdata}
            setData={setfilterData}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
