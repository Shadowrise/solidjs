import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@suid/material";
import {For} from "solid-js";
import {User} from "../models/user";

export interface IUserTableProps {
  users?: User[];
}

export default function UsersTable(props: IUserTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>User name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password hash</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <For each={props?.users ?? []}>
            {(user) => (
              <TableRow
                sx={{"&:last-child td, &:last-child th": {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
